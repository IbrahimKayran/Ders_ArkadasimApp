import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyACgXCbMe-WyMzlsjlX25DoFoEUYoIC4Uc",
    authDomain: "rnmobil-ac7bd.firebaseapp.com",
    databaseURL: "https://rnmobil-ac7bd.firebaseio.com",
    projectId: "rnmobil-ac7bd",
    storageBucket: "rnmobil-ac7bd.appspot.com",
    messagingSenderId: "555894639177",
    appId: "1:555894639177:web:fef8c303848829c5730d98"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }