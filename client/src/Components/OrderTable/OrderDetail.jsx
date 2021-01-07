import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./OrderDetail.modules.css";
import UserReview from "../Review/UserReview";
import { reviewsListSelector } from "../../selectors/index.js";
import { search } from "../utils/index";

function OrderDetail(props) {
  // props va a ser un arreglo con todas las orderLines
  const reviews = useSelector(reviewsListSelector);

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
          </li>
        );
      })}
    </div>
  );
}

export default OrderDetail;
