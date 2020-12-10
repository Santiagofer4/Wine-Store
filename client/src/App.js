import React from 'react';
import './App.modules.css';
import Catalogue from './Components/Catalogue/Catalogue.jsx'
import ProductForm from './Components/Forms/ProductForm.jsx';
import SearchBar from './Components/SearchBar/SearchBar.jsx'
import {productsList} from './Components/Products/ProductoPrueba.js'
import Products from './Components/Products/Products.jsx'
import { Route } from "react-router-dom";
import NavBar from './Components/SearchBar/NavBar.jsx'
import Inicio from './Components/Inicio/Inicio.jsx'
import TestForm from './Components/FormComponents/TestForm.jsx'
function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Route exact path='/catalogue' component={Catalogue}></Route>
      <Route exact path='/' component={Inicio}></Route>
      <Route path='/product' render={()=> <Products data={productsList} /> }/>
      <Route path='/admin/form-product' component={ProductForm}/>
      <Route path='/form/test' component={TestForm}/>

        {/* <Catalogue/> */}
        {/* <Products data={productsList} /> */}
    </div>
  );
}

export default App;

