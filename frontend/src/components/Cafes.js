import React, { useState, useEffect, useContext } from "react";
import CafeDataService from "../services/CafeDataService";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useAuth } from '../contexts/AuthContext'

import '../styles/App.css'
import { CafeContext } from "../contexts/CafeContext";

export const Cafes = props => {
    const {currentUser, userUID} = useAuth()
    const cafecont = useContext(CafeContext)

    const initialCafeState = {
        id: null,
        name: "",
        address: "",
        province: "",
        city: "",
        link: "",
        img: "",
        logo: "",
        reviews: []
      };
      
    const [cafe, setCafe] = useState(initialCafeState);
    
    const getCafe = id => {
        CafeDataService.get(id)
          .then(response => {
            setCafe(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
        });
    };
    
    useEffect(() => {
        getCafe(props.match.params.id);
    }, [props.match.params.id]);
    
    const deleteReview = (reviewId, index) => {
        CafeDataService.deleteReview(reviewId, userUID)
          .then(response => {
            setCafe((prevState) => {
              prevState.reviews.splice(index, 1)
              return({
                ...prevState
              })
            })
          })
          .catch(e => {
            console.log(e);
          });
    };
    
      return (
        <div>
            <Navbar/>
          {cafe ? (
            <div className="flex flex-col m-auto mt-10 gap-y-20">
                <div className="flex flex-col md:flex-row bg-white shadow-gray md:w-full lg:w-med p-4 lg:rounded-xl m-auto gap-x-10 py-6">
                    <div className="overflow-hidden w-full md:w-1/2 h-64 md:h-80">
                        <img src={cafe.img} className="object-cover h-full w-full" alt="Cafe"/>
                    </div>
                    <div className="mt-6 w-full md:w-1/2 relative md:pr-10">
                        <h5 className="font-bold text-3xl">{cafe.name}</h5>
                        <p className="text-lg">{cafe.address}<br/></p>

                        <div className="mt-3 flex gap-x-2 ">
                              <Tippy content="Click to go to their Facebook Page" animation="scale" placement="bottom">
                                <div className="rounded-lg bg-lightaccent text-accent p-1 px-2">
                                  <a href={cafe.link} target="_blank" rel="noreferrer">
                                    <i className="fab fa-facebook-square"></i>
                                  </a>
                                </div>
                              </Tippy>
                              <span className="rounded-lg bg-lightaccent text-accent p-2 text-xs">{cafe.city}</span>
                              <span className="rounded-lg bg-lightaccent text-accent p-2 text-xs">{cafe.province}</span>
                              
                        </div>
                        
                        <div className="block md:relative mt-14">
                          <div className="block md:absolute md:-bottom-16 flex gap-x-2 justify-end">
                            <Link to="/cafes" className="block md:hidden">
                              <button className="bg-lightaccent p-3 px-3 md:px-6 text-sm md:text-md transition font-semibold text-accent rounded-lg hover:bg-transparent border-2 border-lightaccent"><i className="fas fa-arrow-left mr-2"></i>Go Back</button>
                            </Link>
                            <Link to={"/cafes/" + props.match.params.id + "/review"}>
                                <button className="bg-accent p-3 px-3 md:px-6 text-sm md:text-md transition font-semibold text-white rounded-lg hover:bg-transparent border-2 border-accent hover:text-accent"><i className="fas fa-pen-square mr-2"></i>Review Cafe</button>
                            </Link> 
                          </div> 
                        </div>

                        <div className="hidden md:absolute md:block right-4 -top-4 ">
                          <Link to="/cafes" className="underline">
                            <i class="fas fa-arrow-left"></i>
                          </Link>
                        </div>
                   </div>

                </div>

                <div className="text-center bg-white pt-10 rounded-3xl flex flex-col gap-y-4 pb-20 ">
                    <h4 className="font-bold text-2xl mb-8"> Reviews </h4>
                    
                        {cafe.reviews.length > 0 ? 
                            (cafe.reviews.map((review, index) => {
                            return (
                                <div className="relative text-left bg-white m-auto flex shadow-gray p-4 w-medsm rounded-xl" key={index}>
                                    <div>
                                        <span className="font-bold">{review.name}</span><br/>
                                        <h1>{review.text}</h1>
                                        <span className="text-xs opacity-40">Posted: {review.date}</span>
                                       

                                        {userUID === review.user_id &&
                                            <div className="flex gap-x-5 absolute right-5 top-4">
                                              <Link to={{
                                                pathname: "/cafes/" + props.match.params.id + "/review",
                                                state: {
                                                  currentReview: review
                                                }
                                              }}>
                                                <button className="text-green-500">
                                                  <i class="fas fa-edit"></i>
                                                </button>
                                              </Link>
                                              <button onClick={() => deleteReview(review._id, index)} className="text-accent"><i class="fas fa-trash"></i></button>
                                            </div>                   
                                        }
                                    </div>
                                </div>
                            );
                            }))
                            : 
                            (<div className="mt-4">
                                <p>No reviews yet.</p>
                            </div>)
                        }
                </div>
            </div>
            
          ) : (
            <div>
              <br />
              <p>No restaurant selected.</p>
            </div>
          )}
        </div>
      );
}


// <div className="" key={index}>
//                        <p className="bg-white text-accent p-4">
//                              {review.text}<br/>
//                              <strong>User: </strong>{review.name}<br/>
//                              <strong>Date: </strong>{review.date}
//                            </p>
//                            {props.user && props.user.id === review.user_id &&
//                               <div className="row">
//                                 <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
//                                 <Link to={{
//                                   pathname: "/cafes/" + props.match.params.id + "/review",
//                                   state: {
//                                     currentReview: review
//                                   }
//                                 }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
//                               </div>                   
//                            }
//                      </div>