// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqPkxQvNz5QBLAZxmEWHVDMCaJ--RiNEE",
    authDomain: "seb-firebase.firebaseapp.com",
    projectId: "seb-firebase",
    storageBucket: "seb-firebase.appspot.com",
    messagingSenderId: "279342806732",
    appId: "1:279342806732:web:977e92a3fcc93b8d6c7469",
    measurementId: "G-2B75K9K1G2",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

export default auth
