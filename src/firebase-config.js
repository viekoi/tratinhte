import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbxUVJtZZ5-Ba0ADloO77gxTJ5eL6oUqw",
  authDomain: "quiet-rigging-373508.firebaseapp.com",
  projectId: "quiet-rigging-373508",
  storageBucket: "quiet-rigging-373508.appspot.com",
  messagingSenderId: "110228030516",
  appId: "1:110228030516:web:b70c1a4e39923976967661",
  measurementId: "G-3NLNLYZ6Z6"
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)




