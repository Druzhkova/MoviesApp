import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';
import {
  popularMoviesMiddleware, moviesMiddleware, moreMoviesMiddleware, movieMiddleware,
} from '../Movies';

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(popularMoviesMiddleware, moviesMiddleware, moreMoviesMiddleware, movieMiddleware),
));
