import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard.jsx";
//import { productsList } from "./Info";
import './Catalogue.modules.css'
import Sidebar from '../sidebar/sidebar.jsx';
import axios from "axios";



function Catalogue() {
  
  const [ list, setList] = useState([]);
  
  useEffect(() => {
    
    axios.get('http://localhost:3000/products')
      .then(productList => {
       setList (productList.data);
       // console.log('array completo',list)
       // return productList.data;
      })
      .catch(err => {
        console.log('este es el error', err)
        return err;
      })
  }, [list] )
     
    console.log('array completo',list)

  if(list) {
    console.log('array completo 1',list)
  return (
    <div className='Catalogue__container'>
     <Sidebar></Sidebar>
    <div className='Catalogue__Div' >
      {console.log('posicion 1',list[0])}
      { list.map((product, index) => {
        return <ProductCard data={product} key={index} />;
      })}
    </div>
    </div>
  );} 
  if(!list) {
    return (
    <h3>No hay productos</h3>
    )
  }
}

export default Catalogue;