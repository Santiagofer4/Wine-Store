import React from 'react';
import './Cart.modules.css';
import { getProductsCart } from '../../actions/index';
import { connect } from 'react-redux';

function Cart(props) {
 

  return (
    <div>
        <div className="ShoppingCart"><ul>
     
           {console.log( 'productos del carrito', props.productsCart)}

        
          </ul> 
        </div>
        <div className="Summary"></div>
        <div className="Buttons"></div>
    </div>
  );
}

function mapStateToProps (state) {
    return {
      productsCart: state.productReducer.productsCart
    }
} 

export default connect (mapStateToProps, { getProductsCart } ) (Cart);