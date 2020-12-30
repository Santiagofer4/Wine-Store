import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import './ProductCard.modules.css';
import { useDispatch } from 'react-redux';
import { wineDetails } from '../../slices/productDetailSlice';
import { addToCart, postProductsCar } from '../../slices/productsCartSlice';
import { useHistory } from 'react-router-dom';

function ProductCard(props) {
  const dispatch = useDispatch();
  const { image, name, price, id, stock } = props.data;
  const history = useHistory();

  const detailClickHandler = () => {
    dispatch(wineDetails(props.data));
    history.push(`/product/${id}`);
  };

  // refactorizar esta funcion
  function handlerProductToCart(userId, id, price) {
    let productDetail = { image, name, price, id, stock, quantity: 1 };
    dispatch(addToCart({ userId, productDetail }));
    let e = productDetail;
    dispatch(postProductsCar({ e, userId }));
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
            {stock === 0 ? (
              <h3>No hay STOCK</h3>
            ) : (
              <Button
                id="Button__Buy"
                onClick={() => {
                  handlerProductToCart(1, id, price);
                }}
              >
                Comprar
              </Button>
            )}
            <Button id="Button__Info" onClick={detailClickHandler}>
              <i className="fa fa-plus-square" aria-hidden="true"></i>
            </Button>
          </div>
        </CardActions>
      </div>
    </Card>
  );
}
export default ProductCard;
