import React from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import './Catalogue.modules.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { connect } from 'react-redux';
import { getProductsList, getCategoryList } from '../../actions';

function Catalogue(props) {
  props.getCategoryList();// se dispacha una accion al reducer con la lista de categorias para el sidebar

  if (props.allProducts.length === 0) { // si el estado allProducts esta vacio.
    props.getProductsList(); // despacho una accion al reducer para traer todos los productos para el catalogo y los guardo en allProducts
    // console.log('a ver como aparezco??')
  }
// el estado allProducts es un arreglo vacio. va a contener un arreglo de objetos (productos)
  if (props.allProducts[0] !== undefined) { // si el estado allProducts tiene un arreglo dentro y este no es undefined
    if(props.allProducts[0].length === 0){ // si allProducts[0] no es undefined pero no contiene datos
      // console.log('tengo un arr pero vacio')
      return (<div className='Catalogue__containerCargando'> {// informo en pantalla que no hay productos cargados
      }
      <div className='Catalogue__Div'>
      <h3>No hay productos</h3>
      {props.allProducts[0].map((product, index) => {
              return (
                <ProductCard data={product} key={index} productId={product.id} />
              );
            })}
      </div>
    </div> )
    }else{ // si allProducts[0] no es undefined y  contiene datos (productos) muestro el catalogo con los productos
      // console.log('tengo un arr con datos')
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
        </div>)
    }    
    
  } else { // si allProducts[0] es undefined. allProducts es un arreglo vacio (temporalmente hasta que se resuelva la accion y le llegue datos)
   return (<div className='Catalogue__containerCargando'>
   <div className='Catalogue__Div'>

   <h3>Cargando...</h3>
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
