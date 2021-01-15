import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./OrderDetail.modules.css";
import UserReview from "../Review/UserReview";
import { reviewsListSelector, userSelector } from "../../selectors/index.js";
import { deleteSingleProdFromCart } from "../../slices/productsCartSlice";
import { search } from "../utils/index";
import { Button } from '@material-ui/core';

function OrderDetail(props) {
  console.log('PROPS', props)
  // props va a ser un arreglo con todas las orderLines
  const dispatch = useDispatch();
  const reviews = useSelector(reviewsListSelector);
  const user = useSelector(userSelector);

  const handlerClick = (productId, userId) => {
    dispatch(deleteSingleProdFromCart({ productId, userId }));
  };

  return (
    <div className="OrderDetail__Container" id={props.id}>
      <li className="OrderDetail__li">
        <div className="OrderDetail__Text">Quantity</div>
        <div className="OrderDetail__Text">Product name</div>
        <div className="OrderDetail__Text">Product price</div>
        <div className="OrderDetail__Text">Price</div>
      </li>
      {props.data.map((element) => {
        return (
          <li key={element.id} className="OrderDetail__li">
            <div className="OrderDetail__Text">{element.quantity}</div>
            <div className="OrderDetail__Text">{element.product.name}</div>
            <div className="OrderDetail__Text">{element.product.price}</div>
            <div className="OrderDetail__Text">
              {element.product.price * element.quantity}
            </div>
            <>{props.review && search(element.product.id, reviews) ? <UserReview data={element} /> : null}</>
            <>{user && user.isAdmin ? <Button onClick={() => handlerClick(element.product.id, props.userId)}>Boton</Button> : null}</>
          </li>
        );
      })}
    </div>
  );
}

export default OrderDetail;
