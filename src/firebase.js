import { initializeApp } from "firebase/app"
import * as FirebaseAuth from 'firebase/auth'

const config = {
    apiKey: "AIzaSyBKGLjIDbCLwEFFLsfTrck1F-GirX1r_5E",
    authDomain: "generic-auth-demo.firebaseapp.com",
    projectId: "generic-auth-demo",
    storageBucket: "generic-auth-demo.appspot.com",
    messagingSenderId: "474798589945",
    appId: "1:474798589945:web:751b02ef44ae75f1421f28",
    measurementId: "G-BCJMG0WEDV"
}

const app = initializeApp(config)

export const Auth = FirebaseAuth
export default app