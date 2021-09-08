import React, { useContext, useState, useEffect } from 'react'
import {auth} from '../Firebase'
import { css } from "@emotion/react";
import GridLoader from "react-spinners/GridLoader";


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [userUID, setUserUID] = useState()
    const [loading, setLoading] = useState(true)
    let [color, setColor] = useState("#C9593F");


    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email){
        return currentUser.updateEmail(email)
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    function updateUsername(username){
        return currentUser.updateProfile(username)
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
             if (user) {
                setCurrentUser(user)
                setUserUID(user.uid);
            }
            // INDI NI GANI PAG HULAGA KAY MAHIBI KA GID DASON
            setLoading(false)
        })
        
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        userUID,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }


    return (
        <div>
            <AuthContext.Provider value={value}>
                {/* this means that if we're not loading then we render the children */}
                
                {!loading ? children : 
                    <div className="bg-white flex justify-center items-center h-screen">
                        <GridLoader color={color} loading={true}  size={15} />
                    </div>
                } 
            </AuthContext.Provider> 
        </div>
    )
}
