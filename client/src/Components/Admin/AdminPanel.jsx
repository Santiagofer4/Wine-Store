import React, { Component } from 'react';
import { Paper, Container } from '@material-ui/core';
import './AdminPanel.modules.css';
import { Link } from 'react-router-dom';
import LoadProduct from './LoadPorduct/LoadProduct';
import { Route, Switch } from 'react-router-dom';
import LoadCategory from './LoadCategory/LoadCategory';
import { getCategoryList } from '../../actions';
import { connect } from 'react-redux';

  const AdminPanel =(props)=> {
   
    props.getCategoryList()
//  console.log("viendo el estado",props.categories)
  
  return (
    <Container className="AdminPanel">
      <Paper className="AdminPanel__Panel">
        <h1 className="AdminPanel__Title">ADMIN PANEL</h1>
        <br></br>
        <ul>
          <li>
            <Link to="/admin/loadproduct">Cargar Producto</Link>
          </li>
          <li>
            <Link to="/admin/loadcategory" onClick={()=>{ props.getCategoryList()}}>Cargar/Borrar Categoria</Link>
          </li>
        </ul>
      </Paper>
      <br></br>
      <h1>Formularios del Administrador</h1>
      <br></br>
      <Container className="AdminPanel__Form">
        <Route path="/admin/loadproduct" component={LoadProduct} />
        <Route path="/admin/loadcategory" component={LoadCategory} />
        <Route path="/admin/edit/:id" component={LoadProduct} />
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => {
  console.log("estado", state)
  return {
     categories: state.productReducers.categories
  };
};

export default connect(mapStateToProps, { getCategoryList })(AdminPanel);//export default AdminPanel;
