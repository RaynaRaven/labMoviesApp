import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../movieList";

const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

function MovieListPageTemplate({ items = [], title, action }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const genreId = Number(genreFilter);

  let displayedItems = items
    .filter((item) => {
      return item.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((item) => {
      return genreId > 0 ? item.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "title") setTitleFilter(value);
    else setGenreFilter(value);
  };

  return (
    <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList action={action} items={displayedItems} />
        </Grid>
      </Grid>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={handleChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
        />
      </Drawer>
    </>
  );
}
export default MovieListPageTemplate;
