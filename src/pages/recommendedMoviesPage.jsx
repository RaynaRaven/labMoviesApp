import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import PageTemplate from '../components/templateMovieListPage';
import { getRecommendedMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const RecommendedMoviesPage = (props) => {
  const context = useContext(MoviesContext);
  console.log("recommendedMovies: ", context.mustWatchMovies);

  const { data, error, isLoading, isError } = useQuery(
    "upcoming",
    getRecommendedMovies
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const movies = data ? data.results : [];

  return (
    <PageTemplate
      title='Recommended Movies'
      movies={movies}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />;
      }}
    />
  );
};
export default RecommendedMoviesPage;