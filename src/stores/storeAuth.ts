import { defineStore } from 'pinia';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/firebase';
import { useStoreNeedToPlay } from '@/stores/storeNeedToPlay';

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    };
  },
  actions: {
    init() {
      const storeNeedToPlay: any = useStoreNeedToPlay();
      onAuthStateChanged(auth, (user) => {
        if (user && user.uid && user.email) {
          this.user = { id: user.uid, email: user.email };
          this.router.push('/games');
          storeNeedToPlay.init();
        } else {
          this.user = {};
          this.router.replace('/login');
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
