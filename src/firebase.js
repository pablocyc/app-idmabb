import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js"
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

const app = initializeApp(FIREBASE.firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Create
export const saveIdm = (title, description) =>
  addDoc(collection(db, 'IDM144-0'), { title, description });

// Read
export const getIdms = () => getDocs(collection(db, 'IDM144-0'))
export const getIdm = id => getDoc(doc(db, 'IDM144-0', id))
export const onGetIdms = callback => onSnapshot(collection(db, 'IDM144-0/'), callback);

// Update
export const updateIdm = (id, title, description) => {
  updateDoc(doc(db, 'IDM144-0', id), { title, description })
};

// Delete
export const deleteIdm = id => deleteDoc(doc(db, 'IDM144-0', id));

// Authentication
export const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const statusAuth = onAuthStateChanged;

export const updateUser = updateProfile;
