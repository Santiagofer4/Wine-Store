import React from "react";
import "./Cart.modules.css";
import { getProductsCart } from "../../actions/index";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

function Cart(props) {
  console.log("PROPS", props);
  console.log("PROPS.PRODUCTSCART", props.productsCart);

  if (props.productsCart.length !== 0) {
    let products = props.productsCart[0];
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
                  <p>{p.product.name}</p>
                  <p className="ProductDescription">{p.product.description}</p>
                  <p>$ {p.product.price}</p>
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
            <Button>Confirmar</Button>
            <Button>Cancelar</Button>
          </div>
        </div>
      </div>
    );
  }
  return <h1>Cargando...</h1>;
}

function mapStateToProps(state) {
  return {
    productsCart: state.productReducers.productsCart,
  };
}

export default connect(mapStateToProps, { getProductsCart })(Cart);
