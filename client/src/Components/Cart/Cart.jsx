import React, { useEffect, useState } from 'react';
import './Cart.modules.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import {
  allProductsCartSelector,
  allProductsCartSyncSelector,
  allProductsCartStatusSelector,
  userStatusSelector,
} from '../../selectors';
import {
  getAllProductsCart,
  sync,
  cartGuest,
  postProductToCart,
  deleteAllProductsFromCart,
  deleteSingleProdFromCart,
} from '../../slices/productsCartSlice';
import CartItem from './CartItem/CartItem';
import { total, isLogged } from '../../Components/utils/index.js';

function Cart() {
  const dispatch = useDispatch();
  const AllProductsCart = useSelector(allProductsCartSelector);  // tiene los prods del cart
  const sincronizar = useSelector(allProductsCartSyncSelector);
  const status = useSelector(allProductsCartStatusSelector);
  const statusUser = useSelector(userStatusSelector);
  const [subTotal, setSubTotal] = useState(0);
  const [login, setLogin] = useState(false);

  const handleDelete = () => {
    dispatch(deleteAllProductsFromCart({ userId: 1 }));
  };

// Mismo proceso que con el increment, pero a diferencia de tener en cuenta el stock ahora reviza
// que la cantidad nunca sea inferior a 1, el increment esta en false, por lo que en la BD y en el
// store se procede a reducir la cantidad, siempre comprobando que sea >= a 1 

  const decrementHandler = (event, price, quantity) => {
    let id = event.target.name * 1;
    const payload = {                                       // orderline que se envia por post
      id,
      price,
      quantity,
      userId: 1,
      increment: false,                                     // cuando true aumenta la cantidad
    };                                                      // en BD y en el store
    if (quantity > 1) {
      let valueInput = document.getElementById(id).value;   // cantidad de productos a comprar
      if (valueInput > 1) {
        dispatch(postProductToCart(payload));               // action con post a la db 
      }                                                     // productCartSlice
    }
  };

// incrementHandler: al hacer click en el boton de + en el carro se dispara un event en el Item del
// carrito el cual lleva consigo la id del item el cual queremos aumentar, y se nos pasa por props, 
// el precio del item, la cantidad y el stock. Con la id del item buscamos su valor del numero que
// esta representando la cantidad de productos, el cual guardamos para mayor orden y endentimiento,
// ademas creamos un obj payload que hace de orderLine creado con los valores que tienen las props.
// Hecho esto, se compara el valor guardado antes con el stock, si el numero de productos supera o
// iguala el stock, entonces no aumenta el numero, ignorando la accion.
// Si hay stock suficiente entonces se envia una accion en el cual se envia un post para actualizar 
// la cantidad de items a comprar de ese producto en el carrito de la BD, para eso se utiliza el
// increment en el payload, si es true aumenta la cantidad, false, reduce, luego con lo que regresa
// de el post, en la accion se actualiza el estado, buscamos si el producto que se posteo en la BD
// esta en el store y luego se hace lo mismo que en la ruta, cambiando la cantidad en el store y
// cambiando la cantidad en el Imput del Item

  const incrementHandler = (event, price, quantity, stock) => {
    let id = event.target.name * 1;
    let valueInput = document.getElementById(id).value;      // cantidad de productos a comprar
    const payload = {                                        // orderline que se envia por post
      id,
      price,
      quantity,
      stock,
      userId: 1,
      increment: true,                                       // cuando true aumenta la cantidad 
    };                                                       // en BD y en el store
    if (valueInput < stock) {       
      dispatch(postProductToCart(payload));                  // action con post a la db 
    }                                                        // productCartSlice
  };

  const deleteItemHandler = ({ id, userId }) => {
    const payload = {                                          
      productId: id,                                         // id del producto a eliminar
      userId,                                                // id del usuario para saber de que 
    };                                                       // carrito eliminar el prod
    dispatch(deleteSingleProdFromCart(payload));    
  };

  const handleConfirm = () => {
    //agregar total para guardar
  };

  const handlers = {
    deleteItemHandler,
    incrementHandler,
    decrementHandler,
  };

  useEffect(() => {
    let logged = isLogged();

    if(!logged) {
      setLogin(false);
      // info de localStorage
      let guest = localStorage.getItem('cart');
      let guestParse = JSON.parse(guest);
      cartGuest(guestParse); //[{}, {}]
    }
    if(logged) {
      setLogin(true);
      // info de DB
      //console.log('PRODUCTOS 1', AllProductsCart)
      setSubTotal(total(AllProductsCart));
      if (sincronizar === false) {
        //console.log('PRODUCTOS 2', AllProductsCart)
        dispatch(getAllProductsCart(1));
        dispatch(sync(true));
      }
    }
    //setLogin(true);
    console.log('LOGIN', login);
  }, [AllProductsCart, sincronizar, dispatch, login]); // Dependencia login en evaluación

  if (status === 'succeded') {
    if (AllProductsCart.length > 0) {
      return (
        <div className="ShoppingCartBackImg">
          <div className="ShoppingCart">
            <div className="products">
              <h2 className="titleCart">Carrito de compras</h2>
              <hr className="line" />
               <ul>
                {AllProductsCart.map((product) => {
                  return <CartItem  key={product.id} prod={product} handlers={handlers} />;
                })}
              </ul>
            </div>
            <div className="detail">
              <h2 className="titleCart">Detalle de compra</h2>
              <hr className="line" />
              <div className="Summary">
                <p id="subtotal">SUBTOTAL $ {subTotal}</p>
                <p id="iva">IVA $ {Math.ceil((subTotal * 21) / 100)}</p>
                <hr className="line" />
                <p id="total">TOTAL $ {Math.ceil((subTotal * 121) / 100)}</p>
              </div>
              <div>
                <Button
                  id="confirmBtn"
                  className="buttonCart"
                  onClick={handleConfirm}
                >
                  Confirmar
                </Button>
                <Button
                  id="cancelBtn"
                  className="buttonCart"
                  onClick={handleDelete}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ShoppingCartEmpty">
          <h1 className="titleCart">Carrito de compras</h1>
          <hr className="lineEmpty" />
          <h2 className="titleCart">Su carrito de compras está vacío</h2>
          <img
            className="imgCartEmpty"
            src="https://i.ibb.co/NWgzJPf/botella.png"
            alt="Carrito vacío"
          />
          <p>
            <Link to="/catalogue" className="link">
              Volver al catálogo
            </Link>
          </p>
        </div>
      );
    }
  } else {
    return <h3 className="Cart__Cargando">Cargando... </h3>;
  }
}

export default Cart;