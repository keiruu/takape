import React, { useState } from "react";
import CafeDataService from "../services/CafeDataService";
import { Link, useHistory} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext"
import Navbar from "./Navbar";
import Footer from "./Footer";

const AddReview = props => {
    const {currentUser} = useAuth()
    const history = useHistory()
    
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
                <div className="form-group">
                <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
                <input
                    type="text"
                    className="form-control"
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
            )}
        </div>

        ) : (
            history.push('/login')
        )}

        </div>
    );
};

export default AddReview;