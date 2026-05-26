"use client";

import { useEffect } from 'react';

export default function SWRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => console.log('PWA Service Worker registered'))
        .catch((err) => console.log('PWA Service Worker registration failed', err));
    }
  }, []);

  return null;
}
