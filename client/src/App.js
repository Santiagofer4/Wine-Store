import React from 'react';
import './App.modules.css';
import Catalogue from './Components/Catalogue/Catalogue.jsx';
import CatalogueByTaste from './Components/Catalogue/CatalogueByTaste.jsx';
import ProductForm from './Components/Forms/ProductForm.jsx';
import { Redirect, Route, Switch } from 'react-router-dom';
import NavBar from './Components/SearchBar/NavBar.jsx';
import Inicio from './Components/Inicio/Inicio.jsx';
import TestForm from './Components/FormComponents/TestForm.jsx';
import AdminPanel from './Components/Admin/AdminPanel';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Cart from './Components/Cart/Cart.jsx';
import OrderTable from './Components/OrderTable/OrderTable.jsx';
import Welcome from './Components/Contenido/Welcome';
import Failure from './Components/Contenido/Failure';
import notFound from './Components/notFound/notFound';
import UserForm from './Components/Forms/User/UserForm';
import UserLogin from './Components/Forms/User/UserLogin';
// import Profile from './Components/Profile/Profile';
import axios from 'axios';
import ProtectRoute from './Components/ProtectRoute/ProtectRoute';
import Logout from './Components/Contenido/Logout';
import { isLogged, isAdmin } from './Components/utils/index';
import tokenManager from './Components/utils/tokenManager';
import Notifier from './Components/Notifier/Notifier';
import Checkout from './Components/Checkout/Checkout';
import Profile from './Components/Profile/Profile';

function App() {
  // //!SOLUCION CAVERNICOLA!
  if (isLogged()) {
    axios.defaults.headers.common['Authorization'] = tokenManager.getToken();
  }
  axios.defaults.withCredentials = true;
  // //!<-----------------

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
      <NavBar></NavBar>
      <Notifier />
      <Switch>
        <Route exact path="/" component={Inicio}></Route>
        <Route exact path="/catalogue" component={Catalogue}></Route>
        <Route path="/catalogue/:taste" render={() => <CatalogueByTaste />} />
        <Route path="/product/:id" render={() => <ProductDetail />} />
        <Route path="/admin/form-product" component={ProductForm} />
        <Route path="/form/test" component={TestForm} />
        {/* <ProtectRoute path="/admin" component={AdminPanel} isLogged={isAdmin} /> */}
        <Route path="/admin" component={AdminPanel} />
        <Route path="/cart" component={Cart} />
        {/* <Route path="/cart" render={() => isLogged() ? <Cart logueado={true}/> : (<Cart logueado={true}/> )} /> */}
        <Route path="/order-table" component={OrderTable} />
        <Route path="/form/user/login" component={UserLogin} />
        <Route path="/form/user" component={UserForm} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/logout" component={Logout} />
        <Route path="/failure" component={Failure} />
        {/* <Route path="/prueba" component={CollapsibleTable} /> */}

        <ProtectRoute
          path="/user/profile"
          component={Profile}
          isLogged={isLogged}
        />
        {/* <Route path="/user/profile" component={Profile} /> */}
        <Route path="/404" component={notFound} />
        <Route path="/checkout" component={Checkout} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
