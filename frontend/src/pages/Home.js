import Navbar from '../components/Navbar'
import '../styles/App.css'
import { useState, Button } from 'react';
import SelectDropdown from '../components/SelectDropdown'
import Footer from '../components/Footer';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";

defineLordIconElement(loadAnimation);

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Home() {

    const [dropdown, setdropdown] = useState("")
    const [buttondisable, setButtondisable] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [selected, setselected] = useState("")
    const [browseitem, setBrowseitem] = useState("")
    const disabledtrue = false

    const clickHandler = (selectedOption) => {
        if(selectedOption.value.length === 4){
            setDisabled(false)
            setselected(selectedOption.value)
        } else {
            setselected(selectedOption.value)
            setButtondisable(false)
        }
    }

    const browseHandler = () => {
        try{
            if(selected.length === 4){
                setDisabled(true)
                setselected(null)
            } else if (!selected) {
            } else {
                setBrowseitem(selected)
            }
        } catch(e) {
        }
    }

    return (
        <>
            <Navbar/>
            <div className="flex flex-col gap-y-44 items-center mt-6">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row bg-white w-full lg:w-med md:h-s lg:rounded-3xl shadow-gray">
                    <div className="bg-bggradient text-center md:text-left py-10 md:pt-32 px-6 lg:px-14 md:w-1/2 lg:rounded-l-3xl">
                        <p className="text-sm lg:text-l mb-4 text-white font-semibold md:mt-4 lg:mt-0">Want to go out for a cup of coffee?</p>
                        <h1 className="font-bold text-4xl lg:text-5xl mb-4 text-white">Find a list of <br/>cafes near you</h1>
                        <p className="text-white opacity-75 text-sm lg:text-md">Browse through our list of cafes found in Panay Island, Philippines!</p>
                    </div>
                    <div className="flex items-center flex-col mt-16 gap-y-4 md:w-1/2">
                        <lord-icon
                            src="https://cdn.lordicon.com/zzcjjxew.json"
                            trigger="loop"
                            colors="primary:#C9593F,secondary:#C9593F"
                            style={{ width:545, height:50, marginBottom:10}}
                        >
                        </lord-icon>
                            <div>
                                <SelectDropdown dropdown="provinceobj" clickHandler={clickHandler} disabled={disabledtrue} />
                            </div>
                                                   
                            <div className={disabled ? "cursor-not-allowed" : "cursor-pointer"}>
                                <SelectDropdown dropdown="cityobj" clickHandler={clickHandler} disabled={disabled} selected={selected} />   
                            </div>
                           
                            <button disabled={buttondisable} onClick={browseHandler} className={classNames(!buttondisable ? "animate-bounce" : "", "bg-bggradient border-2 border-transparent transition-all hover:border-white text-white text-md lg:text-lg py-sm px-17 lg:px-27 rounded-lg mb-32 md:mb-0 m-3")} >
                                Browse Now
                            </button>
                            
                    </div>
                </div>

                {/* TRENDING CAFES */}
                <div className="flex justify-center md:text-left text-center gap-x-56">
                    <div>
                        <h1 className="font-bold text-3xl md:text-4xl mb-4 text-dark">Trending<br/>cafes<br/>today</h1>
                        <p className="text-m md:text-l text-dark">The top-rated<br/>cafes we have<br/>listed here</p>
                    </div>
                    <div className="grid grid-cols-2 gap-20">
                        <div>
                            <div className="rounded-3xl bg-gray w-56 h-56 mx-4">.</div>
                            <p className="text-lg font-bold text-medbrown">Title</p>
                            <p className="">Location details</p>
                        </div>
                        
                        <div>
                            <div className="rounded-3xl bg-gray w-56 h-56 mx-4">.</div>
                            <p className="text-lg font-bold text-medbrown">Title</p>
                            <p className="">Location details</p>
                        </div>
                       
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}
