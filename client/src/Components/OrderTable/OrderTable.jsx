import React, { useEffect } from "react";
import { sliceTime, total } from "../utils";
import OrderDetail from "./OrderDetail";
import "./OrderTable.modules.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrderTable } from "../../slices/orderTableSlice";
import { modificateOrder } from "../../slices/productsCartSlice";
import { allOrderSelector, allOrderStatusSelector } from "../../selectors";
import { CircularProgress, Button } from "@material-ui/core";

import DoneIcon from "@material-ui/icons/Done";

// Esta tabla es para el admin.
// Tiene que mostrar todas las ordenes de todos los usuarios.

function OrderTable() {
  const dispatch = useDispatch();
  const orderTable = useSelector(allOrderSelector);
  const status = useSelector(allOrderStatusSelector);

  const orderStatus = ["created", "canceled", "pending", "completed", "cart"];

  let content;

  useEffect(() => {
    dispatch(getOrderTable());
  }, [dispatch]);

  const handleRetry = () => {
    //func para reintentar y forzar refresh
    // history.push(props.location.pathname);
    window.location.reload();
    return false;
  };

  const handleClick = (id) => {
    let element = document.getElementById("option" + id).value;
    dispatch(modificateOrder({ myCart: id, status: element }));
  };

  if (status === "loading") {
    content = (
      <>
        <h2>Cargando...</h2>
        <CircularProgress />
      </>
    );
  } else if (status === "succeded") {
    content = orderTable.map((order) => {
      return (
        <>
          <li key={order.id} className="OrderTable__li">
            <div className="OrderTable__Text">{order.id}</div>
            <div className="OrderTable__Text">
              {Math.ceil((total(order.orderLines) * 121) / 100)}
            </div>
            {/* <div className="OrderTable__Text">{order.status}</div> */}
            <select id={"option" + order.id}>
              {orderStatus.map((status) => {
                return (
                  <option
                    value={status}
                    selected={status === order.status ? true : false}
                  >
                    {status}
                  </option>
                );
              })}
            </select>
            <Button className="doneButton" onClick={() => handleClick(order.id)}>
              <DoneIcon className="done"></DoneIcon>
            </Button>
            <div className="OrderTable__Text">{order.userId}</div>
            <div className="OrderTable__Text">{sliceTime(order.updatedAt)}</div>
            <div className="OrderTable__Text">
              {" "}
              <button
                onClick={() => {
                  hide(order.id);
                }}
              >
                D
              </button>
            </div>
          </li>
          <OrderDetail id={order.id} data={order.orderLines}></OrderDetail>
        </>
      );
    });
  } else if (status === "failed") {
    content = (
      <>
        <h3>Ha ocurrido un error</h3>
        <Button onClick={handleRetry}>Reintentar</Button>
      </>
    );
  }
  return (
    <div className="OrderTable__Container">
      <li key={orderTable.id} className="OrderTable__li">
        <div className="OrderTable__index">ID</div>
        <div className="OrderTable__index">Total</div>
        <div className="OrderTable__index">Status</div>
        <div className="OrderTable__index">User Id</div>
        <div className="OrderTable__index">Fecha</div>
        <div className="OrderTable__index">Detalle</div>
      </li>

      {content}
    </div>
  );
}

function hide(id) {
  //*funcion para mostrar||ocultar el detalle de la orden
  let OrderDetail = document.getElementById(id).style.display;
  if (OrderDetail !== "inline") {
    document.getElementById(id).style.display = "inline";
  } else {
    document.getElementById(id).style.display = "none";
  }
}

export default OrderTable;
