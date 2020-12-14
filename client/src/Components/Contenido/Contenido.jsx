import React from 'react';
import './Contenido.modules.css';

function Contenido() {
  //le borré props, porque en teoría no necesita recibir nada.

  return (
    <div id="contenido">
      <img
        className="imgLogo"
        src="https://i.ibb.co/x7Z2cfF/winestorelogo.png"
      ></img>
      <div id="contenedor1">
        {/* Los article es necesario para poder armar el efecto de la carta que gira */}
        <article key="1" className="card">
          <img
            class="card__front"
            id="visionImg"
            src="https://i.ibb.co/qMdksps/Vision.png"
          ></img>
          <div class="card__back">
            <h3>Nuestra Vision</h3>
            <p>Vision 1</p>
            <p>Vision 2</p>
            <p>Vision 3</p>
          </div>
        </article>
        <article key="2" className="card">
          <img
            class="card__front"
            id="visionImg"
            src="https://i.ibb.co/mBGfr4L/mision.png"
          ></img>
          <div class="card__back">
            <h3>Nuestra Mision</h3>
            <p>Mision 1</p>
            <p>Mision 2</p>
            <p>Mision 3</p>
          </div>
        </article>
        <article key="3" className="card">
          <img
            class="card__front"
            id="visionImg"
            src="https://i.ibb.co/882fSvc/valores.png"
          ></img>
          <div class="card__back">
            <h3>Nuestros Valores</h3>
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
