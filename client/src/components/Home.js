import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  getArticlesBegin,
  getArticlesSuccess,
  getArticlesFailure
} from '../store/actions/articles';
import axios from 'axios';

/**
 * TODO:
 *  1) Clean up CSS for background
 *  2) Connect to MySql db to store blog post table and user table
 */

const Home = () => {
  const article = useSelector(state => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticlesBegin());
    axios
      .get('http://localhost:8000/api/articles/')
      .then(res => {
        return res.data;
      })
      .then(articles => {
        dispatch(getArticlesSuccess(articles));
      })
      .catch(err => store.dispatch(getArticlesFailure(err)));
  }, []);

  if (article.error) {
    return <div>Error</div>;
  }

  if (article.loading) {
    return <div></div>;
  }

  return (
    <div className="container">
      <div className="row pt-4">
        <div className="col-12 col-lg-6 offset-lg-3">
          {article.articles.map(article => {
            return (
              <div key={article.id} className="card mb-3 ml-3">
                <Link
                  to={`/articles/${article.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="card-body">
                    <h4 className="card-title">{article.title}</h4>
                    <p className="card-text">
                      <small className="text-muted">
                        <b>{article.author}</b> - {article.createdOn}
                      </small>
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
