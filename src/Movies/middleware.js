import {
  GET_MOVIES_REQUEST,
  getMoviesSuccess,
  getMoviesFailure,
  GET_MORE_MOVIES_REQUEST,
  getMoreMoviesSuccess,
  getMoreMoviesFailure,
  GET_POPULAR_MOVIES_REQUEST,
  getPopularMoviesSuccess,
  getPopularMoviesFailure,
  GET_MOVIE_REQUEST,
  getMovieSuccess,
  getMovieFailure,
} from './actions';

export const popularMoviesMiddleware = (store) => (next) => (action) => {
  if (action.type === GET_POPULAR_MOVIES_REQUEST) {
    fetch('https://reactjs-cdp.herokuapp.com/movies?sortBy=release_date&sortOrder=desc&limit=20')
      .then((res) => res.json())
      .then((response) => store.dispatch(getPopularMoviesSuccess(response)))
      .catch((error) => store.dispatch(getPopularMoviesFailure(error)));
  }
  next(action);
};

export const moviesMiddleware = (store) => (next) => (action) => {
  if (action.type === GET_MOVIES_REQUEST) {
    const {
      searchValue, searchBy, sortBy,
    } = action.payload;
    fetch(`https://reactjs-cdp.herokuapp.com/movies?sortBy=${sortBy}&sortOrder=desc&search=${searchValue}&searchBy=${searchBy}&limit=24`)
      .then((res) => res.json())
      .then((response) => store.dispatch(getMoviesSuccess(response)))
      .catch((error) => store.dispatch(getMoviesFailure(error)));
  }
  next(action);
};

export const moreMoviesMiddleware = (store) => (next) => (action) => {
  if (action.type === GET_MORE_MOVIES_REQUEST) {
    const { movies: { movies, searchParams: { sortBy, searchValue, searchBy } } } = store.getState();
    if (movies) {
      let { offset } = movies;
      if (offset === 0) {
        offset = 24;
      }
      offset += 12;
      fetch(`https://reactjs-cdp.herokuapp.com/movies?sortBy=${sortBy}&sortOrder=desc&search=${searchValue}&searchBy=${searchBy}&limit=12&offset=${offset}`)
        .then((res) => res.json())
        .then((response) => store.dispatch(getMoreMoviesSuccess(response)))
        .catch((error) => store.dispatch(getMoreMoviesFailure(error)));
    }
  }
  next(action);
};

export const movieMiddleware = (store) => (next) => (action) => {
  if (action.type === GET_MOVIE_REQUEST) {
    fetch(`https://reactjs-cdp.herokuapp.com/movies/${action.payload}`)
      .then((res) => res.json())
      .then((result) => store.dispatch(getMovieSuccess(result)))
      .catch((error) => store.dispatch(getMovieFailure(error)));
  }
  next(action);
};
