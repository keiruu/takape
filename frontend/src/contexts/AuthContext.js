import React, { useContext, useState, useEffect } from 'react'
import * as firebase from 'firebase'
import {auth, storage} from '../Firebase'
import { css } from "@emotion/react"
import GridLoader from "react-spinners/GridLoader"
import toyfaces from "../img/toyfaces.jpg"


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [userIMG, setUserIMG] = useState("image")
    const [userUID, setUserUID] = useState()
    const [loading, setLoading] = useState(true)
    let [color, setColor] = useState("#C9593F")

    function signup(name, email, password){
        return (auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                const user = auth.currentUser;
                    user.updateProfile({
                        displayName: name,
                    })
                    return user;
                }).catch(error => {
                    console.log(error.message)
                })
        )
    }

    function updateIMG(photo){
        console.log("this was fired, ")
        storage.ref('users/' + currentUser.uid + '/profile.jpg').put(photo)
            .then(() => {
                storage.ref('users/' + currentUser.uid + '/profile.jpg').getDownloadURL()
                    .then(imgUrl => {
                        currentUser.updateProfile({
                            photoURL: imgUrl
                        })
                        setUserIMG(imgUrl)
                        console.log("Successfully uploaded ", imgUrl)
                    })
        }).catch(error => {
            console.log(error.message)
        })
    }

    function updateDisplayName(name){
        return currentUser.updateProfile({
            displayName: name
        })
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        setCurrentUser("")
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
                setUserUID(user.uid)
                setUserIMG(user.photoURL)
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
        updatePassword,
        userIMG,
        setUserIMG,
        updateIMG,
        updateDisplayName
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
