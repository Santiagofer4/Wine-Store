import React from 'react';
import SearchBar from './SearchBar.jsx';
import './NavBar.modules.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <nav className="Nav">
        <ul className="Nav__ul">
          <li className="Nav__li">
            {' '}
            <Link to="/" className="Nav__Link">
              Home
            </Link>
          </li>
          <li className="Nav__li" >
            {' '}
            <Link to="/catalogue" className="Nav__Link">
              Catalogue
            </Link>
          </li>
          <li className="Nav__li">
            {' '}
            <Link to="/admin" className="Nav__Link" id="invisible">
              Admin
            </Link>
          </li>
        </ul>
        <SearchBar></SearchBar>
      </nav>
    </div>
  );
}

export default NavBar;
