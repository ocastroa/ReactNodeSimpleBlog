import {
  GET_ARTICLES_BEGIN,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  POST_ARTICLE
} from '../actions/articles';

const initState = {
  articles: [],
  loading: false,
  error: null
};

export const getArticlesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ARTICLES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload.posts
      };

    case GET_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case POST_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.payload.article]
      };

    default:
      return state;
  }
};
