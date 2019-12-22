import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div id="navbar">
      <nav className="navbar navbar-dark bg-primary">
        <Link to="/">
          <div className="navbar-brand">DevBlog</div>
        </Link>
        <Link
          to={{
            pathname: `/new`,
            state: {
              edit: false,
              setId: '',
              setTitle: '',
              setAuthor: '',
              setBody: ''
            }
          }}
        >
          <button className="btn btn-sm btn-outline-light">Write</button>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
