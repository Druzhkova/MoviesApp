import {
  GET_MOVIES_FAILURE,
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MORE_MOVIES_FAILURE,
  GET_MORE_MOVIES_REQUEST,
  GET_MORE_MOVIES_SUCCESS,
  GET_POPULAR_MOVIES_FAILURE,
  GET_POPULAR_MOVIES_REQUEST,
  GET_POPULAR_MOVIES_SUCCESS,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAILURE,
  GET_MOVIE_REQUEST,
  DELETE_MOVIE_DATA,
} from './actions';

const initialState = {
  searchParams: {
    searchValue: '', searchBy: '', sortBy: '',
  },
  movies: null,
  loading: false,
  errorMessage: null,
  popularMovies: null,
  loadingPopularMovies: false,
  errorMessagePopularMovies: null,
  loadingMore: false,
  movieData: null,
  loadingPopUp: false,
  errorMessagePopUp: null,
};

export function MoviesReduser(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_SUCCESS: {
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    }

    case GET_MOVIES_REQUEST: {
      return {
        ...state,
        loading: true,
        errorMessage: null,
        searchParams: {
          ...state.searchParams,
          ...action.payload,
        },
      };
    }

    case GET_MOVIES_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };
    }

    case GET_POPULAR_MOVIES_SUCCESS: {
      return {
        ...state,
        popularMovies: action.payload,
        loadingPopularMovies: false,
      };
    }

    case GET_POPULAR_MOVIES_REQUEST: {
      return {
        ...state,
        loadingPopularMovies: true,
        errorMessagePopularMovies: null,
      };
    }

    case GET_POPULAR_MOVIES_FAILURE: {
      return {
        ...state,
        errorMessagePopularMovies: action.payload,
        loadingPopularMovies: false,
      };
    }

    case GET_MORE_MOVIES_SUCCESS: {
      return {
        ...state,
        movies: {
          ...action.payload,
          data: [...state.movies.data, ...action.payload.data],
        },
        loadingMore: false,
      };
    }

    case GET_MORE_MOVIES_REQUEST: {
      return {
        ...state,
        loadingMore: true,
        errorMessage: null,
      };
    }

    case GET_MORE_MOVIES_FAILURE: {
      return {
        ...state,
        loadingMore: false,
        errorMessage: action.payload,
      };
    }

    case GET_MOVIE_SUCCESS: {
      return {
        ...state,
        movieData: action.payload,
        loadingPopUp: false,
        errorMessagePopUp: null,
      };
    }

    case GET_MOVIE_FAILURE: {
      return {
        ...state,
        errorMessagePopUp: action.payload,
        loadingPopUp: false,
      };
    }

    case GET_MOVIE_REQUEST: {
      return {
        ...state,
        loadingPopUp: true,
      };
    }

    case DELETE_MOVIE_DATA: {
      return {
        ...state,
        movieData: null,
      };
    }

    default: return state;
  }
}
