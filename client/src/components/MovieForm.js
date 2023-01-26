import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const MovieForm = (props) => {
    const [title, setTitle] = useState(""); 
    const [name, setName] = useState(""); 
    const [rating, setRating] = useState(0); 
    const [review, setReview] = useState(""); 
    const [allReviews, setAllReviews] = useState([]); 
    const [errors, setErrors] = useState([])
    // const [movie, setMovie] = useState({})
    const navigate = useNavigate();
    


    const onSubmitHandler = e => {
        e.preventDefault();
        // setMovie({title:title, name:name, rating:rating, review:review, allReviews:[...allReviews, {name, rating, review}]})
        // const addToAllReviews = {name, rating, review};
        // console.log("add to all reviews: ", addToAllReviews);
        // setAllReviews([...allReviews, {name, rating, review}])
        // console.log(allReviews);
        axios.post('http://localhost:8000/api/movies/', {
            title, name, rating, review, allReviews:[...allReviews, {name, rating, review}]
        })
            .then(res=>{
                
                navigate('/')
                // console.log(movie)

            })
            .catch(err=>{
                const errorResponse = err.response.data.err.errors; // Get the errors from err.response.data
                const errorArr = []; //; Define a temp error array to push the messages in
                // console.log(errorResponse)
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // console.log(errorArr)
                setErrors(errorArr);
                // console.log(errors);
                
                
            }) 
    }
    return (
        <div className='container mt-5'>
            <h1>Submit a Movie and a Review</h1>
            <form onSubmit={onSubmitHandler} className="form ">
                <div>
                {errors.map((err, index) => <p key={index} className="text-danger">{err}</p>)}
                </div>

                <p>
                    <label>Title: </label><br/>
                    <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                </p>

                <p>
                    <label>Your Name: </label><br/>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </p>

                <p>
                    <label>Rating: </label><br/>
                    <input type="number" onChange={(e)=>setRating(e.target.value)} value={rating}/>
                </p>

                <p>
                    <label>Your Review: </label><br/>
                    <input type="textarea" onChange={(e)=>setReview(e.target.value)} value={review}/>
                </p>

                <input type="submit" value="Submit"/>
            </form>

        </div>
        
    )
}

export default MovieForm;
