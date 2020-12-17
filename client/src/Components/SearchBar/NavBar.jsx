import React from 'react';
import SearchBar from './SearchBar.jsx';
import './NavBar.modules.css';
import { Link } from 'react-router-dom';
import { getProductsCart } from '../../actions'
import { connect } from 'react-redux';


function NavBar(props) {
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
      <div id="search-cart">
       <div>

        <SearchBar id='searchbar'></SearchBar>
       </div>
       <div id="cartDiv">

        <Link 
        id='cart' 
        to="/cart" 
        className="Nav__Link" 
        onClick={() => {
          props.getProductsCart();
        }}
        >
            <img id="imgCart" src="https://i.ibb.co/FsngVZ5/carrito1.png" alt="Carrito"/>
             
            </Link>
       </div>


      </div>
        
      </nav>
    </div>
  );
}

function mapStateToProps (state) {
  return {
    productsCart: state.productReducers.productsCart
  }
}

export default connect(mapStateToProps, { getProductsCart })
(NavBar);
