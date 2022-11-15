import { defineStore } from 'pinia';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import type { UserInterface } from '@/models/models';

const provider = new GoogleAuthProvider();

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: { id: '', email: '' } as UserInterface
    };
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user && user.uid && user.email) {
          this.user = { id: user.uid, email: user.email };
          this.router.push('/my-games');
        } else {
          this.user = { id: '', email: '' };
          this.router.replace('/login');
        }
      });
    },

    async registerUser(auth: any) {
      console.log('register user!');

      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential) {
            credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // create document with user uid in the users collection, then create document of games within that users document
            setDoc(doc(db, 'users', user.uid), {});
            // ...
          }
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(errorCode, errorMessage, email, credential);
          // ...
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          console.log('user signed out');
        })
        .catch((error) => {
          console.log('Logout User Error: ', error.message);
        });
    }
  }
});
