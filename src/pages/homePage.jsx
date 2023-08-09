import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { TypeContext } from "../contexts/typeContext";

const HomePage = () => {
  const { data, error, isLoading, isError } = useQuery("discover", getMovies);

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
          title="Discover Movies"
          items={movies}
          action={(movie) => {
            return <AddToFavouritesIcon movie={movie} />
          }}
        />
      </TypeContext.Provider>
  );
};
export default HomePage;
