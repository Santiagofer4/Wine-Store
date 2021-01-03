import React from 'react';
import { Button, Container } from '@material-ui/core';

function CartItem(props) {
  const { id, image, name, price, quantity, stock } = props.prod;
  const {
    deleteItemHandler,
    incrementHandler,
    decrementHandler,
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
                onClick={(e) => deleteItemHandler({ id, userId: 1 })}
              ></i>
            </a>
            <Button
              name={id}
              className="button"
              onClick={(e) => decrementHandler(e, price, quantity)}
            >
              -
            </Button>
            <input className="input" id={id} value={quantity}></input>
            <Button
              name={id}
              className="button"
              onClick={(e) => incrementHandler(e, price, quantity, stock)}
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
