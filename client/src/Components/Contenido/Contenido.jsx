import React from "react";
import "./Contenido.modules.css";

// Recibe props con Products.info

function Contenido(props) {

  return (
    <div id="contenido" >

      
       
        <img className='imgLogo' src="https://i.ibb.co/x7Z2cfF/winestorelogo.png"></img> 

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