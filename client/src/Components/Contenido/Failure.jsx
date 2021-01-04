import React from 'react';
import { Container } from '@material-ui/core';
import './Welcome-Failure.modules.css';
import { Link } from 'react-router-dom';


function Failure() {
    return (
        <Container className="Main__content">
            <h1>Se produjo un error al realizar la accion, vuelve a intentar</h1>
            <div >
                <Link className="Post__registerLinks" to="/">Volver al inicio</Link>
                <Link className="Post__registerLinks" to="/catalogue">Catalogo</Link>
                <Link className="Post__registerLinks" to="/form/user">Registrarse</Link>
            </div>
        </Container>
    )
}

export default Failure