import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 1.5,
    },
    avatar: {
        backgroundColor: "rgb(255, 0, 0)",
    },
    chip: {
        backgroundColor: "#000000",
        color: "#ffffff",
        margin: "0.5em",
    },
};

const TvShowHeader = (props) => {
    const tvShow = props.tvShow;
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const isFavourite = favourites.find((favourite) => favourite.id === tvShow.id) !== undefined;

    return (
        <Paper component="div" sx={styles.root}>
            <IconButton aria-label="go back">
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>
            { isFavourite && (
                <Avatar sx={styles.avatar}>
                    <FavoriteIcon />
                </Avatar>
            )}
            <Typography variant="h4" component="h3">
                {tvShow.name}
                {"   "}
                <a href={tvShow.homepage}>
                    <HomeIcon color="primary" fontSize="='large" />
                </a>
                <br />
                <span>{`${tvShow.tagline}`} </span>
            </Typography>
            <div>
                <Chip label={`First aired: ${tvShow.first_air_date}`} sx={styles.chip} />
                <Chip label={`Seasons: ${tvShow.number_of_seasons}`} sx={styles.chip} />
                <Chip label={`Status: ${tvShow.status}`} sx={styles.chip} />
            </div>
            <IconButton aria-label="go forward">
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default TvShowHeader;
