import React from 'react';
import { Container } from '@material-ui/core';
import './notFound.modules.css';

function notFound() {
  return (
    <Container className="notFound">
      <h1>Pagina no encontrada</h1>
      <h2>Aca estaria bueno agregar alguna imagen</h2>
    </Container>
  );
}

export default notFound;
