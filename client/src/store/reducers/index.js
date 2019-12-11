import { combineReducers } from 'redux';
import { getArticlesReducer } from './articlesReducer';
import { editInputFieldsReducer } from './editInputFields';

export const allReducers = combineReducers({
  article: getArticlesReducer,
  inputFields: editInputFieldsReducer
});
