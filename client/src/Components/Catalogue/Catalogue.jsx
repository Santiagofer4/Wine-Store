import React from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import './Catalogue.modules.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { connect } from 'react-redux';
import { getProductsList, getCategoryList } from '../../actions';

function Catalogue(props) {
  // console.log('CATALOGUE', props);
  props.getCategoryList();
  if (props.allProducts.length === 0) {
    props.getProductsList();
  }

  if (props.allProducts.length !== 0) {
    return (
      <div className="Catalogue__container">
        <Sidebar></Sidebar>
        <div className="Catalogue__Div">
          {props.allProducts[0].map((product, index) => {
            return (
              <ProductCard data={product} key={index} productId={product.id} />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <h3>No hay productos</h3>;
  }
}

function mapStateToProps(state) {
  return {
    allProducts: state.productReducers ? state.productReducers.allProducts : [],
  };
}

export default connect(mapStateToProps, { getProductsList, getCategoryList })(
  Catalogue
);
