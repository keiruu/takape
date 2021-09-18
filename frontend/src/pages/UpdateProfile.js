import React, {useRef, useState, useEffect} from 'react'
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toyfaces from "../img/toyfaces.jpg"

import 'tippy.js/animations/scale.css'
import Tippy from '@tippyjs/react'

import "../styles/App.css"

import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";

defineLordIconElement(loadAnimation);

export default function UpdateProfile() {

    const [show, setShow] = useState(false)
    const imageRef = useRef()
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updatePassword, updateEmail, userIMG, setUserIMG, updateIMG, updateDisplayName} = useAuth()
    const [error, setError] = useState('')
    const [nameChange, setNameChange] = useState()
    const [inputChange, setInputChange] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setLoading(true)

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError("Passwords do not match")
        }

        const promises = []
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(nameRef.current.value !== currentUser.displayName){
            promises.push(updateDisplayName(nameRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError("Passwords do not match")
        } else {
            Promise.all(promises).then(() => {
                setError("Account updated successfully!")
                setLoading(false)
            }).catch((e) => {
                console.log(e)
                setError("Failed to update account, Try logging in again.")
            }).finally(() => {
                setLoading(false)
            })
        }
    
        setLoading(false)
    }
    
    const previousPage = () => {
        history.goBack()
    }

    let file = {}
    async function chooseFile(event){
        file = event.target.files[0]
        await updateIMG(file)
    }

    useEffect(() => {
        console.log("user img ", userIMG)
    }, [userIMG]);

    return (
        <>
            <Navbar/>
                <div className="relative mb-20 flex flex-col text-center items-center justify-center bg-white lg:p-2 py-20 md:gap-x-20 lg:gap-x-32 rounded-3xl lg:w-med m-auto shadow-accent mt-10">
                <div className="absolute left-12 top-10 ">
                    <button onClick={previousPage}><i class="fas fa-arrow-left"></i></button>
                </div>
                
                <div className="flexbg-white w-2/3 m-6 rounded-2xl pb-10" >
                    <div className="items-center lg:mb-14 flex justify-center items-center flex-col">
                        <div className="flex-col flex items-center image-upload">
                            <p className="text-xl my-6 mt-10 text-darkaccent opacity-70">Update Profile</p>
                            
                            <div className="flex-col flex items-center relative image-upload mb-4">
                                {currentUser && currentUser.photoURL ? 
                                    <label htmlFor="fileInput">
                                        <div className="flex-col flex items-center z-10 cursor-pointer">
                                            <img
                                                className="w-20 h-20 rounded-full mt-4"
                                                src={userIMG}
                                                alt=""
                                            />
                                        </div>
                                    </label> : 
                                <label htmlFor="fileInput">
                                <div className="mt-4 z-0 cursor-pointer">
                                        <lord-icon
                                            src="https://cdn.lordicon.com/dxjqoygy.json"
                                            stroke="100"
                                            colors="primary:#C9593F,secondary:#C9593F"
                                            style={{ width:85, height:85, backgroundColor: "#FFF5E1", borderRadius: 100, padding: 4}}
                                        >
                                        </lord-icon>
                                </div>
                                </label>
                                }

                                <input className="hidden" id="fileInput" type="file" onChange={chooseFile} accept="image/*"/>
                                <label htmlFor="fileInput">
                                    <div className="cursor-pointer transition-all absolute rounded-full text-white hover:text-accent bg-accent hover:bg-white p-1 px-2 top-18 -right-2">
                                        <i className="fas fa-camera"></i>
                                    </div>
                                </label>
                            </div>
                            
                        </div>
                      

                    <form className="flex items-center flex-col mt-8 lg:mt-4 lg:m-0" action="#" onSubmit={handleSubmit}>
                        <div className="w-72 md:w-80 lg:w-96 flex flex-col gap-y-4">
                            <div>
                                <p className="text-left text-sm">Display Name</p>
                                <i className="fas fa-user absolute py-8 px-4 text-gray"></i>
                                <input className="focus:outline-none focus:ring focus:border-lightaccent hover:border-accent border-2 border-transparent transition-all bg-lightgray p-4 w-72 md:w-80 lg:w-96 md:text-md text-sm rounded-lg my-3 pl-12" type="text" placeholder="Change Display Name" ref={nameRef} value={nameChange === "" ? "" : nameChange ? nameChange : currentUser.displayName} onChange={e => setNameChange(e.target.value)} />
                            </div>
                       
                            <div>
                                <p className="text-left text-sm">Email</p>
                                <i className="fas fa-envelope absolute py-8 px-4 text-gray"></i>
                                <input className="focus:outline-none focus:ring focus:border-lightaccent hover:border-accent border-2 border-transparent transition-all bg-lightgray p-4 w-72 md:w-80 lg:w-96 md:text-md text-sm rounded-lg my-3 pl-12" type="email" placeholder="Change Email" ref={emailRef} value={inputChange === "" ? "" : inputChange ? inputChange : currentUser.email} onChange={e => setInputChange(e.target.value)} />
                            </div>
                            
                            <div>
                                <p className="text-left text-sm">Change Password</p>
                                <i className="fas fa-lock absolute py-8 px-4 text-gray"></i>
                                <input className="focus:outline-none focus:ring focus:border-lightaccent hover:border-accent border-2 border-transparent transition-all bg-lightgray p-4 w-72 md:w-80 lg:w-96 md:text-md text-sm rounded-lg my-3 pl-12" type="password" placeholder="Change password" ref={passwordRef} />
                            </div>

                            <div>
                                <p className="text-left text-sm">Confirm Password</p>
                                <i className="fas fa-lock absolute py-8 px-4 text-gray"></i>
                                <input className="focus:outline-none focus:ring focus:border-lightaccent hover:border-accent border-2 border-transparent transition-all bg-lightgray p-4 w-72 md:w-80 lg:w-96 md:text-md text-sm rounded-lg my-3 pl-12" type="password" placeholder="Confirm password" ref={passwordConfirmRef} />
                            </div>
                        
                            <div>
                                <Tippy visible={error ? true : false} content={error} onClickOutside={() => setError("")}>
                                <button disabled={loading} type="submit" className="bg-bggradient w-72 md:w-60 lg:w-96 text-white p-2 py-4 rounded-xl shadow-light my-4 hover:border-white border-2 border-transparent transition-all font-semibold">
                                    Update
                                </button>
                                </Tippy>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            </div>
            
            <Footer/>
        </>
    )
}
