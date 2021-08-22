import React, {useRef, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Navbar from './Navbar'

export default function ForgotPassword() {

    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

    
        try {
          setMessage('')
          setError("")
          setLoading(true)
          await resetPassword(emailRef.current.value)
          setMessage('Check your inbox for further instructions')
        } catch {
          setError("Failed to reset password")
        }
    
        setLoading(false)
    }

    return (
        <>
            <Navbar/>
            
            <div className="w-100 text-center mt-2">
            </div>

            <div action="#" className="form" onSubmit={handleSubmit}>
            
                <div className="passwordreset-form">
                    <h2 className="title">Password Reset</h2>
                    <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="Email" ref={emailRef}/>
                    </div>
                    <input disabled={loading} type="submit" className="btn" value="Reset" />
                    <Link to="/login">Cancel</Link>
                </div>
            </div>
        </>
    )
}
