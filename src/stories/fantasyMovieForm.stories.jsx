import React from "react";
import FantasyMovieForm from "../components/fantasyMovieForm";
import { MemoryRouter } from "react-router";

export default {
    title: "myFantasyMoviePage/fantasyMovieForm",
    component: FantasyMovieForm,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    ],
};

export const Basic = () => {
    return <FantasyMovieForm />;
};
Basic.storyName = "Default";