import React from 'react';
import Form from './Form';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createArticleThunk } from '../store/middleware/articleThunks';

const CreatePost = withRouter(props => {
  const article = useSelector(state => state.inputFields);
  const dispatch = useDispatch(); // hook that fires off redux action

  const checkInputFields = () => {
    if (article.title && article.author && article.body) {
      dispatch(createArticleThunk(article));
      props.history.push('/');
    } else {
      Swal.fire({
        position: 'top',
        allowOutsideClick: true,
        title: 'Make sure to fill in all fields',
        confirmButtonColor: 'rgb(0,123,255)',
        confirmButtonText: 'Okay',
        width: 275,
        padding: '0.7em'
      });
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="col-12 col-lg-6 offset-lg-3">
          <Form />
          <button
            className="btn btn-primary mb-4 float-right"
            onClick={() => checkInputFields()}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
});

export default CreatePost;
