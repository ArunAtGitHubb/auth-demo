import React, { createContext, useContext, useEffect, useState } from 'react'
import { Auth } from "../firebase"

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const auth = Auth.getAuth()

    const signup = (email, password) => {
        return Auth.createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return Auth.signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return Auth.signOut(auth)
    }

    const resetPassword = (email) => {
        return Auth.sendPasswordResetEmail(auth, email)
    }

    const googleSignIn = () => {
        const provider = new Auth.GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.setCustomParameters({
            'login_hint': 'user@example.com'
        });
        return Auth.signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubcribe = Auth.getAuth().onAuthStateChanged(user => {
            setUser(user)
        })

        return unsubcribe
    }, [])

    const value = {
        user,
        signup,
        login,
        logout,
        resetPassword,
        googleSignIn
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
