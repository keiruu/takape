import React, { useContext, useState, useEffect } from 'react'
import CafeDataService from '../services/CafeDataService'

export const CafeContext = React.createContext()

export function useCafe() {
    return useContext(CafeContext)
}

export function CafeProvider({children}) {
    const [cafes, setCafes] = useState([])
    const [selectedCafe, setSelectedCafe] = useState([])
    const [searchName, setSearchName] = useState("")
    const [searchProvince, setSearchProvince] = useState("")
    const [searchCity, setSearchCity] = useState("")
    const [results, setResults] = useState("")
    const [browse, setBrowse] = useState(false)
    const [loading, setLoading] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [buttonDisable, setButtonDisable] = useState(true)
    const [selected, setSelected] = useState("")


    const find = (province, city) => {
        CafeDataService.find(province, city)
            .then(response => {
                setCafes(response.data.cafes)
                if(response.data.total_results === 0){
                    setResults(response.data.total_results)
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const refreshList = () => {
        retrieveCafes()
    }
    
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

    const findByName = () => {
        find(searchName, "name")
    }

    const findPlace = () => {
        find(searchProvince, searchCity)
    }

    useEffect(() => {
        retrieveCafes()
    }, [])

    const value = {
        cafes,
        searchCity,
        searchName,
        searchProvince,
        setSearchCity,
        setSearchName,
        setSearchProvince,
        setCafes,
        find,
        findPlace,
        findByName,
        results,
        browse,
        setBrowse,
        disabled,
        setDisabled,
        buttonDisable,
        setButtonDisable,
        selected, 
        setSelected,
        loading,
        setLoading,
        setSelectedCafe,
        selectedCafe
    }


    return (
        <div>
            <CafeContext.Provider value={value}>
                {children} 
            </CafeContext.Provider> 
        </div>
    )
}
