import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAUg7byYFBQpqxY2LhAjYeIo-6GcttuU7g",
  authDomain: "crwn-db-9e20e.firebaseapp.com",
  databaseURL: "https://crwn-db-9e20e.firebaseio.com",
  projectId: "crwn-db-9e20e",
  storageBucket: "crwn-db-9e20e.appspot.com",
  messagingSenderId: "608014898428",
  appId: "1:608014898428:web:064879518ef426d336f379",
  measurementId: "G-8FGK6JNDJF",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
