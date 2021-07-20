import React, { useContext, useState, useEffect } from 'react'
import {auth} from '../Firebase'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
    
        return unsubscribe
      }, [])


    const value = {
        currentUser,
        login,
        signup
    }


    return (
        <div>
            <AuthContext.Provider value={value}>
                {/* this means that if we're not loading then we render the children */}
                {!loading && children} 
            </AuthContext.Provider> 
        </div>
    )
}
