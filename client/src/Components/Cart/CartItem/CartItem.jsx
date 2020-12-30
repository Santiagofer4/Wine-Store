import React from 'react';
import { Button, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  deleteCart,
  postProductsCar,
  subtractToCart,
  deleteProductCar,
} from '../../../slices/productsCartSlice';

function CartItem(props) {
  const dispatch = useDispatch();
  const { id, image, name, price, quantity, stock } = props.prod;
  const {
    handlerDeleteElement,
    handleIncrement,
    handleDecrement,
  } = props.handlers;

  return (
    <Container>
      <li className="productCart" key={id}>
        <div>
          <img
            className="imageProductCart"
            src={image}
            alt="Producto sin imagen"
          />
        </div>
        <div className="infoProduct">
          <div>
            <p>{name}</p>
            <p>$ {price}</p>
          </div>
          <div className="quantity">
            <a href="#" className="Cart__DeleteProduct">
              <i
                class="fas fa-trash-alt"
                onClick={(e) => handlerDeleteElement({ id, userId: 1 })}
              ></i>
            </a>
            <Button
              name={id}
              className="button"
              onClick={(e) => handleDecrement(e, price, quantity)}
            >
              -
            </Button>
            <input className="input" id={id} value={quantity}></input>
            <Button
              name={id}
              className="button"
              onClick={(e) => handleIncrement(e, price, quantity, stock)}
            >
              +
            </Button>
          </div>
        </div>
      </li>
    </Container>
  );
}

export default CartItem;
