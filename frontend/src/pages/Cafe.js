import React, {useContext} from 'react'
import CafesList from '../components/CafesList';
import Footer from '../components/Footer';
import Skeleton from '../components/Skeleton';
import { CafeContext } from '../contexts/CafeContext';
import Navbar from '../components/Navbar'

export default function Cafe() {
    const cafe = useContext(CafeContext)
    return (
        <div>
            <Navbar/>
            <CafesList/>
            <Footer/>
        </div>
    )
}
