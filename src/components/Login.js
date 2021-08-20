import React, {useRef, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/Login.css'

export default function Login() {

    const signin_emailRef = useRef()
    const signin_passwordRef = useRef()
    const signup_emailRef = useRef()
    const signup_passwordRef = useRef()
    const signup_passwordconfirmRef = useRef()
    const {login, signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSignin(e) {
        e.preventDefault()

        try {
          setError("")
          setLoading(true)
          await login(signin_emailRef.current.value, signin_passwordRef.current.value)
          history.push('/')
        } catch(err){
          setError(err.message)
        }
    
        setLoading(false)
    }

    async function handleSignup(e) {
        e.preventDefault()
    
        if(signup_passwordRef.current.value !== signup_passwordconfirmRef.current.value){
            setError("Passwords don't match")
            console.log("Passwords don't match")
        } else {
            try {
                setError("")
                setLoading(true)
                await signup(signup_emailRef.current.value, signup_passwordRef.current.value)
                history.push('/')
              } catch(err) {
                console.log(err.message)
                setError(err.message)
              }
        }
    
        setLoading(false)
    }


    // code to trigger transition animation
    const [isActive, setActive] = useState(false);
    const toggleClass = () => {
        setActive(!isActive);
    };

    return (
        <>
            <Navbar/>
            <div className={isActive ? 'formcontainer sign-up-mode': 'formcontainer'}>
                <div className="forms-container">
                    <div className="signin-signup">

                    {/* SIGN IN FORM */}
                    <form action="#" class="sign-in-form" onSubmit={handleSignin}>
                        <h2 className="title">Sign in</h2>
                        <p className="errormessage">{error}</p>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Email" ref={signin_emailRef}/>
                        </div>

                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" ref={signin_passwordRef} />
                        </div>
                        <div className="forgotpassword">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                            <input disabled={loading} type="submit" value="Login" className="btn solid" />
                            <p className="social-text">Or Sign in with</p>

                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>

                    {/* SIGN UP FORM */}
                    <form action="#" className="sign-up-form" onSubmit={handleSignup}>
                        <h2 className="title">Sign up</h2>
                        <p className="errormessage">{error}</p>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" ref={signup_emailRef} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" ref={signup_passwordRef}/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Confirm Password" ref={signup_passwordconfirmRef}/>
                        </div>
                        
                            <input disabled={loading} type="submit" className="btn" value="Sign up" />
                            <p className="social-text">Or Sign up with social platforms</p>


                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>

                    </form>

                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                    <div className="content">
                        <h3>Don't have an account?</h3>
                        <p>
                        
                        </p>
                        <button className='btn transparent' id="sign-up-btn" onClick={toggleClass}>
                            Sign up
                        </button>
                    </div>
                    <img src="img/log.svg" class="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                    <div className="content">
                        <h3>Already have an account?</h3>
                        <p>
                        
                        </p>
                        <button className="btn transparent" id="sign-in-btn" onClick={toggleClass}>
                        Sign in
                        </button>
                    </div>
                    <img src="img/register.svg" className="image" alt="" />
                    </div>
                </div>
            </div>
            <div className="h-36"></div>
        </>
    )
}
