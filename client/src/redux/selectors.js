import { createSelector } from 'reselect';

// Select the list of all movies from the state
const selectMovies = (state) => state.movies.movies;

// Memoized selector to filter movies based on search
export const selectFilteredMovies = createSelector(
  [selectMovies, (state, search) => search],
  (movies, search) => {
    if (!Array.isArray(movies)) return [];
    return movies.filter((movie) =>
      movie.name.toLowerCase().includes(search.toLowerCase())
    );
  }
);
