import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteArticleThunk } from '../store/middleware/articleThunks';

const ViewPost = withRouter(props => {
  const id = props.match.params.id; // Get article id

  const article = useSelector(state => state.article);
  const dispatch = useDispatch();

  // Get article that matches param id
  const getArticles = article.articles.filter(article => article['id'] == id);
  const { title, author, createdOn, body } = getArticles[0]; // Object destructuring

  // Modal for deleting blog post
  const deleteModal = () => {
    Swal.fire({
      position: 'top',
      allowOutsideClick: true,
      title: 'Delete Post?',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0,123,255)',
      confirmButtonText: 'Okay',
      width: 275,
      padding: '0.7em'
    })
      .then(async result => {
        if (result.value) {
          let deleteArticlePromise = new Promise(res => {
            res(dispatch(deleteArticleThunk(id)));
          });

          // wait for promise to return, which in this case guarantees that article has been deleted in the db before proceeding to the home page
          await deleteArticlePromise;
          props.history.push('/');
        }
      })
      .catch(console.error.bind(console));
  };

  return (
    <div className="offset-lg-3 mt-3">
      <div className="row"></div>
      <div className="col-lg-9">
        <h1 className="mt-4 ml-1 mr-1">{title}</h1>
        <hr />
        <p>
          <small className="text-muted">
            {author} ・ {createdOn}
          </small>
          <button
            className="btn btn-danger btn-sm float-right"
            onClick={() => deleteModal()}
          >
            Delete
          </button>
          <Link
            to={{
              pathname: `${id}/edit`,
              state: {
                edit: true,
                setId: id,
                setTitle: title,
                setAuthor: author,
                setBody: body
              }
            }}
          >
            <button className="btn btn-primary btn-sm float-right mx-2">
              Edit
            </button>
          </Link>
        </p>
        <hr />
        <p className="mb-5"> {body} </p>
      </div>
    </div>
  );
});

export default ViewPost;
