import postArticle from '../actions/articles';
import { getArticlesSuccess, getArticlesBegin } from '../actions/articles';
import axios from 'axios';

export const createArticleThunk = article => dispatch => {
  axios
    .post('http://localhost:8000/api/articles/new', article)
    .then(res => {
      return res.data;
    })
    .then(createArticle => {
      dispatch(postArticle(createArticle));
    })
    .catch(console.error.bind(console));
};

export const deleteArticleThunk = articleId => dispatch => {
  axios
    .delete(`http://localhost:8000/api/articles/${articleId}`)
    .then(res => {
      return res.data;
    })
    .then(() => {
      return axios.get(`http://localhost:8000/api/articles`);
    })
    .then(res => {
      return res.data;
    })
    .then(allArticles => {
      dispatch(getArticlesBegin());
      dispatch(getArticlesSuccess(allArticles));
    })
    .catch(console.error.bind(console));
};
