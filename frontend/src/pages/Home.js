import Navbar from '../components/Navbar'
import '../styles/App.css'
import Footer from '../components/Footer'
import CafesList from '../components/CafesList'
import { CafeContext } from '../contexts/CafeContext'
import React, {useContext, useRef} from 'react'
import { Link } from 'react-router-dom'

import Saly from '../img/Saly-2.png'


export default function Home() {
   

    return (
        <div>
            <Navbar/>
            <div className="flex justify-center items-center pt-6">
                <div className="grid gap-y-6">
                    <h1 className="font-extrabold text-5xl text-accent">Looking for a<br/>place to chill?</h1>
                    <p className="text-xl opacity-60">Takape aims to introduce you to a range of cafes from <br/>within the Panay Island in the Philippines. </p>
                    <div>
                        <Link to="/cafes">
                                <button className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-bggradient text-white p-4 px-14 rounded-xl shadow-light my-4 font-semibold">Find Cafes</button>
                        </Link>
                    </div>
                </div>
                <img
                    className="w-100"
                    src={Saly}
                    alt=""
                />
            </div>
            <div>
                
            </div>
            <Footer/>
        </div>
    )
}
