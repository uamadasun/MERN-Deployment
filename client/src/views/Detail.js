import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";
    
const Detail = (props) => {
    const [movie, setMovie] = useState({})
    const { _id } = useParams();
    const allReviews = movie.allReviews;
    const navigate = useNavigate();


    
    useEffect(() => {
        axios.get('http://localhost:8000/api/movie/' +_id)
            .then(res => setMovie(res.data))
            .catch(err => console.error(err));
    }, [_id]);

    // console.log("movie here: " ,movie);
    if(!movie.allReviews){
        return <h1>No reviews yet</h1>
    }
    
    const deleteMovie = (productId) => {
        axios.delete('http://localhost:8000/api/movie/'+ productId)
        .then(res => {
            navigate('/movies')
        })
        .catch(err => console.log(err));
    }
    
    return (
        <div> 
            <h1>Reviews for {movie.title} </h1>
            <table className='table table-hover'>
                <thead className="d-flex justify-content-around">
                    <th>
                        Reviewer
                    </th>
                    <th>
                        Rating
                    </th>
                    <th>
                        Review
                    </th>
                </thead>

                <tbody >
                    <tr >
                        {allReviews.map((review, i)=> 
                            <div key={i}>
                                <td> <p> {review.name}</p></td>
                                <td> <p> {review.rating}</p></td>
                                <td> <p> {review.review}</p></td>
                            </div>
                        
                    )}
                    </tr>
                </tbody>

            </table>

            <button className = "btn btn-danger" onClick={(e)=>{deleteMovie(movie._id)}}>
                        Delete
                </button> 

        
        </div>
    )
}
    
export default Detail;