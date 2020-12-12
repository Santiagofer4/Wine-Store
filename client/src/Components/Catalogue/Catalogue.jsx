import React from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import './Catalogue.modules.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { connect } from 'react-redux';
import { getProductsList, getCategoryList } from '../../actions';

function Catalogue(props) {
  //console.log('CATALOGUE', props);
  props.getCategoryList();
  if (props.allProducts.length === 0) {
    props.getProductsList();
  }
  console.log('NUEVAS PROPS', props)
  if (props.allProducts.length > 1) {
    console.log( 'objeto ?? ',props.allProducts[0].length)
    return (
      <div className="Cataloguecontainer">
        <Sidebar></Sidebar>
        <div className="CatalogueDiv">
          {props.allProducts[0].map((product, index) => {
            return (
              <ProductCard data={product} key={index} productId={product.id} />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (<div className='Cataloguecontainer'>
      <div className='CatalogueDiv'>

      <h3>No hay productos</h3>
      </div>
    </div> )
  }
}

function mapStateToProps(state) {
  return {
    allProducts: state.productReducers.allProducts ? state.productReducers.allProducts : [],
  };
}

export default connect(mapStateToProps, { getProductsList, getCategoryList })(
  Catalogue
);