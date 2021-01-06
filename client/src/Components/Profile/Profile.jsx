import React, { useState, useEffect } from "react";
import { Link, Paper, CircularProgress } from "@material-ui/core";
import "./Profile.modules.css";
import { useDispatch, useSelector } from "react-redux";
import {
  userOrdersStatusSelector,
  userOrdersSelector,
} from "../../selectors/index.js";
import { userOrders } from "../../slices/userSlice";
import OrderDetail from "../OrderTable/OrderDetail";

function Profile() {
  const dispatch = useDispatch();
  const orders = useSelector(userOrdersSelector);
  const status = useSelector(userOrdersStatusSelector);
  let allUserOrders;

  useEffect(() => {
    dispatch(userOrders(1));
  }, [dispatch]);

  console.log("ORDERS USER AFUERA", orders);

  if (status === "loading") {
    allUserOrders = (
      <>
        <h2>Cargando...</h2>
        <CircularProgress />
      </>
    );
  } else if (status === "succeded") {
    console.log("ORDERS USER MAP", orders);
    allUserOrders = orders.map((order) => {
      return (
        <>
          <li key={order.id} className="orders">
            <div className="order">{order.id}</div>
            <div className="order">{order.total}</div>
            <div className="order">{order.status}</div>
            <div className="order">
              {" "}
              <button>
                Detalles
              </button>
            </div>
          </li>
        </>
      );
    });
  } else if (status === "failed") {
    allUserOrders = (
      <>
        <h3>Ha ocurrido un error</h3>
      </>
    );
  }
  return (
    <Paper className="profile">
      {" "}
      <div className="bar">
        <Link className="link">Mis compras</Link>
        <Link className="link">Mi información</Link>
      </div>
      <div className="orders">
        <div className="orderTitle">Código compra</div>
        <div className="orderTitle">Total</div>
        <div className="orderTitle">Status</div>
        <div className="orderTitle">Detalle</div>
      </div>
      {allUserOrders}
    </Paper>
  );
}

export default Profile;
