import {
  GET_ARTICLES_BEGIN,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  POST_ARTICLE,
  UPDATE_ARTICLE
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

    case UPDATE_ARTICLE:
      const index = state.articles.findIndex(
        el => el.id == action.payload.article.id
      );
      if (index === -1) {
        return state;
      }
      return {
        articles: [
          ...state.articles.slice(0, index),
          action.payload.article,
          ...state.articles.slice(index + 1)
        ]
      };

    default:
      return state;
  }
};
