import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { TypeContext} from "../contexts/typeContext";
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const UpcomingMoviesPage = (props) => {
  const context = useContext(MoviesContext);
  // console.log("mustWatchMovies: ", context.mustWatchMovies);

  const { data, error, isLoading, isError } = useQuery(
    "upcoming",
    getUpcomingMovies
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const movies = data ? data.results : [];

  return (
      <TypeContext.Provider value='movie'>
        <PageTemplate
          title='Upcoming Movies'
          items={movies}
          action={(movie) => {
            return <AddToMustWatchIcon movie={movie} />;
          }}
        />
      </TypeContext.Provider>
  );
};
export default UpcomingMoviesPage;