import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import "./Contenido.modules.css";


// Recibe props con Products.info

function Contenido(props) {

  return (
    <div id="contenido" >

      <h1 id='title'>
       
        <img src="https://i.ibb.co/x7Z2cfF/winestorelogo.png"></img> 
</h1>
<div id="contenedor1"> 
      <article key="1" className="card" >
        
        <img class="card__front" id='visionImg' src='https://i.ibb.co/qMdksps/Vision.png'></img>
       
        <div class="card__back">
          <h3>Nuestras visiones</h3>
          <p>Valor 1</p>
          <p>Valor 2</p>
          <p>Valor 3</p>
        </div>
      </article>

      <article key="2" className="card" >
      
        <img class="card__front" id='visionImg' src='https://i.ibb.co/mBGfr4L/mision.png'></img>
       
        <div class="card__back">
          <h3>Nuestras misiones</h3>
          <p>Valor 1</p>
          <p>Valor 2</p>
          <p>Valor 3</p>
        </div>
      </article>
      <article key="3" className="card" >
        
        <img class="card__front" id='visionImg' src='https://i.ibb.co/882fSvc/valores.png'></img>
        
        <div class="card__back">
          <h3>Nuestros valores</h3>
          <p>Valor 1</p>
          <p>Valor 2</p>
          <p>Valor 3</p>
        </div>
      </article>
      </div>
     
    </div>


  );
}

export default Contenido;