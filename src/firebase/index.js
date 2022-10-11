// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBifthti7ZXKa50NVSGdc0_cA3y34OnG9w',
  authDomain: 'baklog-firebase.firebaseapp.com',
  projectId: 'baklog-firebase',
  storageBucket: 'baklog-firebase.appspot.com',
  messagingSenderId: '381878335147',
  appId: '1:381878335147:web:a4f973fda9be7c8702e9ee',
  measurementId: 'G-JW7NYW04QM'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
