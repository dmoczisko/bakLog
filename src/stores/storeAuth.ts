import { defineStore } from 'pinia';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/firebase';

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    };
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          this.user.id = user.uid;
          this.user.email = user.email;
        } else {
          this.user = {};
        }
      });
    },
    registerUser(credentials: any) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential: any) => {
          const user = userCredential.user;
        })
        .catch((error: any) => {
          console.log('error.message: ', error.message);
        });
    },
    loginUser(credentials: any) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Login User: ', user);
        })
        .catch((error) => {
          console.log('Login User Error: ', error.message);
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
