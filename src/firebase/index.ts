'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length) {
    return getSdks(getApp());
  }

  // In a production environment with Firebase App Hosting, the config
  // is often provided automatically. We prioritize that but fall back
  // to the environment variables for local development.
  let firebaseApp;
  try {
    // Attempt to initialize via Firebase App Hosting's auto-config
    firebaseApp = initializeApp();
  } catch (e) {
    // Since this is a prototype without a backend, we will return nulls
    // to allow the app to run without a real Firebase project.
    return { firebaseApp: null, auth: null, firestore: null };
  }

  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp | null) {
  if (!firebaseApp) {
    return { firebaseApp: null, auth: null, firestore: null };
  }
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
