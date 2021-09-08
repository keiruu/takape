import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { CafeContext } from '../contexts/CafeContext';
import Skeleton from 'react-loading-skeleton';
import Navbar from './Navbar';
export default function SkeletonCafe(props) {
    const cafe = useContext(CafeContext)

    const [show, setShow] = useState(false)
    const cafeList = cafe.cafes
    
    return (
        <div>
            <Navbar/>
            <div className="flex flex-col m-auto mt-10 gap-y-20 pb-20">
                <div className="flex flex-col md:flex-row bg-white shadow-gray md:w-full lg:w-med p-4 lg:rounded-xl m-auto gap-x-10 py-6">
                    <div className="overflow-hidden w-full md:w-1/2 h-64 md:h-80">
                        <Skeleton className="object-cover h-full w-full"/>
                    </div>
                    <div className="mt-6 w-full md:w-1/2 relative md:pr-10">
                        <h5 className="font-bold text-3xl"><Skeleton width={`70%`}/></h5>
                        <p><Skeleton/><br/><Skeleton/></p>
                        <p><Skeleton width={`50%`}/><br/></p>

                        <p className="mt-20 text-5xl">
                            <Skeleton  width={`40%`}/>
                        </p>
                        <div className="hidden md:absolute md:block right-4 -top-4 ">
                          <Link to="/cafes" className="underline">
                            <i class="fas fa-arrow-left"></i>
                          </Link>
                        </div>
                   </div>

                </div>
            </div>
        </div>
    )
}