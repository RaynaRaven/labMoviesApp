import React, { useState, useEffect, useCallback } from "react";
import { Button, Select, MenuItem, FormControl, InputLabel, TextField, Autocomplete, Grid, Paper } from '@mui/material';
import { fetchGenres, fetchActors } from "../../api/tmdb-api";
import { generateYears } from "../../util";
import { debounce } from "lodash";

const MovieSearchForm = ({ setCriteria }) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedActor, setSelectedActor] = useState("");
    const [actorSearchTerm, setActorSearchTerm] = useState("");
    const [actorOptions, setActorOptions] = useState([]);
    const [runtime, setRuntime] = useState({ min: "", max: "" });
    const [releaseYear, setReleaseYear] = useState("");

    // Debounce fetchActors function to avoid too many API calls
    const debouncedFetchActors = useCallback(
        debounce((searchTerm) =>{
            console.log("Fetching actors for term: ", searchTerm);
            if (searchTerm) {
                fetchActors(searchTerm)
                    .then((response) => {
                        console.log("API response for term:", searchTerm, response);
                        const actors = response.results.filter(actor => actor.known_for_department === "Acting");
                        console.log("Actor Options being set ", actors);
                        setActorOptions(actors);
                        console.log("Updated actorOptions:", actorOptions);
                    });
            }
        }, 450),// 450ms delay
    []
    );

    useEffect(() => {
        fetchGenres().then((data) => {
            setGenres(data.genres);
        });
    }, []);

    useEffect(() => {
        debouncedFetchActors(actorSearchTerm);
    }, [actorSearchTerm, debouncedFetchActors]);

    useEffect(() => {
        console.log("Current selectedActor state:", selectedActor);
    }, [selectedActor]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Selected Genre:", selectedGenre); // log
        console.log("Selected Actor:", selectedActor); // log
        console.log("Runtime:", runtime); // log
        console.log("Release Year:", releaseYear); // log

        const criteriaData = {
            with_genres: selectedGenre,
            with_cast: selectedActor,
            with_runtime_gte: runtime.min,
            with_runtime_lte: runtime.max,
            primary_release_year: releaseYear,
        };
        console.log("Submitting with criteria:", criteriaData);
        setCriteria(criteriaData);
    };

    const years = generateYears(1930);
    console.log("Props for Autocomplete - actorOptions:", actorOptions, "selectedActor:", selectedActor);
    return (
        <Paper style={{ padding: '16px' }}>
        <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="genre-label">Genre</InputLabel>
                            <Select labelId="genre-label" value={selectedGenre} onChange={event => setSelectedGenre(event.target.value)}>
                                {genres.map((genre, index) => (
                                    <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="actor-label">Actor</InputLabel>
                            {/*<Autocomplete*/}
                            {/*    freeSolo*/}
                            {/*    id="actor-autocomplete"*/}
                            {/*    value={selectedActor}*/}
                            {/*    onInputChange={(event, newInputValue) => {*/}
                            {/*        const actor = actorOptions.find(a => a.name === newInputValue);*/}
                            {/*        console.log("Selected from dropdown: ", actor);*/}
                            {/*        if (actor) {*/}
                            {/*            setSelectedActor(actor.id);*/}
                            {/*            console.log("Setting selected actor ID:", actor.id);*/}
                            {/*        } else {*/}
                            {/*            setSelectedActor("");*/}
                            {/*        }*/}
                            {/*    }}*/}
                            {/*    onInput={(event) => {*/}
                            {/*        setActorSearchTerm(event.target.value);*/}
                            {/*    }}*/}
                            {/*    options={actorOptions.map(option => option.name)}*/}
                            {/*    renderInput={(params) => <TextField {...params} label="Actor" />}*/}
                            {/*/>*/}
                            <Autocomplete
                                freeSolo
                                id="actor-autocomplete"
                                value={selectedActor}
                                getOptionLabel={(option) => {
                                    if (typeof option === 'object') {
                                        return option.name || '';
                                    }
                                    const actor = actorOptions.find(a => a.id === option);
                                    return actor ? actor.name : '';
                                }}
                                onInputChange={(event, newInputValue) => {
                                    if (!newInputValue) return; // exit early if newInputValue is undefined or empty
                                    const actor = actorOptions.find(a => a.name === newInputValue);
                                    console.log("Selected from dropdown: ", actor);
                                    if (actor) {
                                        setSelectedActor(actor.id);
                                        console.log("Setting selected actor ID:", actor.id);
                                    } else {
                                        setSelectedActor("");
                                    }
                                }}
                                onInput={(event) => {
                                    setActorSearchTerm(event.target.value);
                                }}
                                options={actorOptions.map(option => option.name)}
                                renderInput={(params) => <TextField {...params} label="Actor" />}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField fullWidth
                            label="Runtime Minimum"
                            value={runtime.min}
                            onChange={event => setRuntime({...runtime, min: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField fullWidth
                            label="Runtime Maximum"
                            value={runtime.max}
                            onChange={event => setRuntime({...runtime, max: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="year-label">Release Year</InputLabel>
                            <Select
                                labelId="year-label"
                                value={releaseYear}
                                onChange={event => setReleaseYear(event.target.value)}
                            >
                                {years.map((year, index) => (
                                    <MenuItem key={index} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Button type="submit" variant="contained" color="primary">
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default MovieSearchForm;