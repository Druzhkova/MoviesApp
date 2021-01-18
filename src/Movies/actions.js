export const GET_MOVIES_REQUEST = 'GET_MOVIES_REQUEST';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE';

export const GET_MORE_MOVIES_REQUEST = 'GET_MORE_MOVIES_REQUEST';
export const GET_MORE_MOVIES_SUCCESS = 'GET_MORE_MOVIES_SUCCESS';
export const GET_MORE_MOVIES_FAILURE = 'GET_MORE_MOVIES_FAILURE';

export const GET_POPULAR_MOVIES_REQUEST = 'GET_POPULAR_MOVIES_REQUEST';
export const GET_POPULAR_MOVIES_SUCCESS = 'GET_POPULAR_MOVIES_SUCCESS';
export const GET_POPULAR_MOVIES_FAILURE = 'GET_POPULAR_MOVIES_FAILURE';

export const GET_MOVIE_REQUEST = 'GET_MOVIE_REQUEST';
export const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS';
export const GET_MOVIE_FAILURE = 'GET_MOVIE_FAILURE';
export const DELETE_MOVIE_DATA = 'DELETE_MOVIE_DATA';

export function getMoviesRequest(query) {
  return {
    type: GET_MOVIES_REQUEST,
    payload: query,
  };
}

export function getMoviesSuccess(data) {
  return {
    type: GET_MOVIES_SUCCESS,
    payload: data,
  };
}

export function getMoviesFailure(error) {
  return {
    type: GET_MOVIES_FAILURE,
    payload: error,
  };
}

// more movies
export function getMoreMoviesRequest() {
  return {
    type: GET_MORE_MOVIES_REQUEST,
  };
}

export function getMoreMoviesSuccess(data) {
  return {
    type: GET_MORE_MOVIES_SUCCESS,
    payload: data,
  };
}

export function getMoreMoviesFailure(error) {
  return {
    type: GET_MORE_MOVIES_FAILURE,
    payload: error,
  };
}

// Popular movies
export function getPopularMoviesFailure(error) {
  return {
    type: GET_POPULAR_MOVIES_FAILURE,
    payload: error,
  };
}

export function getPopularMoviesRequest() {
  return {
    type: GET_POPULAR_MOVIES_REQUEST,
  };
}

export function getPopularMoviesSuccess(data) {
  return {
    type: GET_POPULAR_MOVIES_SUCCESS,
    payload: data,
  };
}

// Popup
export function getMovieRequest(id) {
  return {
    type: GET_MOVIE_REQUEST,
    payload: id,
  };
}

export function getMovieSuccess(data) {
  return {
    type: GET_MOVIE_SUCCESS,
    payload: data,
  };
}

export function getMovieFailure(error) {
  return {
    type: GET_MOVIE_FAILURE,
    payload: error,
  };
}

export function deleteMovieData() {
  return {
    type: DELETE_MOVIE_DATA,
  };
}
