import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { TypeContext} from "../contexts/typeContext";
import PageTemplate from '../components/templateMovieListPage';
import { getTrendingTvShows } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
// import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const TrendingTvShowsPage = (props) => {

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
  
  const tvShows = data || [];

  return (
      <TypeContext.Provider value='tv'>
        <PageTemplate
          title='Trending TV Series'
          items={tvShows}
          action={(tvShow) => {
            return <AddToMustWatchIcon tvShow={tvShow} />;
          }}
        />
      </TypeContext.Provider>
  );
};
export default TrendingTvShowsPage;