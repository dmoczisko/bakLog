import { defineStore } from 'pinia';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/firebase';
import { useStoreNeedToPlay } from '@/stores/storeNeedToPlay';
import type UserInterface from '@/models/UserModel';

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: { id: '', email: '' } as UserInterface
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
          this.user = { id: '', email: '' };
          this.router.replace('/login');
        }
      });
    },
    emailUser(credentials: any) {
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'https://baklog-firebase.web.app/',
        // This must be true.
        handleCodeInApp: true
      };

      sendSignInLinkToEmail(auth, credentials.email, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem('emailForSignIn', credentials.email);
          console.log('then has completed user worked!');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(
            'Error Code: ',
            errorCode,
            ' Error Message: ',
            errorMessage
          );
          // ...
        });
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, credentials.email, window.location.href)
          .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn');
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      }
    },
    registerUser(credentials: any) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential: any) => {
          // part of firebase9 docs, need to understand this better but ignoring eslint error for now
          /* eslint-disable @typescript-eslint/no-unused-vars */
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
