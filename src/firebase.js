import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyB4VatxwtwKzR0u7av5I4BujEOIVuT0h50',
  authDomain: 'auth-development-50d4c.firebaseapp.com',
  projectId: 'auth-development-50d4c',
  storageBucket: 'auth-development-50d4c.appspot.com',
  messagingSenderId: '905510531096',
  appId: '1:905510531096:web:088d0e67edab114e3e136d',
});
export const auth = app.auth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firestore = firebase.firestore();
export const createUserDocument = async (user, name, password) => {
  if (!user) return;

  const displayName = name;
  const pass = password;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;

    try {
      await userRef.set({
        email,
        displayName,
        pass,

        createdAt: new Date(),
      });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
};

export default app;
