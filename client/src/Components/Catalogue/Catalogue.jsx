import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard.jsx";
//import { productsList } from "./Info";
import "./Catalogue.modules.css";
import Sidebar from "../sidebar/sidebar.jsx";
// import axios from "axios";
import { connect } from "react-redux";
import { getProductsList } from "../../actions"


function Catalogue(props) {

  // const [ list, setList] = useState([]);
  // useEffect(() => {
  //   axios.get('http://localhost:3000/products')
  //     .then(productList => {
  //      setList (productList.data);
  //     })
  //     .catch(err => {
  //       return err;
  //     })
  // }, [] ) // Le dejo el array vacío para que busque solo en el mount

 

  if (props.allProducts.length === 0) {
  
    props.getProductsList()
  }

  if (props.allProducts.length !== 0) {
   
    return (
      <div className="Catalogue__container">
        <Sidebar></Sidebar>
        <div className="Catalogue__Div">
          {props.allProducts[0].data.map((product, index) => {
            return <ProductCard data={product} key={index} />;
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
    allProducts: state ? state.allProducts : []
  };
}

export default connect(mapStateToProps,{getProductsList})(Catalogue);