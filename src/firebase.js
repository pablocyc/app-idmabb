import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js"
import { FIREBASE } from "./config.js"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js"

const app = initializeApp(FIREBASE.firebaseConfig)
const db = getFirestore(app)

// Create
export const saveIdm = (title, description) =>
  addDoc(collection(db, 'ABB'), { title, description })

// Read
export const getIdms = () => getDocs(collection(db, 'ABB'))
export const getIdm = id => getDoc(doc(db, 'ABB', id))
export const onGetIdms = callback => onSnapshot(collection(db, 'ABB/IDM144-0/Volt_L1-N'), callback)

// Update
export const updateIdm = (id, title, description) => {
  updateDoc(doc(db, 'ABB', id), { title, description })
}

// Delete
export const deleteIdm = id => deleteDoc(doc(db, 'ABB', id))
