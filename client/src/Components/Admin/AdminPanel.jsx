import React, { Component } from "react";
import { Paper, Container } from "@material-ui/core";
import "./AdminPanel.modules.css";
import { Link } from "react-router-dom";
import LoadProduct from "./LoadPorduct/LoadProduct";
import { Route, Switch } from "react-router-dom";
import LoadCategory from "./LoadCategory/LoadCategory";
import LoadStrain from "./LoadCategory/LoadStrain";
import LoadBrand from "./LoadCategory/LoadBrand";

export const AdminPanel = (props) => {
  return (
    <Container className="AdminPanel">
      <Paper className="AdminPanel__Panel">
        <h1 className="AdminPanel__Title">PANEL DE ADMINISTRADOR</h1>
        <img
          className="imgAdmin"
          src="https://i.ibb.co/JKQk16V/racimo-de-uvas.png"
          alt="No se puede cargar la imagen"
        />
        <br></br>
          <p>
            <Link to="/admin/loadproduct" className="links">
              Cargar Producto
            </Link>
          </p>
          {/*           <li> */}
          {/* <Link to="/admin/loadcategory" className='links'>Cargar Categoria</Link> */}
          <div class="dropdown">
            <button class="dropbutton">
              Cargar nueva...
            </button>
            <div class="dropdown-content">
              <Link to="/admin/loadcategory" className="links">
                Categoría
              </Link>
              <Link to="/admin/loadstrain" className="links">
                Cepa
              </Link>
              <Link to="/admin/loadbrand" className="links">
                Marca
              </Link>
            </div>
          </div>
      </Paper>
      {/*       <br></br>
      <h1>Renderizar formularios de carga</h1>
      <br></br> */}
      <Container className="AdminPanel__Form">
        <Route path="/admin/loadproduct" component={LoadProduct} />
        <Route path="/admin/loadcategory" component={LoadCategory} />
        <Route path="/admin/loadstrain" component={LoadStrain} />
        <Route path="/admin/loadbrand" component={LoadBrand} />
      </Container>
    </Container>
  );
};

export default AdminPanel;
