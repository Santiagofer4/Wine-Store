import React from 'react';
import { Paper, Container } from '@material-ui/core';
import './AdminPanel.modules.css';
import { Link } from 'react-router-dom';
import LoadProduct from './LoadProduct/LoadProduct';
import { Route } from 'react-router-dom';
import LoadCategory from './LoadCategory/LoadCategory';
import LoadStrain from './LoadCategory/LoadStrain';
import { getCategoryList, getStrainList } from '../../actions';
import { connect } from 'react-redux';

const AdminPanel = (props) => {
  //  props.getCategoryList()
  //  console.log("viendo el estado",props.categories)

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
            <Link
              className="links"
              to="/admin/loadcategory"
              onClick={() => {
                props.getCategoryList();
              }}
            >
              Cargar/Borrar Categoria
            </Link>
          </li>
          <li>
            <Link
              className="links"
              to="/admin/loadstrain"
              onClick={() => {
                props.getStrainList();
              }}
            >
              Cargar/Borrar Cepa
            </Link>
          </li>
        </ul>
      </Paper>
      <br></br>
      <h1 className="Admin__H1">Formularios del Administrador</h1>
      <br></br>
      <Container className="AdminPanel__Form">
        <Route path="/admin/loadproduct" component={LoadProduct} />
        <Route path="/admin/loadcategory" component={LoadCategory} />
        <Route path="/admin/loadstrain" component={LoadStrain} />
        <Route path="/admin/edit/:id" component={LoadProduct} />
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => {
  // console.log('estado', state);
  return {
    categories: state.productReducers.categories,
  };
};

export default connect(mapStateToProps, { getCategoryList })(AdminPanel); //export default AdminPanel;
