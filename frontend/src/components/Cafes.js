import React, { useState, useEffect } from "react";
import CafeDataService from "../services/CafeDataService";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import '../styles/App.css'

export const Cafes = props => {
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
        CafeDataService.deleteReview(reviewId, props.user.id)
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
                <div className="flex flex-col lg:flex-row bg-white shadow-gray md:w-medsm lg:w-med p-4 rounded-xl m-auto gap-x-10 py-6">
                    <div className="overflow-hidden w-full lg:w-1/2 h-80">
                        <img src={cafe.img} className="object-cover h-full w-full" alt="Cafe"/>
                    </div>
                    <div className="mt-6 w-1/2 relative pr-10">
                        <h5 className="font-bold text-3xl">{cafe.name}</h5>
                        <p className="text-lg">{cafe.address}<br/></p>

                        <div className="mt-3 flex gap-x-2 ">
                              {/* <span className="text-xs mr-2">Tags:</span>   */}
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
                        
                        <div className="flex flex-col mt-14">
                          <p className="">
                              
                          </p>
                          <Link to={"/cafes/" + props.match.params.id + "/review"}>
                              <button className="bg-accent p-3 transition px-6 font-semibold text-white rounded-lg hover:bg-transparent border-2 border-accent hover:text-accent"><i className="fas fa-pen-square mr-2"></i>Review Cafe</button>
                          </Link>  
                        </div>

                        <div className="absolute right-4 -top-4">
                          <Link to="/cafes" className="underline">
                            <i class="fas fa-arrow-left"></i>
                          </Link>
                        </div>
                   </div>

                </div>

                <div className="text-center bg-white pt-10 rounded-3xl">
                    <h4 className="font-bold text-2xl"> Reviews </h4>
                        {cafe.reviews.length > 0 ? 
                            (cafe.reviews.map((review, index) => {
                            return (
                                <div className="bg-white m-auto flex justify-center" key={index}>
                                    <div>
                                        <h1>{review.text}</h1>
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