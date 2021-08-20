import Navbar from './Navbar'
import { useState, Button } from 'react';
import SelectDropdown from './SelectDropdown'
import Footer from './Footer';

export default function Home() {

    const [dropdown, setdropdown] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [selected, setselected] = useState("")
    const [error, setError] = useState("")
    const [browseitem, setBrowseitem] = useState("")
    const disabledtrue = false


    const clickHandler = (selectedOption) => {
        setDisabled(false)
        setselected(selectedOption.value)
    }

    const browseHandler = () => {
        try{
            if(selected.length == 4){
                setError("Select a city")
                window.location.reload()
            } else if (!selected) {
                setError("Select a province")
            } else {
                setBrowseitem(selected)
            }
        } catch(e) {
            setError("Error refresh page")
        }
    }

    return (
        <>
            <Navbar/>
            <div className="flex mt-32 md:mt-52 justify-center h-md">
                <div className="text-center ">
                    <p className="text-l md:text-xl mb-4 text-brown font-semibold">Want to go out for a cup of coffee?</p>
                    <h1 className="font-bold text-4xl md:text-5xl mb-4 text-brown">Find a list of cafes near you</h1>
                    <div className="flex mt-4 items-center flex-col md:flex-row justify-center">
                        <SelectDropdown dropdown="provinceobj" clickHandler={clickHandler} disabled={disabledtrue}/>
                        <SelectDropdown dropdown="cityobj" clickHandler={clickHandler} disabled={disabled} selected={selected}/>                    
                        <button onClick={browseHandler} className="bg-dark hover:bg-darker text-white text-sm py-sm px-16 md:px-3 rounded-lg m-3"  >
                            Browse Now
                        </button>
                    </div>
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            </div>

            <div className="flex justify-center md:text-left text-center gap-x-40">
                <div>
                    <h1 className="font-yeseva text-3xl md:text-4xl mb-4 text-dark">Trending<br/>cafes<br/>today</h1>
                    <p className="text-m md:text-l text-dark">The top-rated<br/>cafes we have<br/>listed here</p>
                </div>
                <div className="grid">
                    <div className="rounded-3xl bg-gray w-56 h-56 mx-4">.</div>
                    <p className="text-lg font-bold text-medbrown">Title</p>
                    <p className="">Location details</p>
                </div>
            </div>

            <Footer/>
        </>
    )
}
