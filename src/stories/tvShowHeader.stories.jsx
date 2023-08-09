import React from "react";
import TvShowHeader from "../components/headerTvShow";
import { SampleTvShow } from "./sampleData";
import { MemoryRouter } from "react-router";

export default {
    title: "TV Show Details Page/TvShowHeader",
    component: TvShowHeader,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    ],
};

export const Basic = () => <TvShowHeader tvShow={SampleTvShow} />;

Basic.storyName = "Default";