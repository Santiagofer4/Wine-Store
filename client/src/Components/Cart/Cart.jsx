import React, { useEffect, useState } from 'react';
import './Cart.modules.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {
  allProductsCartSelector,
  allProductsCartSyncSelector,
  allProductsCartStatusSelector,
  userStatusSelector,
  userSelector,
  myCartSelector,
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
import {
  total,
  isLogged,
  functionCartGuest,
} from '../../Components/utils/index.js';
import axios from 'axios';

function Cart() {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const history = useHistory();
  const AllProductsCart = useSelector(allProductsCartSelector);  // tiene los prods del cart
=======
  const AllProductsCart = useSelector(allProductsCartSelector); // tiene los prods del cart
>>>>>>> b7bfb9033387a9c49073beebbc902b8ae3aae4cc
  const sincronizar = useSelector(allProductsCartSyncSelector);
  const status = useSelector(allProductsCartStatusSelector);
  const user = useSelector(userSelector);
  const myCart = useSelector(myCartSelector);
  const statusUser = useSelector(userStatusSelector);
  const [subTotal, setSubTotal] = useState(0);
  const [login, setLogin] = useState(false);
  let logged = isLogged();

  const handleDelete = () => {
<<<<<<< HEAD
    if(login){
=======
    if (login) {
>>>>>>> b7bfb9033387a9c49073beebbc902b8ae3aae4cc
      dispatch(deleteAllProductsFromCart({ userId: user.id }));
      dispatch(sync(false));
    }
<<<<<<< HEAD
    if(!login){
      let storage = [];
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(storage));
        dispatch(sync(false));
=======
    if (!login) {
      let storage = [];
      localStorage.removeItem('cart');
      localStorage.setItem('cart', JSON.stringify(storage));
      dispatch(sync(false));
>>>>>>> b7bfb9033387a9c49073beebbc902b8ae3aae4cc
    }
  };

  // Mismo proceso que con el increment, pero a diferencia de tener en cuenta el stock ahora reviza
  // que la cantidad nunca sea inferior a 1, el increment esta en false, por lo que en la BD y en el
  // store se procede a reducir la cantidad, siempre comprobando que sea >= a 1

  const decrementHandler = (event, detail) => {
    if (logged) {
      let id = event.target.name * 1;
      const payload = {
        // orderline que se envia por post
        id: detail.id,
        price: detail.price,
        quantity: detail.quantity,
        detail,
        userId: user.id,
        orderId: detail.orderId,
        increment: false, // cuando true aumenta la cantidad
      }; // en BD y en el store
      if (detail.quantity > 1) {
        let valueInput = document.getElementById(id).value; // cantidad de productos a comprar
        if (valueInput > 1) {
          dispatch(postProductToCart(payload)); // action con post a la db
        } // productCartSlice
      }
    }

    if (!logged) {
      //funciona pero no renderiza.
      let id = event.target.name * 1;
      const payload = {
        name: detail.name,
        id: detail.id,
        price: detail.price,
        quantity: detail.quantity,
        orderId: detail.orderId,
        //  userId: user.id,
      };
      if (detail.quantity > 1) {
        dispatch(sync(false));
        let valueInput = document.getElementById(id).value;
        if (valueInput > 1) {
          functionCartGuest(payload, true);
        }
      }
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

  const incrementHandler = (event, detail) => {
    if (logged) {
      console.log('Está logueado? dentro increment handler con log', logged);
      let id = event.target.name * 1;
      let valueInput = document.getElementById(id).value; // cantidad de productos a comprar
      const payload = {
        // orderline que se envia por post
        id: detail.id,
        price: detail.price,
        quantity: detail.quantity,
        detail,
        userId: user.id,
        increment: true, // cuando true aumenta la cantidad
      }; // en BD y en el store
      if (valueInput < detail.stock) {
        dispatch(postProductToCart(payload)); // action con post a la db
      } // productCartSlice
    }

    if (!logged) {
      //funciona pero no renderiza.
      console.log('Está logueado? dentro increment handler sin log', logged);
      let id = event.target.name * 1;
      let valueInput = document.getElementById(id).value;
      const payload = {
        id: detail.id,
        price: detail.price,
        quantity: detail.quantity,
        stock: detail.stock,
        name: detail.name,
        //userId: user.id,
      };
      if (valueInput < detail.stock) {
        functionCartGuest(payload);
        dispatch(sync(false));
      }
    }
  };

  const deleteItemHandler = ({ id, userId }) => {
    if (logged){
      const payload = {                                          
        productId: id,                                         // id del producto a eliminar
        userId,                                                // id del usuario para saber de que 
      };                                                       // carrito eliminar el prod
      dispatch(deleteSingleProdFromCart(payload));    
    }
    if (!logged){
      const payload = id;                                          
       functionCartGuest(payload, null, true)                                             
       dispatch(sync(false))
    }
  };

/*   const handleDelete = () => {
    if(login){
      dispatch(deleteAllProductsFromCart({ userId: user.id }));
      dispatch(sync(false));
    }
    if(!login) {
      let storage = [];
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(storage));
        dispatch(sync(false));
    }
  }; */

  const handleConfirm = async () => {
   // console.log('ORDER NRO?', myCart)
   if(login) {
     let total = Math.ceil((subTotal * 121) / 100);
     axios.put(`http://localhost:3000/orders/${myCart}`, { total, status: 'completed' });
     dispatch(sync(false));
   }
   if(!login) {
    history.push('/login');
   }
    //agregar total para guardar
  };

  const handlers = {
    deleteItemHandler,
    incrementHandler,
    decrementHandler,
  };

  useEffect(() => {
    logged = isLogged();
    console.log('SINCRONIZAR 1', sincronizar)

    if (user) {
      if (logged) {
        setLogin(true);
        console.log('SINCRONIZAR 2', sincronizar)
        // info de DB
        setSubTotal(total(AllProductsCart));
        if (sincronizar === false) {
          dispatch(getAllProductsCart(user.id));
          dispatch(sync(true));
          console.log('SINCRONIZAR 3', sincronizar)
        }
      }
    } else {
      if (!logged) {
        setLogin(false);
        console.log('SINCRONIZAR 4', sincronizar)
        // info de localStorage
        let guest = localStorage.getItem('cart');
        let guestParse = JSON.parse(guest);
        setSubTotal(total(AllProductsCart));
        dispatch(cartGuest(guestParse));
<<<<<<< HEAD
        if (sincronizar === false){
          dispatch(sync(true))
          console.log('SINCRONIZAR 5', sincronizar)
=======
        if (sincronizar === false) {
          dispatch(sync(true));
>>>>>>> b7bfb9033387a9c49073beebbc902b8ae3aae4cc
        }
        setSubTotal(total(AllProductsCart));
      }
    }
    console.log('SINCRONIZAR 6', sincronizar)
  }, [status, sincronizar, user, AllProductsCart.orderId]);

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
                  return (
                    <CartItem
                      key={product && product.id}
                      prod={product}
                      handlers={handlers}
                    />
                  );
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
