import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
// import useMovie from "../hooks/useMovie";
import { getTVShow } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const TVShowDetailsPage = () => {
  const { id } = useParams();

  const { data: tvShow, error, isLoading, isError } = useQuery(
    ["tvShow", { id: id }],
    getTVShow
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {tvShow? (
        <>
          <PageTemplate movie={tvShow}>
            <MovieDetails movie={tvShow} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for TV Show details</p>
      )}
    </>
  );
};

export default TVShowDetailsPage;
