import React from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";

const MovieList = ( { items, action }) => {
  let movieCards = items ? items.map((item) => (
    <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie key={item.id} item={item} action={action} />
    </Grid>
  )) : [] ;
  return movieCards;
};

export default MovieList;

