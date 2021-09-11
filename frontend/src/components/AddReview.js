import React, { useState, useContext } from "react";
import CafeDataService from "../services/CafeDataService";
import { Link, useHistory} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext"
import Navbar from "./Navbar";
import { CafeContext } from "../contexts/CafeContext";
import Footer from "./Footer";

const AddReview = props => {
    const {currentUser} = useAuth()
    const history = useHistory()
    const cafe = useContext(CafeContext)
    
    let initialReviewState = ""
    let editing = false;

    if (props.location.state && props.location.state.currentReview) {
        editing = true;
        initialReviewState = props.location.state.currentReview.text
    }

    const [review, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        setReview(event.target.value);
    };

    const saveReview = () => {
        var data = {
        text: review,
        name: props.user.name,
        user_id: props.user.id,
        cafe_id: props.match.params.id
      };

      if (editing) {
        data.review_id = props.location.state.currentReview._id
        CafeDataService.updateReview(data)
          .then(response => {
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
          CafeDataService.createReview(data)
          .then(response => {
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

    };

    return (
        <div>
        <Navbar/>
        {currentUser ? (
        <div className="submit-form">
            {submitted ? (
            <div>
                <h4>You submitted successfully!</h4>
                <Link to={"/cafes/" + props.match.params.id} className="btn btn-success">
                Back to Restaurant
                </Link>
            </div>
            ) : (
            <div>
              <div className="flex flex-col m-auto mt-10 gap-y-20">
                <div className="flex flex-col justify-context items-center bg-white shadow-gray md:w-full lg:w-med p-4 lg:rounded-xl m-auto gap-x-10 py-6">
                
                
                </div>
                <div className="form-group">
                <label htmlFor="description" className="text-center font-bold text-3xl">{ editing ? "Edit" : "Create" } Review</label>
                <input
                    type="text"
                    className="border-2 border-black rounded-xl p-2 w-1/2"
                    id="text"
                    required
                    value={review}
                    onChange={handleInputChange}
                    name="text"
                />
                </div>
                <button onClick={saveReview} className="btn btn-success">
                Submit
                </button>

                </div>
            </div>
            )}
        </div>

        ) : (
            history.push('/login')
        )}

        </div>
    );
};

export default AddReview;