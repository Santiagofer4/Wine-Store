import React, { useEffect, useState } from "react";
import "./Cart.modules.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { allProductsCartSelector, allProductsCartSyncSelector, allProductsCartStatusSelector } from '../../selectors'
import { getAllProductsCart, sync, addToCart, subtractToCart, deleteFromCart, deleteCart, postProductsCar, deleteProductCar, deleteProductsCart } from '../../slices/productsCartSlice';
import { total } from '../../Components/utils';

function Cart() {
  const dispatch = useDispatch()
  const AllProductsCart = useSelector(allProductsCartSelector)
  const sincronizar = useSelector(allProductsCartSyncSelector)
  const status = useSelector(allProductsCartStatusSelector)
  const [subTotal, setSubTotal] = useState(0)

  const handleDelete = () => {
    dispatch(deleteCart())
    dispatch(deleteProductsCart(1))
  };

 /* window.onbeforeunload = function () {
    AllProductsCart.map(e => {
      dispatch(postProductsCar({ e, userId: 1 }))
    })
    return 'Texto de aviso';
  };*/

  const handleDecrement = (event,price, quantity) => {
    let id = event.target.name * 1;
    let e = { id, quantity: quantity -1, price }
    if (quantity > 1) {
      let valueInput = document.getElementById(id).value
      if(valueInput > 1){
        dispatch(subtractToCart(id))
        dispatch(postProductsCar({ e, userId: 1 }))

      }
    }
  }

  const handleIncrement = (event,price,quantity, stock) => {
    let id = event.target.name * 1;
      let productDetail = {id,}
      let valueInput = document.getElementById(id).value;
      if(valueInput < stock){
        let e = { id, quantity: quantity +1, price }
        dispatch(addToCart({ productDetail }))
        dispatch(postProductsCar({ e, userId: 1 }))
      }
  };

  const handlerDeleteElement = (id) => {
    dispatch(deleteFromCart(id.id))
    dispatch(deleteProductCar(id))
  }

  const handleConfirm = () => { }

  useEffect(() => {
    setSubTotal(total(AllProductsCart));
    if (sincronizar === false) {
      dispatch(getAllProductsCart(1))
      dispatch(sync(true))
    }
    // AllProductsCart.map(e => { // esto se puede factorizar, usando la ruta a la api para modificar cantidades
    //   dispatch(postProductsCar({ e, userId: 1 }))
    // })
  }, [AllProductsCart]);

  if (status === 'succeded') {
    if (AllProductsCart.length > 0) {
      return (
        <div className="ShoppingCartBackImg">
        <div className="ShoppingCart">
          <div className="products">
            <h2 className="titleCart">Carrito de compras</h2>
            <hr className="line" />
            <ul>
              {AllProductsCart.map((p) => (
                <li className="productCart" key={p.id}>
                  <div>
                    <img
                      className="imageProductCart"
                      src={p.image}
                      alt="Producto sin imagen"
                    />
                  </div>
                  <div className="infoProduct">
                    <div>
                      <p>{p.name}</p>
                      <p>$ {p.price}</p>
                    </div>
                    <div className="quantity">
                      <a href="#" className='Cart__DeleteProduct'><i class="fas fa-trash-alt" onClick={(e) => handlerDeleteElement({ id: p.id, userId: 1, })}></i>
                      </a>
                      <Button
                        name={p.id}
                        className="button"
                        onClick={(e) => handleDecrement(e, p.price, p.quantity )}
                      >
                        -
                    </Button>
                      <input
                        className="input"
                        id={p.id}
                        value={p.quantity}
                      >
                      </input>
                      <Button
                        name={p.id}
                        className="button"
                        onClick={(e) => handleIncrement(e, p.price, p.quantity, p.stock)}
                      >
                        +
                    </Button>
                    </div>
                  </div>
                </li>
                
              ))}
            </ul>
          </div>
          <div className="detail">
            <h2 className="titleCart">Detalle de compra</h2>
            <hr className="line" />
            <div className="Summary">
              <p id="subtotal">SUBTOTAL $ {subTotal}</p>
              <p id="iva">IVA $ {Math.ceil(subTotal * 21 / 100)}</p>
              <hr className="line" />
              <p id="total">TOTAL $ {Math.ceil(subTotal * 121 / 100)}</p>
            </div>
            <div>
              <Button id="confirmBtn" className="buttonCart" onClick={handleConfirm}>Confirmar</Button>
              <Button id="cancelBtn" className="buttonCart" onClick={handleDelete}>Cancelar</Button>
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
    return (<h3 className='Cart__Cargando'>Cargando... </h3>);
  }
}

export default Cart;