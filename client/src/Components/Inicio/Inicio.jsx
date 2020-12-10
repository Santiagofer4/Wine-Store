import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import "./Inicio.modules.css";
import Carrousel from '../Carrousel/Carrousel.jsx'
import Contenido from "../Contenido/Contenido.jsx";

// Recibe props con Products.info

function Inicio(props) {

  return (
    <div>
      <Carrousel></Carrousel>
      <Contenido></Contenido>

    </div>
  );
}

export default Inicio;