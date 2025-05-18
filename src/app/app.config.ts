import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCK0aNKr4w3fzA7fIR-f6TYndRT9tSpmjs',
  authDomain: 'words-752d4.firebaseapp.com',
  projectId: 'words-752d4',
  storageBucket: 'words-752d4.firebasestorage.app',
  messagingSenderId: '246004280249',
  appId: '1:246004280249:web:a895230e785683bcd56468',
  measurementId: 'G-YPFE9R9WHQ',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
