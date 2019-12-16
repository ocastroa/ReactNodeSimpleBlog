import {
  getArticlesFailure,
  postArticle,
  updateArticle
} from '../actions/articles';
import axios from 'axios';

export const createArticleThunk = article => {
  return async dispatch => {
    try {
      const createArticle = await axios
        .post('http://localhost:8000/api/articles/new', article)
        .then(res => res.data);

      const newArticle = await dispatch(postArticle(createArticle));
      return newArticle.payload.article.id;
    } catch (err) {
      return dispatch(getArticlesFailure(err));
    }
  };
};

export const updateArticleThunk = article => {
  return async dispatch => {
    try {
      const putArticle = await axios
        .put(
          `http://localhost:8000/api/articles/${article['id']}/edit`,
          article
        )
        .then(res => res.data);

      const updatedArticle = await dispatch(updateArticle(putArticle));
      return updatedArticle.payload.article.id;
    } catch (err) {
      return dispatch(getArticlesFailure(err));
    }
  };
};

export const deleteArticleThunk = articleId => {
  return async dispatch => {
    try {
      await axios
        .delete(`http://localhost:8000/api/articles/${articleId}`)
        .then(res => res.data);
    } catch (err) {
      return dispatch(getArticlesFailure(err));
    }
  };
};
