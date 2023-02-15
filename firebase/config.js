import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXyyGmlL9c9yT_eUP7cO_LNPFn4tyP0GU",
  authDomain: "react-native-app-social.firebaseapp.com",
  projectId: "react-native-app-social",
  storageBucket: "react-native-app-social.appspot.com",
  messagingSenderId: "1047668523729",
  appId: "1:1047668523729:web:e7848ab678a15cdfa8fbf0",
  measurementId: "G-6YRSHRKZ1D",
};

export default firebase.initializeApp(firebaseConfig);
