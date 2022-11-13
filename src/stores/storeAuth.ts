import { defineStore } from 'pinia';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import type { UserInterface } from '@/models/models';

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
    async registerUser(credentials: any) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential: any) => {
          const user = userCredential.user;
          // create document with user uid in the users collection, then create document of games within that users document
          setDoc(doc(db, 'users', user.uid), {});
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
