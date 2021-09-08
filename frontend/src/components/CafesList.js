import React, {useState, useContext, useRef, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'

import SelectDropdown from '../components/SelectDropdown' 
import { CafeContext } from '../contexts/CafeContext';

import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import side_img from "../img/headersideimg.svg"

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Skeleton from '../components/Skeleton';

defineLordIconElement(loadAnimation);

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CafesList(props) {
    const cafe = useContext(CafeContext)

    const [tippy, setTippy] = useState(false)
    const [show, setShow] = useState(false)
    const [browseClick, setBrowseClick] = useState(false)
    const disabledtrue = false

    const history = useHistory()
    const cafeList = cafe.cafes
    const scrollRef = useRef()

    const clickHandler = (selectedOption) => {
        try{
            if(selectedOption.value.length === 4){
                setShow(false)
                cafe.setSelected(selectedOption.value)
                cafe.setDisabled(false)
                cafe.setSearchProvince(selectedOption.label)
            } else {
                setTippy(true)
                cafe.setButtonDisable(false)
                let selectedCity = selectedOption.label.split(' ').join('')
                cafe.setSearchCity(selectedCity)
            }
        }catch(e){
            console.log(e)
        }
    }
    
    const browseHandler = () => {
        cafe.setBrowse(true)
        setShow(true)
        scrollRef.current.scrollIntoView() 
        cafe.findPlace()
    }

    const timer = setTimeout(() => {
        cafe.setLoading(false)
    }, 3000)

    useEffect(() => {
        cafe.setLoading(true)
        const timer = setTimeout(() => {
            cafe.setLoading(false)
        }, 2000)
    }, [])

    
    
    return (
        <div>
            <div className="flex flex-col gap-y-16 items-center bg-white pb-16">
                <div className="flex justify-center rounded-b-0 md:rounded-b-1/2 bg-bgcolor pb-20 w-full">
                    <div className="text-center pt-10">
                        <lord-icon
                            src="https://cdn.lordicon.com/zzcjjxew.json"
                            trigger="loop"
                            colors="primary:#C9593F,secondary:#C9593F"
                            style={{ width:545, height:50, marginBottom:10}}
                        >
                        </lord-icon>
                        <h1 className="font-bold text-2xl md:text-5xl text-accent lg:w-full w-medsm">Find a list of cafes near you</h1>
                        {/* <p className="text-sm lg:text-lg opacity-60 mt-2">Browse through our list of cafes found in Panay Island, Philippines!</p> */}
                        <div className="flex mt-4 flex-col lg:flex-row justify-center items-center">
                                <div>
                                    <SelectDropdown dropdown="provinceobj" clickHandler={clickHandler} disabled={disabledtrue}/>
                                </div>

                                <Tippy content="Please select a province first" animation="scale" placement="bottom" disabled={!cafe.disabled}>
                                    <div className={cafe.disabled ? "cursor-not-allowed" : "cursor-pointer"}>
                                        <SelectDropdown dropdown="cityobj" clickHandler={clickHandler} disabled={cafe.disabled}/>   
                                    </div>
                                </Tippy>   
                                <Tippy content={cafe.disabled ? "Please select a province first" : "Please select a city"} animation="scale" placement="bottom" disabled={tippy}>
                                    <div>
                                        <button disabled={cafe.buttonDisable} onClick={browseHandler} className="bg-bggradient border-2 border-transparent transition-all hover:border-white text-white text-md lg:text-lg py-1.5 px-17 lg:px-10 rounded-lg mb-0 ml-2" >
                                            Browse Now
                                        </button>
                                    </div>
                                </Tippy> 
                        </div>
                    </div>
                </div>
                

                <div ref={scrollRef} className="bg-white w-full">
                    {show && 
                        <div className=" flex-col mt-16 w-full ">
                            <h1 className="font-semibold text-xl md:text-3xl flex justify-center w-2/3 ml-6">You searched for cafes within:</h1>
                            <span className="text-accent font-semibold text-xl md:text-3xl flex justify-center w-2/3">{cafe.searchCity}, {cafe.searchProvince}</span>
                        </div> 
                    }
                    
                    {cafe.loading && <Skeleton/>}
                    {!cafe.loading && (
                         <div className="justify-center w-full lg:w-med m-auto gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 px-10 lg:px-0">  
                         {cafeList.map((cafes, index) => {
                             const city_body = cafes.city.toLowerCase()
                             const city_head = cafes.city[0].toUpperCase()
                             const city = city_head + city_body.substring(1)
                 
                             return(
                                     <div key={index}>
                                         
                                         <div className="bg-white shadow-gray w-full rounded-2xl ">
                                             <div className="w-full h-52 overflow-hidden rounded-t-2xl bg-black cursor-pointer">
                                                 <Link to={`/cafes/${cafes._id}`}><img src={cafes.logo} className="opacity-50 hover:opacity-100 object-cover h-52 w-full rounded-t-2xl transition-all transform hover:scale-105" alt=""/></Link>
                                                 
                                             </div>
                                             <div className="p-6">
                                                 <p className="font-bold text-lg">{cafes.name}</p>
                                                 <p><b>City/Province: </b>{`${city}, ${cafes.province}`}</p>
                                                 <p className=""><b>Address: </b>{cafes.address}</p>
                                             </div>
                                             <div className="flex justify-center">
                                                 <Link to={`/cafes/${cafes._id}`}>
                                                     <button className="bg-lightergray rounded-xl mb-4 py-2 px-28 border-2 border-lightergray transition-all hover:bg-white hover:border-lightergray">
                                                         <span className="font-semibold opacity-70">View</span>
                                                     </button>
                                                 </Link>
                                             </div>
                                         </div>
                                     </div>
                                )
                            })}
                        </div>
                    )}

                    {cafe.results === 0 && show === true ? (
                        <div className="flex justify-center flex-col items-center gap-y-6 my-20 mb-56 md:px-0 px-6">
                            <p className="text-md md:text-2xl font-bold text-center text-accent">Sorry! 😥 We are still building our database, <br/> we don't have any results for this place for now.</p>
                            <Tippy content="Oops! 😅 We haven't implemented this feature yet" animation="scale" placement="bottom">
                                <button className="bg-lightaccent p-4 text-accent font-semibold rounded-xl ">Contribute to our database</button>
                            </Tippy>
                        </div>
                    ) : null}
                </div>

                
            </div>
            
        </div>
    )
}