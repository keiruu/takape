import Navbar from '../components/Navbar'
import '../styles/App.css'
import Footer from '../components/Footer'
import CafesList from '../components/CafesList'
import { CafeContext } from '../contexts/CafeContext'
import React, {useContext, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'

import Saly from '../img/Saly-2.png'
import { loadAnimation } from "lottie-web"
import { defineLordIconElement } from "lord-icon-element"

import Carousel from '../components/Carousel'

defineLordIconElement(loadAnimation);


export default function Home() {
   const aboutRef = useRef()
   const contactRef = useRef()

   const cafe = useContext(CafeContext)
   const cafeList = cafe.cafes

   const onClick = scrollRef => {
        scrollRef.current.scrollIntoView() 
   }

    // useEffect(() => {
    //     cafe.retrieveCafes()
    // })
  

    return (
        <div>
            <Navbar/>
            <div className="flex justify-center items-center pt-6 lg:m-0 m-4 lg:my-0 my-10">
                <div className="grid gap-y-6">
                    <h1 className="font-bold text-4xl lg:text-5xl text-accent">Looking for a<br/>place to chill?</h1>
                    <p className="w-72 md:w-96 text-lg lg:text-xl text-brown">Check out all the listed cafes we have from within the <b>Panay Island</b> in the Philippines. </p>
                    <div>
                        <Link to="/cafes">
                                <button className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-bggradient text-white p-4 px-14 rounded-xl shadow-light my-4 font-semibold">Find Cafes</button>
                        </Link>
                    </div>
                </div>
                <img
                    className="w-96 lg:w-100 md:block hidden"
                    src={Saly}
                    alt=""
                />
            </div>

            <div id='about' ref={aboutRef} className="bg-white text-center py-10 lg:py-24 flex flex-col items-center justify-center gap-4">
                <p className="mt-10 font-semibold text-xl text-brown">About Takape</p>
                <p className="text-brown w-64 md:w-medsm lg:text-5xl md:text-4xl text-3xl">Takape is a simple website that aims to help you find cafes within Panay Island.</p>
                {/* <p>Made by <a href='#'>Abigail</a></p> */}

                <Carousel/>
            </div>

            <div id='contactus' ref={contactRef} className="text-brown bg-white text-center py-20 pt-10 flex flex-col items-center">
                <a href="mailto:abbyunat@gmail.com" className="w-96 bg-bgcolor cursor-pointer hover:opacity-70 transition-all p-6 pt-4 rounded-xl">
                        <lord-icon
                            src="https://cdn.lordicon.com/rhvddzym.json"
                            trigger="loop"
                            colors="primary:#83564b,secondary:#83564b"
                            style={{width:50, height:50}}>
                        </lord-icon>
                    <p className="text-md lg:text-2xl font-semibold">Get in touch!</p>
                    <p className="text-md lg:text-2xl">abbyunat@gmail.com</p>
                </a>
            </div>
            <Footer/>
        </div>
    )
}
