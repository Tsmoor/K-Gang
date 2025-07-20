const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "xxx",
  appId: "1:xxx:web:xxx"
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db   = firebase.firestore();
