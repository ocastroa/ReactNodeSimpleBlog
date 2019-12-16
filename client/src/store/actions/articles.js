export const GET_ARTICLES_BEGIN = 'GET_ARTICLES_BEGIN';
export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_FAILURE = 'GET_ARTICLES_FAILURE';
export const POST_ARTICLE = 'POST_ARTICLE';
export const EDIT_ARTICLE = 'EDIT_ARTICLE';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';

export const getArticlesBegin = () => {
  return {
    type: GET_ARTICLES_BEGIN
  };
};

export const getArticlesSuccess = posts => {
  return {
    type: GET_ARTICLES_SUCCESS,
    payload: { posts }
  };
};

export const getArticlesFailure = error => {
  return {
    type: GET_ARTICLES_FAILURE,
    payload: { error }
  };
};

export const postArticle = article => {
  return {
    type: POST_ARTICLE,
    payload: { article }
  };
};

export const editArticle = () => {
  return {
    type: EDIT_ARTICLE
  };
};

export const updateArticle = article => {
  return {
    type: UPDATE_ARTICLE,
    payload: { article }
  };
};

export const deleteArticle = () => {
  return {
    type: DELETE_ARTICLE
  };
};
