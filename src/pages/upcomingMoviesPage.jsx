import React, { useState, useEffect } from "react";
import AddToFavouritesIcon from "../components/cardIcons/addtoFavourites";
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";


const UpcomingMoviesPage = (props) => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />;
      }}
    />
  );
};
export default UpcomingMoviesPage;