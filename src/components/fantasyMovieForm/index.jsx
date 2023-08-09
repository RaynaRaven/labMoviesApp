import React, { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';

function FantasyMovieForm() {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [productionCompany, setProductionCompany] = useState('');
    const [actors, setActors] = useState([]);
    const [currentActor, setCurrentActor] = useState('');
    const [genre, setGenre] = useState('');

    const handleAddActor = () => {
        if (currentActor) {
            setActors([...actors, currentActor]);
            setCurrentActor('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const movieData = {
            title,
            year,
            director,
            productionCompany,
            actors,
            genre,
        };
        console.log(movieData);
    };

    return (
        <Paper style={{ padding: '16px' }}>
            <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Year" value={year} onChange={(e) => setYear(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Director" value={director} onChange={(e) => setDirector(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Production Company" value={productionCompany} onChange={(e) => setProductionCompany(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Add Actor" value={currentActor} onChange={(e) => setCurrentActor(e.target.value)} />
                        <Button onClick={handleAddActor} variant="contained">Add Actor</Button>
                        <ul>
                            {actors.map((actor, index) => <li key={index}>{actor}</li>)}
                        </ul>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="genre-label">Genre</InputLabel>
                            <Select
                                labelId="genre-label"
                                value={genre}
                                onChange={event => setGenre(event.target.value)}
                            >
                                {/* Replace this with all genres */}
                                <MenuItem value="Action">Action</MenuItem>
                                <MenuItem value="Comedy">Comedy</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default FantasyMovieForm;