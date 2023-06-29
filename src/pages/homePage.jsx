import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const HomePage = (props) => {
  const { data, error, isLoading, isError } = useQuery("discover", getMovies);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  // Redundant, but necessary to avoid app crashing.
  const favourites = movies.filter((m) => m.favorite);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  const addToFavourites = (movieId) => true;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      selectFavourite={addToFavourites}
    />
  );
};
export default HomePage;
