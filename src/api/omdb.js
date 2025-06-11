    import axios from 'axios';
    const API_KEY = '161d5c3d';
    const BASE_URL = 'http://www.omdbapi.com/';

    console.log(API_KEY)
    export const searchMovies = async (searchTerm, page = 1) => {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    apikey: API_KEY,
                    s: searchTerm,
                    page: page,
                },
            });

            if (response.data.Response === 'True') {
                return {
                    movies: response.data.Search,
                    totalResults: parseInt(response.data.totalResults),
                };
            } else {
                return { movies: [], totalResults: 0, error: response.data.Error };
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            return { movies: [], totalResults: 0, error: 'Failed to fetch movies.' };
        }
    };

    export const getMovieById = async (movieId) => {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    apikey: API_KEY,
                    i: movieId,
                },
            });

            if (response.data.Response === 'True') {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    };
    