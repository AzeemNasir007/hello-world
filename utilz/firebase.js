const firebase = require('firebase');
require('firebase/firestore');

//Set up firebase
const firebaseConfig = {
  // Firestone credentials
  apiKey: "AIzaSyDRNdpAP5fCkTP4k4WrQdEgzdmNLxtgN8g",
  authDomain: "chatapp-ce5f4.firebaseapp.com",
  projectId: "chatapp-ce5f4",
  storageBucket: "chatapp-ce5f4.appspot.com",
  messagingSenderId: "304364997376",
  appId: "1:304364997376:web:7bfa30463e942bbc6341e5",
  measurementId: "G-QC6XL9MF21"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



export default firebase






