import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [myReviews, setMyReviews] = useState( {} );  // NEW
  const [mustWatchMovies, setMustWatchMovies] = useState([]);

  const addToFavourites = (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };

  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {   // NEW
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const addToMustWatchMovies = (movie) => {
    let updatedMustWatchMovies = [...mustWatchMovies];
    if (!mustWatchMovies.includes(movie.id)) {
      updatedMustWatchMovies.push(movie.id);
    }
    setMustWatchMovies(updatedMustWatchMovies);
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        mustWatchMovies,
        addToFavourites,
        removeFromFavourites,
        addReview,
        addToMustWatchMovies,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
