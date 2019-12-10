import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div id="navbar">
      <nav className="navbar navbar-dark bg-primary">
        <Link to="/">
          <a className="navbar-brand">DevPost</a>
        </Link>
        <Link to="/new">
          <button className="btn btn-sm btn-outline-light">Write</button>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
