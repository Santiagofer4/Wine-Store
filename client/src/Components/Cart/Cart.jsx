import React, { useEffect, useState } from "react";
import "./Cart.modules.css";
import { getProductsCart, deleteProductsCart, putProductCart, deleteProductCart } from "../../actions/index";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import {allProductsCartSelector, allProductsCartSyncSelector, allProductsCartStatusSelector} from '../../selectors'
import {getAllProductsCart, sync, addToCart, subtractToCart,deleteFromCart, deleteCart ,postProductsCar} from '../../slices/productsCartSlice'



// arreglar el problema de cargando
function Cart(props) {
  const dispatch= useDispatch()
  const AllProductsCart = useSelector(allProductsCartSelector)
  const sincronizar = useSelector(allProductsCartSyncSelector)
   const status = useSelector(allProductsCartStatusSelector)
  const[subTotal,setSubTotal] = useState(0)

  const handleDelete = ()=>{
    // await props.deleteProductsCart(1);
    // props.getProductsCart(1);
    dispatch(deleteCart())
  };
  window.onbeforeunload = function(e) {
    AllProductsCart.map(e =>{
      dispatch(postProductsCar( {e, userId:1}))
    })

    return 'Texto de aviso';
  };
  const handleDecrement = (e,quantity,price) => {
    let id = e.target.name *1
    dispatch(subtractToCart(id))
    //   if(document.getElementById(`${id}`).value > 1) {
  //     document.getElementById(`${id}`).value--
  //   }
  //   props.putProductCart(1, id, document.getElementById(`${id}`).value);
  //   // setSubTotal( subTotal - price)
  // };
  }
  // 4 productos a  300  = 1200 -900   

  // 3 '' a 300 = 900

function total (quantity,price){
  setSubTotal(subTotal + (quantity * price*1))
}

  const handleIncrement = (e, stock,quantity) => {
    let id = e.target.name *1;
    if( stock > quantity){
      let productDetail = { 
        id,
      }
     dispatch(addToCart({productDetail}))
    }
    // if(document.getElementById(`${id}`).value < stock) {
    //   document.getElementById(`${id}`).value++
    // }
    // props.putProductCart(1, id, document.getElementById(`${id}`).value);
    // // setSubTotal(subTotal + price *1)

  };
 

  const handlerDeleteElement = (id) => {
        // props.deleteProductCart(1, id);
        dispatch(deleteFromCart(id))
      }
  const handleConfirm = ()=>{}

  useEffect(() => {
console.log('actualizando')
    if(sincronizar === false){

      dispatch(getAllProductsCart(1))
      dispatch(sync(true))
    }
    console.log(props.productsCart.length)
    // if (props.productsCart.length === 0){
    //   return props.getProductsCart(1);
    // }else{
    //   console.log('no esta vacio')
    // }
  },[]);

   if ( status === 'succeded') {
    if (AllProductsCart.length > 0) {
      return (
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
                      <p className="ProductDescription">
                        {p.description}
                      </p>
                      <p>$ {p.price}</p>
                    </div>
                    <div className="quantity">
                      <a href="#" className='Cart__DeleteProduct'><i class="fas fa-trash-alt" onClick={(e) => handlerDeleteElement(p.id)}></i>
</a>
                      {/* <img src="https://img2.freepng.es/20180329/cke/kisspng-computer-icons-clip-art-delete-button-5abced454dbd36.6503919615223309493184.jpg" 
                       name={p.product.id}
                       className="btnEliminar"
                      onClick={(e) => handlerDeleteElement(p.product.id)}></img> */}
                    <Button 
                    name={p.id}
                    className="button" 
                    onClick={(e) => handleDecrement(e, p.quantity, p.price)}
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
                    onClick={(e) => handleIncrement(e, p.stock, p.quantity )}
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
              <p>SUBTOTAL $ {subTotal}</p>
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
    return (<h3 className='Cart__Cargando'>Cargando... </h3>);
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
