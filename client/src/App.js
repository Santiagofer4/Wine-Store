import React from 'react';
import './App.css';
import Catalogue from './Components/Catalogue/Catalogue.jsx'
import ProductForm from './Components/ProductForm/ProductForm';
import SearchBar from './Components/SearchBar/SearchBar.jsx'
import {productsList} from './Components/Products/ProductoPrueba.js'
import Products from './Components/Products/Products.jsx'

function App() {
  return (
    <div className="App">
        <SearchBar/>
        <Catalogue/>
        <ProductForm/>
        {/* <Products data={productsList} /> */}
    </div>
  );
}

export default App;

