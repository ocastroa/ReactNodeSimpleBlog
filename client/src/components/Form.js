import React, { useReducer } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  createArticleThunk,
  updateArticleThunk
} from '../store/middleware/articleThunks';

const reducer = (state, { key, value }) => {
  return {
    ...state,
    [key]: value
  };
};

const Form = withRouter(props => {
  const dispatch = useDispatch();

  const { edit, setId, setTitle, setAuthor, setBody } = props.location.state;

  const initState = {
    id: parseInt(setId, 10), // convert to int
    title: setTitle,
    author: setAuthor,
    body: setBody
  };

  // Use this hook instead of having multiple hooks for the 3 input fields
  const [value, setValue] = useReducer(reducer, initState);
  const { title, author, body } = value;

  // Called when user writes in the input fields
  const onChange = e => {
    setValue({ key: e.target.name, value: e.target.value });
  };

  // Use async await to wait for data (in this case the new or updated id of the article) before proceeding to the appropriate page
  const checkInputFields = async () => {
    if (title && author && body) {
      if (edit) {
        // User is updating an existing post
        let editArticlePromise = new Promise(res => {
          res(dispatch(updateArticleThunk(value)));
        });

        // wait until the promise returns the article id
        let updatedArticleId = await editArticlePromise;
        props.history.push(`/articles/${updatedArticleId}`);
      } else {
        // User is posting a new post
        let addArticlePromise = new Promise(res => {
          res(dispatch(createArticleThunk(value)));
        });

        let newArticleId = await addArticlePromise;
        props.history.push(`/articles/${newArticleId}`);
      }
    } else {
      // All input fields are not filled in
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
    <div className="container mt-4">
      <div className="col-12 col-lg-6 offset-lg-3 mt-3">
        <form>
          <div className="form-group">
            <input
              name="title"
              className="form-control my-3"
              placeholder="Title"
              value={title}
              onChange={onChange}
            />
            <input
              name="author"
              className="form-control my-3"
              placeholder="Author"
              value={author}
              onChange={onChange}
            />
            <textarea
              name="body"
              className="form-control my-3"
              rows="8"
              placeholder="Write here..."
              value={body}
              onChange={onChange}
            ></textarea>
          </div>
        </form>
        <button
          className="btn btn-primary mb-4 float-right"
          onClick={() => checkInputFields()}
        >
          {edit ? `Update` : `Publish`}
        </button>
      </div>
    </div>
  );
});

export default Form;
