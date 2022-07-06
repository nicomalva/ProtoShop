import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import {
  getFirestore, 
  collection, 
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcW40AEgl0p7aQb7xitmaOj8p7-ar_zSo",
  authDomain: "ne-commerce.firebaseapp.com",
  projectId: "ne-commerce",
  storageBucket: "ne-commerce.appspot.com",
  messagingSenderId: "380716186371",
  appId: "1:380716186371:web:265945b23b9fcc7bb1c736",
  measurementId: "G-M4V5MSJZ0H"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getProducts = async () => {

  const response = await getDocs(collection(db, "Productos"));
  const products = [];
  response.forEach((product) => {products.push(product);});
  return products;

}

export const getProductById = async (id) => {

  const docRef = doc(db, "Productos", id);
  
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    return docSnap;

  } else {
    
  console.log("No such document!");

  }

}