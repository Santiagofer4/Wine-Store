import React, { useEffect, useState } from "react";
import "./Cart.modules.css";
import { getProductsCart, deleteProductsCart, putProductCart, deleteProductCart } from "../../actions/index";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

function Cart(props) {

  console.log("PROPS.PRODUCTSCART", props.productsCart);

  const handleDelete = async () => {
    await props.deleteProductsCart(1);
    props.getProductsCart(1);
  };

  const handleConfirm = () => {};

  const handleDecrement = (e) => {
    let id = e.target.name;

    if(document.getElementById(`${id}`).value > 1) {
      document.getElementById(`${id}`).value--
    }
    props.putProductCart(1, id, document.getElementById(`${id}`).value);
  };

  const handleIncrement = (e, stock) => {
    let id = e.target.name;

    if(document.getElementById(`${id}`).value < stock) {
      document.getElementById(`${id}`).value++
    }
    props.putProductCart(1, id, document.getElementById(`${id}`).value);
  };

  const handlerDeleteElement = (id) => {
    
    console.log("anda el botón", id)
    props.deleteProductCart(1, id);
    
    //hacer la acción delete y pasarle el id
  }

  useEffect(() => {
    props.getProductsCart(1);
    console.log('Productos', props.productsCart)
  }, []);

  if (props.productsCart.length > 0) {
    let products = props.productsCart[0];
    if (products.orderLines.length > 0) {
      return (
        <div className="ShoppingCart">
          <div className="products">
            <h2 className="titleCart">Carrito de compras</h2>
            <hr className="line" />
            <ul>
              {products.orderLines.map((p) => (
                <li className="productCart" key={p.product.id}>
                  <div>
                    <img
                      className="imageProductCart"
                      src={p.product.image}
                      alt="Producto sin imagen"
                    />
                  </div>
                  <div className="infoProduct">
                    <div>
                      <p>{p.product.name}</p>
                      <p className="ProductDescription">
                        {p.product.description}
                      </p>
                      <p>$ {p.product.price}</p>
                    </div>
                    <div className="quantity">
                      <img src="https://img2.freepng.es/20180329/cke/kisspng-computer-icons-clip-art-delete-button-5abced454dbd36.6503919615223309493184.jpg" 
                       name={p.product.id}
                       className="btnEliminar"
                      onClick={() => handlerDeleteElement(p.product.id)}></img>
                    <Button 
                    name={p.product.id}
                    className="button" 
                    onClick={(e) => handleDecrement(e)}
                    >
                    -
                    </Button>
                    <input 
                    className="input"
                    id={p.product.id}
                    value={p.quantity}
                    >
                    </input>
                    <Button 
                    name={p.product.id}
                    className="button"
                    onClick={(e) => handleIncrement(e, p.product.stock)}
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
              <p>SUBTOTAL $ {products.total}</p>
              <p>ENVÍO $</p>
              <hr className="line" />
              <p>TOTAL $</p>
            </div>
            <div>
              <Button className="buttonCart" onClick={handleConfirm}>Confirmar</Button>
              <Button className="buttonCart" onClick={handleDelete}>Cancelar</Button>
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
    return <h3>Cargando...</h3>;
  }
}

function mapStateToProps(state) {
  return {
    productsCart: state.productReducers.productsCart,
  };
}

export default connect(mapStateToProps, {
  getProductsCart,
  deleteProductsCart,
  putProductCart,
  deleteProductCart
})(Cart);
