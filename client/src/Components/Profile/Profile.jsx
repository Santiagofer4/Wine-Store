import React, { useEffect } from "react";
import { Link, Paper, CircularProgress, Button } from "@material-ui/core";
import "./Profile.modules.css";
import { useDispatch, useSelector } from "react-redux";
import {
  userOrdersStatusSelector,
  userOrdersSelector,
} from "../../selectors/index.js";
import { userOrders } from "../../slices/userSlice";
import { userReviews } from "../../slices/reviewSlice";
import OrderDetail from "../OrderTable/OrderDetail";
import UserReview from '../../Components/Review/UserReview'
function Profile() {
  const dispatch = useDispatch();
  const orders = useSelector(userOrdersSelector);
  const status = useSelector(userOrdersStatusSelector);
  let allUserOrders;

  useEffect(() => {
    dispatch(userOrders(1));
    dispatch(userReviews(1));
  }, [dispatch]);

  console.log("ORDERS USER AFUERA", orders);

  if (orders.length === 0) {
    allUserOrders = (
      <h3 className="emptyOrders">
        Aún no tiene compras realizadas o pendientes
      </h3>
    );
  } else {
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
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    hide(order.id);
                  }}
                >
                  Detalle
                </Button>
              </div>
            </li>
            <OrderDetail id={order.id} data={order.orderLines} review={<UserReview data={order} />}></OrderDetail>
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

function hide(id) {
  //*funcion para mostrar||ocultar el detalle de la orden
  let OrderDetail = document.getElementById(id).style.display;
  if (OrderDetail !== 'inline') {
    document.getElementById(id).style.display = 'inline';
  } else {
    document.getElementById(id).style.display = 'none';
  }
}

export default Profile;
