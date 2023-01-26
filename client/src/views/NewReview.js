import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";
    
const NewReview = (props) => {
    const { _id } = useParams();
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [nameError, setNameError] = useState('');
    const [ratingError, setRatingError] = useState('');
    const [reviewError, setReviewError] = useState('');
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null)
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/movie/' + _id)
            .then(res => {
                setMovie(res.data);
            })
    }, []);

    const handleName = (e) => {
        setName(e.target.value);
        if (name.length < 1) {
            setNameError("Name is required");
        } else{
            setNameError("");
        }
    }

    const handleRating = (e) => {
        setRating(e.target.value);
    }

    const handleReview = (e) => {
        setReview(e.target.value);
        if (review.length < 10) {
            setReviewError("Review is required and must be > 10 characters");
        } else{
            setReviewError("");
        }
    }
    
    const createReview = e => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/addreview/' + _id, {
            name, rating, review
        })
            .then(res => navigate('/view/movie/' + _id))
            .catch(err => console.error(err));
    }

    if(!movie) {
        return(
            <h1> "Coming soon...."</h1>)
    }
    
    return (
        <div className='container mt-5'>
            <h1>Add a New Review for {movie.title}</h1>
            <form onSubmit={ nameError || ratingError || reviewError ?  (e) => e.preventDefault() : createReview} className="form">
            {reviewError ? <p style={{color:'red'}}>{ reviewError }</p> : ""}
            {nameError ? <p style={{color:'red'}}>{ nameError }</p> : ""}
                <p>
                    <label>Name:</label><br />
                    <input type="text" 
                    name="name" 
                    value={name} 
                    onChange={handleName} />
                </p>
                
                <p>
                    <label>Rating</label><br />
                    <input type="number" min={0}
                    name="rating"
                    value={rating} 
                    onChange={handleRating } />
                </p>
                {ratingError ? <p style={{color:'red'}}>{ ratingError }</p> : ""}
                <p>
                    <label>Review</label><br />
                    <input type="text" 
                    name="review" 
                    value={review} 
                    onChange={handleReview} />
                </p>
                
                <input type="submit"  className = {(name.length > 1) && (review.length > 10) ? "btn btn-primary" : "btn btn-primary disabled"} />
            </form>
        <Link to="/movies" > Cancel</Link>
        </div>
    )
}
    
export default NewReview;