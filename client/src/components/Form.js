import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editFields } from '../store/actions/inputFields';

const Form = () => {
  const dispatch = useDispatch();

  return (
    <form>
      <div className="form-group">
        <input
          className="form-control my-3"
          placeholder="Title"
          onChange={event => dispatch(editFields('title', event.target.value))}
        />
        <input
          className="form-control my-3"
          placeholder="Author"
          onChange={event => dispatch(editFields('author', event.target.value))}
        />
        <textarea
          className="form-control my-3"
          rows="6"
          placeholder="Body"
          onChange={event => dispatch(editFields('body', event.target.value))}
        ></textarea>
      </div>
    </form>
  );
};

export default Form;
