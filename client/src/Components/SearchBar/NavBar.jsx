import React from 'react';
import SearchBar from './SearchBar.jsx';
import './NavBar.modules.css';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../slices/productSlice';
import { getAllCategories } from '../../slices/categorySlice';
import { useDispatch} from 'react-redux';

function NavBar() {
  const dispatch = useDispatch();

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
          <li className="Nav__li">
            {' '}
            <Link
              to="/catalogue"
              className="Nav__Link"
              onClick={() => {
                dispatch(getAllProducts());      // ! Al que comenta esto le corto las manos xD
                dispatch(getAllCategories());            
                }}
            >
              Catalogo
            </Link>
          </li>
          <li className="Nav__li">
            {' '}
            <Link to="/admin" className="Nav__Link" id="invisible">
              Admin
            </Link>
          </li>
          <li className="Nav__li">
          {' '}
            <Link to="/form/user/login" className="Nav__Link">
              Ingresar
            </Link>
          </li>
          <li className="Nav__li">
          {' '}
            <Link to="/form/user" className="Nav__Link">
              Regístrate
            </Link>
          </li>
        </ul>
        <div id="search-cart">
          <div>
            <SearchBar id="searchbar"></SearchBar>
          </div>
          <div id="cartDiv">
            <Link
              id="cart"
              to="/cart"
              className="Nav__Link"
            >
              <img
                id="imgCart"
                src="https://i.ibb.co/FsngVZ5/carrito1.png"
                alt="Carrito"
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}


export default NavBar;
