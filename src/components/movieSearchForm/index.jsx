import React, { useState, useEffect, useCallback } from "react";
import { Button, Select, MenuItem, FormControl, InputLabel, TextField, Autocomplete } from '@mui/material';
import { fetchGenres, fetchActors } from "../../api/tmdb-api";
import { generateYears } from "../../util";
import { debounce } from "lodash";

const MovieSearchForm = ({ setCriteria }) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [actors, setActors] = useState([]);
    const [selectedActor, setSelectedActor] = useState("");
    const [actorSearchTerm, setActorSearchTerm] = useState("");
    const [actorOptions, setActorOptions] = useState([]);
    const [runtime, setRuntime] = useState({ min: "", max: "" });
    const [releaseYear, setReleaseYear] = useState("");

    // Debounce fetchActors function to avoid too many API calls
    const debouncedFetchActors = useCallback(
        debounce((searchTerm) =>{
            if (searchTerm) {
                fetchActors(searchTerm)
                    .then((response) => {
                        const actorNames = response.results.map(actor => actor.name);
                        setActorOptions(actorNames);
                    });
            }
        }, 450),// 450ms delay
    []
    );

    useEffect(() => {
        fetchGenres().then((genres) => {
            console.log(genres);
            setGenres(genres.map(genre => genre.name));
        });
    }, []);

    useEffect(() => {
        debouncedFetchActors(actorSearchTerm);
    }, [actorSearchTerm, debouncedFetchActors]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCriteria({
            with_genres: selectedGenre,
            with_cast: selectedActor,
            with_runtime_gte: runtime.min,
            with_runtime_lte: runtime.max,
            primary_release_year: releaseYear,
        });
    };

    const years = generateYears(1930);

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select labelId="genre-label" value={selectedGenre} onChange={event => setSelectedGenre(event.target.value)}>
                    {genres.map((genre, index) => (
                        <MenuItem key={index} value={genre}>{genre}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="actor-label">Actor</InputLabel>
                {/*<Select labelId="actor-label" value={selectedActor} onChange={event => setSelectedActor(event.target.value)}>*/}
                {/*    {actors.map((actor, index) => (*/}
                {/*        <MenuItem key={index} value={actor}>{actor}</MenuItem>*/}
                {/*    ))}*/}
                {/*</Select>*/}
                <Autocomplete
                    freeSolo
                    id="actor-autocomplete"
                    value={selectedActor}
                    onInputChange={(event, newInputValue) => {
                        setActorSearchTerm(newInputValue);
                    }}
                    options={actorOptions}
                    renderInput={(params) => <TextField {...params} label="Actor" />}
                />
            </FormControl>
            <TextField
                label="Runtime Minimum"
                value={runtime.min}
                onChange={event => setRuntime({...runtime, min: event.target.value})}
            />
            <TextField
                label="Runtime Maximum"
                value={runtime.max}
                onChange={event => setRuntime({...runtime, max: event.target.value})}
            />
            <FormControl>
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
            <Button type="submit" variant="contained" color="primary">
                Search
            </Button>
        </form>
    );
}

export default MovieSearchForm;