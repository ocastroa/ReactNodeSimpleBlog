import React from 'react';
import Form from './Form';

function CreatePost() {
  return (
    <div>
      <div className="container mt-5">
        <div className="col-12 col-lg-6 offset-lg-3">
          <Form />
          <button className="btn btn-primary mb-4 float-right">Publish</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
