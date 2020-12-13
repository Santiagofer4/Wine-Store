import React from "react";
import "./Inicio.modules.css";
import Carrousel from '../Carrousel/Carrousel.jsx'
import Contenido from "../Contenido/Contenido.jsx";
import Footer from "../Footer/Footer.jsx";

// Recibe props con Products.info

function Inicio(props) {

  return (
    <div>
      <Carrousel></Carrousel>
      <Contenido></Contenido>
      <Footer></Footer>
    </div>
  );
}

export default Inicio;