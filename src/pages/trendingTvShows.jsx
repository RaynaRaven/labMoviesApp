import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import PageTemplate from '../components/templateMovieListPage';
import { getTrendingTvShows } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
// import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
//TODO: import helper function

const TrendingTvShowsPage = (props) => {
  const context = useContext(MoviesContext);

  const { data, error, isLoading, isError } = useQuery(
    "trendingTV",
    getTrendingTvShows
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const tvShows = data ? data.results : [];
  //TODO: enable this to test helper func
  //const normalizedTVShows = normalizeData(tvShows);

  return (
    <PageTemplate
      title='Trending TV Series'
      movies={tvShows}
      action={(tvShow) => {
        return <AddToMustWatchIcon tvShow={tvShow} />;
      }}
    />
  );
};
export default TrendingTvShowsPage;