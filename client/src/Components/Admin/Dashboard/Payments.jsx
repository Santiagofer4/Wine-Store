import React, { useEffect, useState } from "react";
import { Paper, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { myCartSelector, allProductsCartSelector } from "../../../selectors";
import "./Payments.modules.css";

export default function Payments() {
  const history = useHistory();
  const orderDetails = useSelector(allProductsCartSelector);
  const orderId = useSelector(myCartSelector);

  const handleOnClick = (e) => {
    e.target.name === "checkout"
      ? history.push("/checkout")
      : axios
          .post("http://localhost:3000/mercadopago", { orderDetails, orderId })
          .then((payload) => {
            console.log('payload', payload.data.init_point)
            window.location.replace(payload.data.init_point);
          })
          .catch((err) => console.error(err));
  };

    return (
      <Paper className="pagos">
        <Button
          name="checkout"
          className="debitoCredito"
          button
          onClick={handleOnClick}
        >
          <img
            className="Payments__image"
            src="data:image/jpeg;base64,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"
            alt="otrosMedios"
          />
        </Button>
        <Button
          name="mercadopago"
          className="mercadoPago"
          button
          onClick={handleOnClick}
        >
          <img
            className="Payments__image"
            src="https://i.ibb.co/ZG4Kf5c/Mercado-Pago.jpg"
            alt="mercadoPago"
          />
        </Button>
      </Paper>
    );
}