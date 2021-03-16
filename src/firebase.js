import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "myst-and-orb",
  storageBucket: "myst-and-orb.appspot.com",
  messagingSenderId: "431559633863",
  appId: process.env.REACT_APP_ID,
  measurementId: "G-W25918HHC5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
// const auth = firebase.auth()
const storage = firebase.storage()
// const provider = new firebase.auth.GoogleAuthProvider()

export { db, storage }
