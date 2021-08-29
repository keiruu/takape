import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import CafeDataService from '../services/cafe'
import SelectDropdown from '../components/SelectDropdown' 
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import Navbar from "./Navbar"


defineLordIconElement(loadAnimation);

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const CafesList = props => {
    const [cafes, setCafes] = useState([])
    const [searchName, setSearchName] = useState("")
    const [searchProvince, setSearchProvince] = useState("")
    const [searchCity, setSearchCity] = useState("")

    const [dropdown, setdropdown] = useState("")
    const [buttondisable, setButtonDisable] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [selected, setSelected] = useState("")
    const [browseitem, setBrowseitem] = useState("")
    const disabledtrue = false

    const clickHandler = (selectedOption) => {
        if(selectedOption.value.length === 4){
            setSelected(selectedOption.value)
            setDisabled(false)
            setSearchProvince(selectedOption.label)
        } else {
            setSelected(selectedOption.value)
            setButtonDisable(false)
            let city = selectedOption.label.split(' ').join('')
            setSearchCity(city)
            console.log(city)
        }
        console.log("province: " + searchProvince)
        console.log("city " + searchCity )
    }
    
    useEffect(() => {
        retrieveCafes()
    }, [])

    const retrieveCafes = () => {
        CafeDataService.getAll()
            .then(response => {
                console.log(response.data)
                setCafes(response.data.cafes)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const find = (province, city) => {
        CafeDataService.find(province, city)
            .then(response => {
                console.log(response.data)
                setCafes(response.data.cafes)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const refreshList = () => {
        retrieveCafes()
    }

    const findByName = () => {
        find(searchName, "name")
    }

    const findPlace = () => {
        find(searchProvince, searchCity)
    }

    const browseHandler = () => {
        findPlace()
    }

    return (
        <div>
            <Navbar/>
            <div className="flex flex-col gap-y-44 items-center mt-6">

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

            </div>
        
            {cafes.map((cafe) => {
                        return(
                            <div>
                                {cafe.name}
                                {cafe.province}
                                {cafe.city}
                                
                            </div>
                        )
                })}
        </div>
    )
}

export default CafesList