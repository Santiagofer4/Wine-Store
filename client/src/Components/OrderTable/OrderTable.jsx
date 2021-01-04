import React, { useEffect } from 'react';
import { sliceTime, total } from '../utils.js';
import OrderDetail from './OrderDetail';
import './OrderTable.modules.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderTable } from '../../slices/orderTableSlice';
import { allOrderSelector, allOrderStatusSelector } from '../../selectors';

// Esta tabla es para el admin.
// Tiene que mostrar todas las ordenes de todos los usuarios.

function OrderTable() {
  const dispatch = useDispatch();
  const orderTable = useSelector(allOrderSelector);
  const status = useSelector(allOrderStatusSelector);

  useEffect(() => {
    dispatch(getOrderTable());
  }, [dispatch]);

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

      {status === 'succeded' &&
        orderTable.map((order) => {
          return (
            <>
              <li key={order.id} className="OrderTable__li">
                <div className="OrderTable__Text">{order.id}</div>
                <div className="OrderTable__Text">
                  {Math.ceil((total(order.orderLines) * 121) / 100)}
                </div>
                <div className="OrderTable__Text">{order.status}</div>
                <div className="OrderTable__Text">{order.userId}</div>
                <div className="OrderTable__Text">
                  {sliceTime(order.updatedAt)}
                </div>
                <div className="OrderTable__Text">
                  {' '}
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
        })}
    </div>
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

export default OrderTable;
