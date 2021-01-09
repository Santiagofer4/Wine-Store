import React, {useEffect} from 'react';
import { Container } from '@material-ui/core';
import './Welcome-Failure.modules.css';
import { Link } from 'react-router-dom';
import { userSelector } from '../../selectors/index';
import { useSelector, useDispatch } from 'react-redux';
import {postProductToCart, login} from '../../slices/productsCartSlice.js'
function Welcome() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(()=>{
  dispatch(login(user.id))
  // const { userId, detail, increment } = payload;

        let storage =  JSON.parse(localStorage.getItem('cart'));
        console.log( 'datos storage',storage)
         storage &&  storage.map( product  => {
           let obj = {
           userId: user.id,
           quantity: product.quantity,
           price: product.price,
           id: product.id,
           detail: product,
           increment:true            
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
