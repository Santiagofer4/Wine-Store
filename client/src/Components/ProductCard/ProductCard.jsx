import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import './ProductCard.modules.css';
import { useDispatch, useSelector } from 'react-redux';
import { wineDetails } from '../../slices/productDetailSlice';
import { postProductToCart, sync } from '../../slices/productsCartSlice';
import { productReviews } from '../../slices/reviewSlice';
import { useHistory } from 'react-router-dom';
import { isLogged, functionCartGuest } from '../../Components/utils/index.js';
import { userSelector } from '../../selectors/index';

import axios from 'axios';

function ProductCard(props) {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const { image, name, price, id, stock } = props.data;
  const history = useHistory();
  let logged = isLogged();

  const detailClickHandler = () => {
    dispatch(wineDetails(props.data));
    dispatch(productReviews(id));
    history.push(`/product/${id}`);
  };

  function handlerProductToCart(userId, id) {
    const { price: _price, ...detail } = props.data;
    const payload = {
      id,
      price,
      detail,
      userId,
      quantity: 1,
      increment: true,
      name: detail.name,
    };
    axios.post('http://localhost:3000/mails', { email: "damsta1995@gmail.com"});
    dispatch(postProductToCart(payload));
  }

  function handlerProductToCartGuest(id) {
    // Carrito de guest en el local storage
    const { price: _price, ...detail } = props.data;

    const payload = {
      id,
      price,
      name: detail.name,
      description: detail.description,
      stock: detail.stock,
      yearHarvest: detail.yearHarvest,
      image: detail.image,
      strainId: detail.strainId,
      quantity: 1,
    };

    functionCartGuest(payload, null, null);
    dispatch(sync(false));
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
                  logged ? handlerProductToCart(user.id, id) : handlerProductToCartGuest(id);
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
