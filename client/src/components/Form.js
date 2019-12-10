import React, { useState } from 'react';

function Form() {
  const [titleValue, setTitleValue] = useState(''); // state for title input field
  const [authorValue, setAuthorValue] = useState(''); // state for author input field
  const [bodyValue, setBodyValue] = useState(''); // state for body input field

  return (
    <form>
      <div className="form-group">
        <input
          className="form-control my-3"
          placeholder="Title"
          value={titleValue}
          onChange={event => setTitleValue(event.target.value)}
        />
        <input
          className="form-control my-3"
          placeholder="Author"
          value={authorValue}
          onChange={event => setAuthorValue(event.target.value)}
        />
        <textarea
          className="form-control my-3"
          rows="6"
          placeholder="Body"
          value={bodyValue}
          onChange={event => setBodyValue(event.target.value)}
        ></textarea>
      </div>
    </form>
  );
}

export default Form;
