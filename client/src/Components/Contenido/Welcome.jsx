import React, {useEffect} from 'react';
import { Container } from '@material-ui/core';
import './Welcome-Failure.modules.css';
import { Link } from 'react-router-dom';
import { userSelector } from '../../selectors/index';
import { useSelector, useDispatch } from 'react-redux';
import {postProductToCart, login, resetState} from '../../slices/productsCartSlice.js';
function Welcome() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(resetState())
  dispatch(login(user.id))
        let storage =  JSON.parse(localStorage.getItem('cart'));
         storage &&  storage.map( product  => {
           let obj = {
           userId: user.id,
           quantity: product.quantity,
           price: product.price,
           id: product.id,
           productId: product.id,
           detail: product,
           increment:true         
//se podria enviar otra propiedad para validar desde la api si la info es del guest y
// sumar la cantidad del guest mas la de la db   
          }
           dispatch(postProductToCart(obj))           
        })
          localStorage.removeItem('cart')

},[])


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
