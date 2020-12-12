import React, { Component } from 'react';
import { Paper, Container } from '@material-ui/core';
import './AdminPanel.modules.css';
import { Link } from 'react-router-dom';
import LoadProduct from './LoadPorduct/LoadProduct';
import { Route, Switch } from 'react-router-dom';
import LoadCategory from './LoadCategory/LoadCategory';

export const AdminPanel = (props) => {
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
            <Link to="/admin/loadcategory">Cargar Categoria</Link>
          </li>
        </ul>
      </Paper>
      <br></br>
      <h1>Renderizar formularios de carga</h1>
      <br></br>
      <Container className="AdminPanel__Form">
        <Route path="/admin/loadproduct" component={LoadProduct} />
        <Route path="/admin/loadcategory" component={LoadCategory} />
      </Container>
    </Container>
  );
};

export default AdminPanel;
