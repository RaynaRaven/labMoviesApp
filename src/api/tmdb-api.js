import { subtractYears, formatDate, normalizeData } from "../util";

export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=1`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (args) => {
  console.log(args);
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTvShow = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${
            import.meta.env.VITE_TMDB_KEY
        }`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};


export const getGenres = async () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getRecommendedMovies = () => {
    const currentDate = new Date;
    const currentDate2 = new Date;
    const oneYearAgo = subtractYears(currentDate2, 1);

    // console.log("oneYearAgo", oneYearAgo);
    const formattedCurrentDate = formatDate(currentDate);
    // console.log("formattedCurrentDate", formattedCurrentDate);
    const formattedOneYearAgoDate = formatDate(oneYearAgo);
    // console.log("formattedOneYearAgoDate", formattedOneYearAgoDate);
    const minRating = 7;
    const minCount = 1500;

    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_TMDB_KEY
        }&language=en-US&primary_release_date.gte=${
            formattedOneYearAgoDate
        }&primary_release_date.lte=${
            formattedCurrentDate
        }&vote_average.gte=${
            minRating
        }&vote_count.gte=${
            minCount
        }&sort_by=popularity.desc`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getTrendingTvShows = () => {
    //Array of urls to fetch from
    const urls = [...Array(3)].map((_, i) =>
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${
            import.meta.env.VITE_TMDB_KEY
        }&language=en-US&page=${i + 1}`
    );

    return Promise.all(urls.map(url =>
        fetch(url)
            .then(response => {
                if (!response.ok)  {
                    return response.json().then(json => {
                        throw new Error(json.message || "Something went wrong");
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Data before normalization:', data);
                return normalizeData(data.results);
            })
            .then(normalizedData => {
                console.log('Normalized data: ', normalizedData);
                return normalizedData;
            })
        ))
        .then(pages => { // Flattens array of pages into one array
            console.log('Pages before flattening:', pages);
            const flattenedPages = [].concat(...pages);
            console.log('Flattened pages: ', flattenedPages);
            return flattenedPages;
        })
        .then(data => { // Filters out non-English shows
            console.log('Data before filtering: ', data);
            const filteredData = data.filter(tvShow => tvShow.original_language === 'en');
            console.log('Data after filtering: ', filteredData)
            return filteredData;
        })
        .catch((error) => {
            console.error('error fetching Tv shows:', error);
            throw error;
        });
};

export const getTvShowImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=${
            import.meta.env.VITE_TMDB_KEY
        }`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};