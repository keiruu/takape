import React, { useState, useEffect, useContext, useRef} from "react";
import CafeDataService from "../services/CafeDataService";
import { Link, useHistory} from "react-router-dom";
import Navbar from '../components/Navbar'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useAuth } from '../contexts/AuthContext'

import '../styles/App.css'
import { CafeContext } from "../contexts/CafeContext";

export const Cafes = props => {
    const {currentUser, userUID} = useAuth()
    const [show, setShow] = useState(false)
    const [edit, setEdit] = useState(false)
    const cafecont = useContext(CafeContext)
    const scrollRef = useRef()
    const [reviewID, setReviewID] = useState()
    const yourReviewRef = useRef()
    const history = useHistory()

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
    const [trigger, setTrigger] = useState(false)
    
    const getCafe = id => {
        CafeDataService.get(id)
          .then(response => {
            setCafe(response.data);
          })
          .catch(e => {
            console.log(e);
        });
    };
    
    useEffect(() => {
        getCafe(props.match.params.id);
    }, [props.match.params.id, trigger]);
    
    const [editing, setEditing] = useState(false)

    useEffect(() => {
      cafe.reviews.map((rev, index) => {
        if(cafe.reviews.length > 0){
          if(userUID === rev.user_id){
            setEditing(true)
            setReviewID(rev._id)
          }
        }
      })
    }, [cafe]);
    
    const deleteReview = (reviewId, index) => {
        CafeDataService.deleteReview(reviewId, userUID)
          .then(response => {
            setTrigger("delete review")
            setShow(false)
            setEditing(false)
            setEdit(false)
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


    const scrollHandler = () => {
      if(editing){
        yourReviewRef.current.scrollIntoView()
        setEdit(true)
      }else{
        setShow(true)
        scrollRef.current.scrollIntoView()
      }
    }

    // FOR ADDING REVIEWS
    let initialReviewState = ""

    // if (props.location.state && props.location.state.currentReview) {
    //   setEditing(true);
    //   initialReviewState = props.location.state.currentReview.text
    // }

    const [review, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState();

    const handleInputChange = event => {
        setReview(event.target.value);
    };

    const saveReview = () => {
      var data = {
          text: review,
          name: currentUser.displayName,
          user_id: currentUser.uid,
          cafe_id: props.match.params.id
      };
      
      if (editing) {
          data.review_id = reviewID
          CafeDataService.updateReview(data)
          .then(response => {
            setTrigger("update review")
            setSubmitted(true);
            setEdit(false)
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
          CafeDataService.createReview(data)
          .then(response => {
            setTrigger("create review")
            setShow(false)
            setSubmitted(true);
            setEdit(false)
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    };

    const closeHandler = (id, index) => {
      if(edit){
          // Cancel Edit
          setEdit(false)
      } else {
          // Delete
          deleteReview(id, index)
      }
    }
    

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
                              <span className="rounded-lg bg-lightaccent text-accent p-2 text-xs">{cafe.city}</span>
                              <span className="rounded-lg bg-lightaccent text-accent p-2 text-xs">{cafe.province}</span>
                              <Tippy content="Click to go to their Facebook Page" animation="scale" placement="bottom">
                                <div className="rounded-lg bg-lightaccent text-accent p-1 px-2">
                                  <a href={cafe.link} target="_blank" rel="noreferrer">
                                    <i className="fab fa-facebook-square"></i>
                                  </a>
                                </div>
                              </Tippy>
                        </div>
                        
                        <div className="block md:relative mt-14">
                          <div className="block md:absolute md:-bottom-16 flex gap-x-2 justify-end">
                            <Link to="/cafes" className="block md:hidden">
                              <button className="bg-lightaccent p-3 px-3 md:px-6 text-sm md:text-md transition font-semibold text-accent rounded-lg hover:bg-transparent border-2 border-lightaccent"><i className="fas fa-arrow-left mr-2"></i>Go Back</button>
                            </Link>
                            <Tippy content="Sign in to use this feature!" animation="scale" placement="bottom" disabled={currentUser ? true : false}>
                                <button onClick={currentUser ? () => scrollHandler() : () => history.push("/")} className="bg-accent p-3 px-3 md:px-6 text-sm md:text-md transition font-semibold text-white rounded-lg hover:bg-transparent border-2 border-accent hover:text-accent"><i className="fas fa-pen-square mr-2"></i>Review Cafe</button>
                            </Tippy>
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
                    <h4 className="font-bold text-2xl mb-8" ref={scrollRef}> Reviews </h4>
                    {show && 
                      <div className="relative text-left bg-white m-auto flex shadow-gray p-4 w-medsm rounded-xl" >
                        <div className="w-full pt-2">
                            <div className="flex justify-end w-full gap-x-2">
                              <span className="font-bold flex-1">{currentUser.displayName}</span><br/>
                              <div className="absolute flex gap-x-2 top-1">
                              <button onClick={() => setShow(false)}className="px-5 p-1 bg-white text-accent border-2 border-accent rounded-lg my-2 text-xs">Cancel</button>
                              <button onClick={saveReview} className="px-5 p-1 bg-accent text-white rounded-lg my-2 text-xs">Submit</button>
                              </div>
                            </div>
                            <input
                                type="text"
                                className="border-2 border-lightergray rounded-lg p-1 w-full"
                                id="text"
                                required
                                name="text"
                                value={review.text}
                                onChange={handleInputChange}
                            />
                            {/* <span className="text-xs opacity-40">Posted: {review.date}</span> */}
                        </div>
                      </div>
                    }
                        {cafe.reviews.length > 0 ? 
                            (cafe.reviews.map((reviews, index) => {
                              return (
                                <div className="relative text-left bg-white m-auto flex shadow-gray p-4 w-medsm rounded-xl" key={index}>
                                    <div className="w-full">
                                        <span className="font-bold">{reviews.name}</span><br/>
                                        {edit && userUID === reviews.user_id ? (
                                          <div>
                                            <input
                                                type="text"
                                                className="border-2 border-lightergray rounded-lg p-1 w-full"
                                                id="text"
                                                required
                                                name="text"
                                                value={review}
                                                onChange={(event) => setReview(event.target.value)}
                                            />
                                          </div>
                                        ) : <h1>{reviews.text}</h1>}
                                        <span className="text-xs opacity-40">Posted: {reviews.date}</span>

                                        {userUID === reviews.user_id &&
                                            <div ref={yourReviewRef} className="flex gap-x-5 absolute right-5 top-4">
                                              {/* <Link to={{
                                                pathname: "/cafes/" + props.match.params.id + "/review",
                                                state: {
                                                  currentReview: review
                                                }
                                              }}> 
                                              </Link>*/}
                                                <button onClick={edit ? () => saveReview() : ()=> setEdit(true)} className="text-green-500">
                                                  <i className={edit ? "fas fa-check-square" : "fas fa-edit"}></i>
                                                </button>
                                              <button onClick={() => closeHandler(reviews._id, index)} className="text-accent"><i className={edit ? "fas fa-window-close" : "fas fa-trash"}></i></button>
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