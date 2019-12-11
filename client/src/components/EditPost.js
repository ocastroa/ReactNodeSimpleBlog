import React from 'react';
import Form from './Form';

const EditPost = () => {
  return (
    <div>
      <div className="container mt-4">
        <div className="col-12 col-lg-6 offset-lg-3 mt-3">
          <Form />
          <button className="btn btn-primary mb-4 float-right">Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
