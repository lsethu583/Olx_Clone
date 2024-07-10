import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD4oKxcqG46lrTqVx3h7M9VTG75XsnzePs",
  authDomain: "olx-clone-3b124.firebaseapp.com",
  projectId: "olx-clone-3b124",
  storageBucket: "olx-clone-3b124.appspot.com",
  messagingSenderId: "429946601832",
  appId: "1:429946601832:web:8e9a477722b12a58ebd6dd"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
