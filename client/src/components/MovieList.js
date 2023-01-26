import React from 'react'
import { Link } from 'react-router-dom';
// import DeleteButton from './DeleteButton';
import axios from 'axios';
    
const MovieList = (props) => {
    // const {removeFromDom} = props;
    const {movies, removeFromDom} = props;

    const deleteMovie = (movieId) => {
        axios.delete('http://localhost:8000/api/movie/'+ movieId)
        .then(res => {
            removeFromDom(movieId)
        })
        .catch(err => console.log(err));
    }

    const findAverage = (allThisReview) => {
        if (!allThisReview) {
            return 0
        }
        let sum = 0;
        for(let i=0; i<allThisReview.length; i++){
            sum += parseInt(allThisReview[i].rating)
            console.log("sum", sum)
        }
        return sum/allThisReview.length
    }


    return (
        
        <div>
            {movies.map( (movie, i) =>
            <div key={i} className='mt-5 d-flex justify-content-around'>

                <table className="table table-hover">
                    <tbody>
                        <tr className = "d-flex justify-content-around">
                            <td>{movie.title}</td>
                            
                                <td>{findAverage(movie.allReviews)}</td>
                            
                            <td>
                                <Link to={`/view/movie/${movie._id}`}> 
                                    <button className="btn btn-outline-warning"> 
                                        Read Reviews 
                                    </button> 
                                </Link>
                                
                                    {/* <button className="btn btn-outline-danger" onClick={ (e) => {deleteAuthor(author._id)}}> 
                                        Delete 
                                    </button>  */}
                                    <Link to={`/movie/new/review/${movie._id}`}> 
                                    <button className="btn btn-outline-warning"> 
                                        Write a Review
                                    </button> 
                                </Link>
                            </td>
                        
                        </tr>
                    </tbody>
                </table>
            </div>
            )}
        </div>
    )
}
    
export default MovieList;