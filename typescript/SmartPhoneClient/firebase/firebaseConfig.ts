// firebaseConfig.ts
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth"
import firebaseConfig from "./secretFirebaseConfig"

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth();
const db: Firestore = getFirestore(app);

export { db, auth };
