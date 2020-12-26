import React, { useEffect } from 'react';
import { Paper, Container } from '@material-ui/core';
import './AdminPanel.modules.css';
import { Link } from 'react-router-dom';
import LoadProduct from './LoadProduct/LoadProduct';
import { Route } from 'react-router-dom';
import LoadCategory from './LoadCategory/LoadCategory';
import { getCategoryList, getStrainList } from '../../actions';
import { connect, useDispatch, useSelector } from 'react-redux';
import AdminStrain from './LoadCategory/AdminStrain';
import AdminCategory from './LoadCategory/AdminCategory';
import AdminProduct from './LoadProduct/AdminProduct';
import _LoadProduct from './LoadProduct/_LoadProduct';

const AdminPanel = (props) => {
  const dispatch = useDispatch();

  return (
    <Container className="AdminPanel">
      <Paper id="backgroundPaper" className="AdminPanel__Panel">
        <h1 className="AdminPanel__Title">ADMIN PANEL</h1>
        <img
          className="imgAdmin"
          src="https://i.ibb.co/JKQk16V/racimo-de-uvas.png"
          alt="No se puede cargar la imagen"
        />
        <br></br>
        <ul className="AdminPanel__Ul">
          <li>
            <Link className="links" to="/admin/loadproduct">
              Cargar Producto
            </Link>
          </li>
          <li>
            <Link className="links" to="/admin/loadcategory">
              Cargar/Borrar Categoria
            </Link>
          </li>
          <li>
            <Link className="links" to="/admin/loadstrain">
              Cargar/Borrar Cepa
            </Link>
          </li>
        </ul>
      </Paper>
      <br></br>
      <h1 className="Admin__H1">Formularios del Administrador</h1>
      <br></br>
      <Container className="AdminPanel__Form">
        <Route path="/admin/loadproduct" component={AdminProduct} />
        <Route path="/admin/loadcategory" component={AdminCategory} />
        <Route path="/admin/loadstrain" component={AdminStrain} />
        <Route path="/admin/edit/:id" component={_LoadProduct} />
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => {
  // console.log('estado', state);
  return {
    strains: state.productReducers.strains,
    categories: state.productReducers.categories,
  };
};

export default connect(mapStateToProps, { getCategoryList, getStrainList })(
  AdminPanel
); //export default AdminPanel;
