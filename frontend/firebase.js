// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtbvdD9OUJ7l7ebejRqMKEDnK_bv0vbm0",
  authDomain: "academic-weapon.firebaseapp.com",
  projectId: "academic-weapon",
  storageBucket: "academic-weapon.appspot.com",
  messagingSenderId: "400701336001",
  appId: "1:400701336001:web:1e3417cc7862df0493a740",
  measurementId: "G-5Q3PK27ZP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const profilesReference = collection(db, 'profiles');

const storage = getStorage()




const auth = getAuth(app);

export { auth, db, profilesReference, storage};
