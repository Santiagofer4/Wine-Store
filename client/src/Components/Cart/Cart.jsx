import React, { useEffect, useState } from "react";
import "./Cart.modules.css";
import { getProductsCart, deleteProductsCart } from "../../actions/index";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

function Cart(props) {

  console.log("PROPS.PRODUCTSCART", props.productsCart);

  const handleDelete = async () => {
    await props.deleteProductsCart();
    props.getProductsCart();
  };

  const handleConfirm = () => {};

  const handleClick = () => {};

  const handleDecrement = () => {};

  useEffect(() => {
    props.getProductsCart();
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
                      <p className="subtotal">
                        Subtotal $ {p.quantity * p.product.price}
                      </p>
                    </div>
                    <div className="quantity">
                    <Button className="button" onClick={handleDecrement}>-</Button>
                    {p.quantity}
                    <Button className="button" onClick={handleClick}>+</Button>
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
})(Cart);
