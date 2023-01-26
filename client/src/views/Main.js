import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieList from '../components/MovieList';
import {Link} from 'react-router-dom'

const Main = () => {
    const [movies, setMovies] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/movies')
            .then(res => {
                setMovies(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, []);

    const removeFromDom = movieId => {
        setMovies(movies.filter(movie => movie._id !== movieId));
    }
    
    return(
        <div>
            <h3>Movie List</h3>
            <Link to="/movies/create"> Add a New Movie </Link>
            
            <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Movie Title</th>
                            <th scope="col">Avg Rating</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
            </table>
            {loaded && <MovieList movies = {movies} removeFromDom={removeFromDom}/>}
        </div>
    )
}
export default Main;