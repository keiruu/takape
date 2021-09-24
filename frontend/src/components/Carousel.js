import React from 'react'
import { useHistory } from 'react-router-dom'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'

const provinces = [
    { name: 'Capiz', img: 'https://2.bp.blogspot.com/-zXXEUPu8pzc/WN4WCf3i9wI/AAAAAAAAozk/I6M_CoEaiWM0c5MxTYPPmPhkmrNUz_tBwCLcB/s1600/Capiz%2BBridge.jpg'},
    { name: 'Iloilo', img: 'https://i0.wp.com/www.goodnewspilipinas.com/wp-content/uploads/2019/11/Iloilo-City.jpg?fit=1200%2C801&ssl=1'},
    { name: 'Aklan', img: 'https://toprealty.com.ph/wp-content/uploads/2017/06/boracay-beach-front-lots-for-sale-malay-aklan-philippines.jpg'},
    { name: 'Antique', img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/b8/e7/10/view-from-the-top.jpg?w=500&h=300&s=1'},
]


export default function MyCarousel() { 

    const history = useHistory()

    return(
        <div className="flex flex-col justify-center items-center">
            <p className="text-lg text-brown my-6">Provinces within Panay Island</p>
            <div className="lg:w-2/3 w-full flex flex-col lg:flex-row gap-4">
                {/* <Carousel 
                plugins={[
                    'centered',
                    'infinite',
                    'arrows',
                    {
                        resolve: slidesToShowPlugin,
                        options: {
                        numberOfSlides: 2,
                    }
                    },
                ]}   
            > */}
                {provinces.map((item) => (
                    <div onClick={() => history.push('/cafes')} className="relative bg-black rounded-xl overflow-hidden cursor-pointer">
                        <p className="absolute top-24 left-0 right-0 font-bold text-white text-2xl">{item.name}</p>
                        <img
                            src={item.img}
                            alt=""
                            className="transition-all transform hover:scale-125 opacity-50 w-96 h-56 rounded-xl"
                        />
                    </div>
                ))}
            {/* </Carousel> */}
            </div>
        </div>
    )
    
}