import Firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBS53SyoKArThFNKFD-sLtxdmCPRcuHVCw",
  authDomain: "pooltennis-1.firebaseapp.com",
  databaseURL: "https://pooltennis-1.firebaseio.com",
  projectId: "pooltennis-1",
  storageBucket: "pooltennis-1.appspot.com",
  messagingSenderId: "978466839727"
};
const firebase = Firebase.initializeApp(config);

export default firebase;
