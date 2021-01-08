import React from 'react';
import { Container } from '@material-ui/core';
import './Welcome-Failure.modules.css';
import { Link } from 'react-router-dom';
import { userSelector } from '../../selectors/index';
import { useSelector } from 'react-redux';
function Welcome() {
  const user = useSelector(userSelector);
  return (
    <Container className="Main__content">
      <h1> {user.firstName} Has sido registrado exitosamente</h1>

      <div>
        <Link className="Post__registerLinks" to="/">
          Volver al inicio
        </Link>
        <Link className="Post__registerLinks" to="/catalogue">
          Catalogo
        </Link>
        <Link className="Post__registerLinks" to="/user/profile">
          Profile
        </Link>
      </div>
    </Container>
  );
}

export default Welcome;
