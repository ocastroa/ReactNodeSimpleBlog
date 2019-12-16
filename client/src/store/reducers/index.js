import { combineReducers } from 'redux';
import { getArticlesReducer } from './articlesReducer';

export const allReducers = combineReducers({
  article: getArticlesReducer
});
