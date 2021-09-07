import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import CafesList from '../components/CafesList';
import Footer from '../components/Footer';

import Navbar from '../components/Navbar'
import { CafeContext } from '../contexts/CafeContext';

export default function Cafe() {
    const cafe = useContext(CafeContext)
    const cafeList = cafe.cafes

    return (
        <div>
            <Navbar/>
            <CafesList/>
            <Footer className="relative"/>
        </div>
    )
}
