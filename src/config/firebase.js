import * as firebase from "firebase/app";
import "firebase/compat/database";

let config = {
    apiKey: "AIzaSyDtSWc9b1AuyP0cA1pl4u_dfNLy2xGjKAc",
    authDomain: "ssd-face-recog.firebaseapp.com",
    projectId: "ssd-face-recog",
    storageBucket: "ssd-face-recog.appspot.com",
    messagingSenderId: "83667209665",
    appId: "1:83667209665:web:49355d8b566f89f3fc7340",
    measurementId: "G-D0LTSKN0V6"
};
firebase.initializeApp(config);
export default firebase.database();