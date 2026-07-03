import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase web config. These values are meant to be public (embedded in the
// browser) — security is enforced by the Firestore rules, not by hiding these.
const firebaseConfig = {
  apiKey: 'AIzaSyDfPfoISpAmgb5ZHXjUjgpV0jRwW0nkahY',
  authDomain: 'maggie-portfolio-d47bc.firebaseapp.com',
  projectId: 'maggie-portfolio-d47bc',
  storageBucket: 'maggie-portfolio-d47bc.firebasestorage.app',
  messagingSenderId: '626560149754',
  appId: '1:626560149754:web:e48122c48affded5e1c143',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
