import React, { useState, useEffect } from "react";
import MovieSearchForm from '../components/MovieSearchForm';
import MovieList from '../components/MovieList';

const SearchMoviePage = () => {
    const [movies, setMovies] = useState([]);
    const [criteria, setCriteria] = useState({});

    useEffect(() => {
        if (Object.keys(criteria).length !== 0) {
            let queryString = `?api_key=${import.meta.env.VITE_TMDB_KEY}&`;
            for (let key in criteria) {
                if (criteria[key]) {
                    queryString += `${key}=${criteria[key]}&`;
                }
            }

            // Fetch data from TMDB with the constructed query
            fetch(`https://api.themoviedb.org/3/discover/movie${queryString}`)
                .then(response => response.json())
                .then(data => setMovies(data.results));
        }
    }, [criteria]);

    const action = (movie) => {
        console.log('Movie card clicked');
        // Perform action here (e.g., redirect to movie details page)
    }

    return (
        <div>
            {/* Movie search form */}
            <MovieSearchForm setCriteria={setCriteria}/>

            {/* Display movies */}
            <MovieList items={movies} action={action}/>
        </div>
    );
}

export default SearchMoviePage;