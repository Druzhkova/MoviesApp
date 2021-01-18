import { combineReducers } from 'redux';
import { MoviesReduser } from '../Movies';

export const rootReducer = combineReducers({
  movies: MoviesReduser,
});
