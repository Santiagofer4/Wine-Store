import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import './ProductCard.modules.css';
import { connect } from 'react-redux';
import { setProductDetail,   addProductCart, putProductCart } from '../../actions';
import { useHistory } from 'react-router-dom';

// Recibe props con Products.info

function ProductCard(props) {
  const { image, name, price, id, stock } = props.data;
  const history = useHistory();

  const detailClickHandler = () => {
    // console.log('CLICK CARD', props.data);
    props.setProductDetail(props.data);
    history.push(`/product/${id}`);
  };
  // refactorizar esta funcion
  function handlerProductToCart(userId, id, price,) {
    if(props.productsCart[0] !== undefined){//entro a la funcion
     if(props.productsCart[0].orderLines !== undefined){//cuando el estado tiene algo
       if(props.productsCart[0].orderLines.length > 0){//cuando el estado tiene un orderLine y tiene datos
          let products = props.productsCart[0].orderLines;
          for (let i = 0; i < products.length; i++) {
            if (products[i].productId === id) {
              if(products[i].quantity <= products[i].product.stock){
                props.putProductCart(1, id, products[i].quantity + 1);
                return i = products.length
              }
            } else if (i === products.length - 1) {
              props.addProductCart(userId, id, price) 
            }
          }
        }else{
          props.addProductCart(userId, id, price) //cuando la orderLine no tiene datos
        }

     }   
    } else {
      props.addProductCart(userId, id, price) //cuando el estado es undefined/ esta vacio
    }
  }

  return (
    <Card className="ProCards_Card">
      <img
        src={image}
        id="Product__img"
        className="ProCard__img"
        alt="Imagen no encontrada"
      />
      <div className="">
        <CardContent className="ProCard__Container">
          <Typography component="h4" className="ProCard__name">
            {name}
          </Typography>
        </CardContent>
        <CardContent className="ProCard__Price">
          <Typography component="h4" className="ProCard__price">
            ${price}
          </Typography>
        </CardContent>
        <CardActions id="Button__Card">
          <div id="buttonsContainer">
            {stock === 0
              ?
              <h3>No hay STOCK</h3>
              :
              <Button id="Button__Buy" onClick={()=>{handlerProductToCart(1,id,price)}}>Comprar</Button>}
          
              <Button id="Button__Info" onClick={detailClickHandler}>
                +
          </Button>
           
          </div>
        </CardActions>
      </div>
    </Card>
  );
}
const mapStateToProps = (state) => ({
  productsCart: state.productReducers.productsCart
});
export default connect(mapStateToProps, { setProductDetail,addProductCart, putProductCart })(ProductCard);
// Este componente es una tarjeta donde tiene la información básica del Producto.
// Nos va a servir para ser usado en el componente Catálogo.
