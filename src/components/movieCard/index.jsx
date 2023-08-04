import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";
import {TypeContext} from "../../contexts/typeContext";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function MovieCard({ item, action }) {
  const { favourites, addToFavourites } = useContext(MoviesContext);
    const type = useContext(TypeContext);
    const linkPath = type === 'movie' ? `/movies/${item.id}` : `/TV/${item.id}`;

  item.favourite = !!favourites.find((id) => id === item.id);

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        avatar={
          item.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h6" component="p">
            {item.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          item.poster_path
            ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {item.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {item.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(item)}
        <Link to={linkPath}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
