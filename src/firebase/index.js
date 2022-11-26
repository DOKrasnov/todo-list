import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

/**
 * Parameters for connecting to firebase
 * @constant {Object} firebaseConfig
 * @param {string} apiKey
 * @param {string} authDomain
 * @param {string} databaseURL
 * @param {string} projectId
 * @param {string} storageBucket
 * @param {string} messagingSenderId
 * @param {string} appId
 */
const firebaseConfig = {
  apiKey: "AIzaSyAOBodYOp57_sfrn0Mi6EV0zSeUMVHnEZM",
  authDomain: "todo-list-react-project.firebaseapp.com",
  databaseURL:
    "https://todo-list-react-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-list-react-project",
  storageBucket: "todo-list-react-project.appspot.com",
  messagingSenderId: "775019396700",
  appId: "1:775019396700:web:30947026f5f26cf109b099",
};

/**
 * @namespace firebase is a global namespace from which all Firebase services are accessed.
 * @function initializeApp Creates and initializes a Firebase app instance.
 *
 */
firebase.initializeApp(firebaseConfig);

/** 
 * @function storage the Storage service for the app
 */
export const storage = firebase.storage();

export default firebase;
