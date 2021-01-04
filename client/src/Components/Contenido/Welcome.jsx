import React from 'react';
import { Container } from '@material-ui/core';
import './Welcome-Failure.modules.css';
import { Link } from 'react-router-dom';


function Welcome() {
    return (
        <Container className="Main__content">
            <h1>Has sido registrado exitosamente</h1>
            <div >
                <Link className="Post__registerLinks" to="/">Volver al inicio</Link>
                <Link className="Post__registerLinks" to="/catalogue">Catalogo</Link>
            </div>
        </Container>
    )
}

export default Welcome

