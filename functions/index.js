const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
    admin.initializeApp();
}

// Globalne wymuszenie regionu Warszawa
setGlobalOptions({ region: "europe-central2" });

// ============================================================================
// 1. SILNIK TRANSAKCYJNY: Obsługa bazy danych dla panelu Admina
// ============================================================================
exports.acceptLead = onCall(async (request) => {
    const leadId = request.data.leadId;
    const driverId = request.data.driverId; 
    const driverName = request.data.driverName; 
    const db = admin.firestore();

    const leadPublicRef = db.collection('leads_public').doc(leadId);
    const leadPrivateRef = db.collection('leads_private').doc(leadId);
    const inboundRef = db.collection('inbound_leads').doc(leadId);
    const auditLogRef = db.collection('audit_logs').doc();

    try {
        const result = await db.runTransaction(async (t) => {
            const publicDoc = await t.get(leadPublicRef);
            
            if (!publicDoc.exists) throw new HttpsError('not-found', 'Zlecenie nie istnieje.');
            if (publicDoc.data().status !== 'open') throw new HttpsError('failed-precondition', 'Zlecenie zostało już przejęte.');

            // A. Aktualizacja 
            t.update(leadPublicRef, { 
                status: 'accepted', 
                acceptedBy: driverId,
                driverName: driverName || 'Nieznany Partner',
                acceptedAt: admin.firestore.FieldValue.serverTimestamp()
            });

            // B. Aktualizacja dla Admina
            t.update(inboundRef, { 
                status: 'PRZEJĘTE', 
                driverName: driverName || 'Nieznany Partner',
                acceptedBy: driverId,
                acceptedAt: admin.firestore.FieldValue.serverTimestamp()
            });

            // C. Audyt
            t.set(auditLogRef, {
                action: 'LEAD_ACCEPTED',
                leadId: leadId,
                driverId: driverId,
                driverName: driverName || 'Nieznany Partner',
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            });

            const privateDoc = await t.get(leadPrivateRef);
            return privateDoc.exists ? privateDoc.data() : null;
        });

        return { success: true, privateData: result };

    } catch (error) {
        console.error("Błąd transakcji akceptacji:", error);
        throw new HttpsError('internal', error.message);
    }
});

// ============================================================================
// 2. AUTOMATYCZNY DYSPOZYTOR (Wersja Oczyszczona - BEZ PUSH)
// ============================================================================
exports.dispatchLead = onDocumentCreated("inbound_leads/{leadId}", async (event) => {
    const snap = event.data;
    if (!snap) return;

    const leadId = event.params.leadId;
    const newData = snap.data();
    const db = admin.firestore();

    const batch = db.batch();
    const publicRef = db.collection('leads_public').doc(leadId);
    const privateRef = db.collection('leads_private').doc(leadId);
    const auditRef = db.collection('audit_logs').doc();
    const inboundRef = db.collection('inbound_leads').doc(leadId);

    try {
        // Tworzenie kopii publicznej (bez danych wrażliwych)
        batch.set(publicRef, {
            capacity: newData.capacity,
            street: newData.street,
            time: newData.time || '',
            status: 'open',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // Ukryte dane kontaktowe
        batch.set(privateRef, {
            name: newData.name,
            phone: newData.phone,
            fullAddress: newData.street
        });

        // Zapis w logach audytowych
        batch.set(auditRef, {
            action: 'LEAD_DISPATCHED',
            leadId: leadId,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        // Zmiana statusu w głównej bazie
        batch.update(inboundRef, { status: 'dispatched' });

        await batch.commit();

        // FUNKCJA KOŃCZY DZIAŁANIE NATYCHMIAST PO ZAPISIE W BAZIE (Brak obciążających powiadomień PUSH)
        return null;
    } catch (error) {
        console.error("Błąd dyspozytora: ", error);
        return null;
    }
});