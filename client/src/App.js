import React from 'react';
import './App.modules.css';
import Catalogue from './Components/Catalogue/Catalogue.jsx';
import ProductForm from './Components/Forms/ProductForm.jsx';
import { Route, Switch } from 'react-router-dom';
import NavBar from './Components/SearchBar/NavBar.jsx';
import Inicio from './Components/Inicio/Inicio.jsx';
import TestForm from './Components/FormComponents/TestForm.jsx';
import AdminPanel from './Components/Admin/AdminPanel';
// import { LoadProduct } from './Components/Admin/LoadProduct/LoadProduct';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Cart from './Components/Cart/Cart.jsx';
import OrderTable from './Components/OrderTable/OrderTable.jsx'

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/" component={Inicio}></Route>
        <Route path="/catalogue" component={Catalogue}></Route>
        <Route path="/product/:id" render={() => <ProductDetail />} />
        <Route path="/admin/form-product" component={ProductForm} />
        <Route path="/form/test" component={TestForm} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/cart" component={Cart}/>
        <Route path="/order-table" component={OrderTable}/>
      </Switch>
    </div>
  );
}

export default App;
