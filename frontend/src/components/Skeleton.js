import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { CafeContext } from '../contexts/CafeContext';
import Skeleton from 'react-loading-skeleton';


export default function SkeletonLoader(props) {
    const cafe = useContext(CafeContext)

    const [show, setShow] = useState(false)
    const cafeList = cafe.cafes
    
    return (
        <div>
            <div className="flex flex-col gap-y-16 items-center bg-white pb-16">
                <div className="bg-white w-full">
                    <div className="justify-center w-full lg:w-med m-auto gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 px-10 lg:px-0">  
                        {cafeList.map((cafes, index) => {
                            return(
                                    <div key={index}>
                                        <Skeleton className=" h-52 rounded-3xl w-full transition-all"/>
                                        <div className="bg-white shadow-gray w-full rounded-b-2xl">
                                            <div className="p-6">
                                                <p className="font-bold text-lg"><Skeleton height={25} width={`80%`} /></p>
                                                <p className="mt-2"><Skeleton/></p>
                                                <p><Skeleton/></p>
                                                <p><Skeleton/></p>
                                            </div>
                                            <div className="flex justify-center">
                                                <Link to={`/cafes/${cafes._id}`}>
                                                    <button className="bg-lightergray rounded-xl mb-4 py-2 px-28 border-2 border-lightergray transition-all ">
                                                        <Skeleton/>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                            )
                        })}
                    </div>
                    
                </div>

                
            </div>
            
        </div>
    )
}