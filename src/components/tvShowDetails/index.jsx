import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";

import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
// import MovieReviews from '../movieReviews';

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: { 
    position: "fixed",
    top: 50,
    right: 2,
  },
};

const TvShowDetails = ( {tvShow}) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // New

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {tvShow.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {tvShow.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name}  />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip icon={<AccessTimeIcon />} label={`${tvShow.runtime} min.`} />
        <Chip
          icon={<StarRate />}
          label={`Total Votes: ${tvShow.vote_count.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${tvShow.vote_average} (${tvShow.vote_count}`}
        />
      </Paper>
      <Fab    
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      {/*<Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>*/}
      {/*  <MovieReviews movie={movie} />*/}
      {/*</Drawer>*/}
    </>
  );
};
export default TvShowDetails ;

