import React, {useRef, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Navbar from './Navbar'

export default function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updatePassword, updateEmail, logout} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setLoading(true)

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }

        const promises = []
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        })
    
        setLoading(false)
    }

    async function handleLogout(){
        setError('')

        try{
            await logout()
            history.push('/login')
        }catch{
            setError('Failed to logout')
        }
    }

    return (
        <>
            <Navbar/>
          
                <form action="#" className="form" onSubmit={handleSubmit}>
                        <h2 className="title">Update Profile</h2>
                        <p className="errormessage">{error}</p>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" ref={emailRef} defaultValue={currentUser.email}/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Leave blank to keep the same" ref={passwordRef}/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Leave blank to keep the same" ref={passwordConfirmRef}/>
                        </div>
                        
                            <div className="updateprofile-btn">
                                <input disabled={loading} onClick={handleLogout} className="btn outline" value="Logout" />
                                <input disabled={loading} type="submit" className="btn" value="Update" />
                            </div>
                            <Link to="/" className="forgotpassword">Cancel</Link>
                            
                    </form>
           

        </>
    )
}
