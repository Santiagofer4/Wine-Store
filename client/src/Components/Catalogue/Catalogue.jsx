import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard.jsx";
//import { productsList } from "./Info";
import "./Catalogue.modules.css";
import Sidebar from "../sidebar/sidebar.jsx";
// import axios from "axios";
import { connect } from "react-redux";

function Catalogue(props) {
  // const [ list, setList] = useState([]);
  // useEffect(() => {
  //   axios.get('http://localhost:3000/products')
  //     .then(productList => {
  //      setList (productList.data);
  //     })
  //     .catch(err => {
  //       console.log('este es el error', err)
  //       return err;
  //     })
  // }, [] ) // Le dejo el array vacío para que busque solo en el mount
  //   console.log('array completo',list)

  console.log("PROPS EN CATALOGUE", props);
  let list = props.wineList;

  if (list.length > 0) {
    console.log("array completo 1", list);
    return (
      <div className="Catalogue__container">
        <Sidebar></Sidebar>
        <div className="Catalogue__Div">
          {console.log("posicion 1", list[0])}
          {list.map((product, index) => {
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
  return { wineList: state.wineList };
}

export default connect(mapStateToProps)(Catalogue);