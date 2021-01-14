import React, { useEffect } from 'react';
import { Link, Paper, CircularProgress, Button } from '@material-ui/core';
import './Profile.modules.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  userOrdersStatusSelector,
  userOrdersSelector,
  userSelector,
  reviewsListStatusSelector,
} from '../../selectors/index.js';
import { getUserOrders } from '../../slices/userSlice';
import { getUserReviews } from '../../slices/reviewSlice';
import OrderDetail from '../OrderTable/OrderDetail';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const orders = useSelector(userOrdersSelector);
  const userStatus = useSelector(userOrdersStatusSelector);
  const reviewStatus = useSelector(reviewsListStatusSelector);
  let allUserOrders;

  useEffect(() => {
    if (userStatus === 'idle') dispatch(getUserOrders(user.id));
    if (reviewStatus === 'idle') dispatch(getUserReviews(user.id));
  }, [dispatch]);

  if (orders.length === 0) {
    allUserOrders = (
      <h3 className="emptyOrders">
        Aún no tiene compras realizadas o pendientes
      </h3>
    );
  } else {
    if (userStatus === 'loading' || reviewStatus === 'loading') {
      allUserOrders = (
        <>
          <h2>Cargando...</h2>
          <CircularProgress />
        </>
      );
    } else if (userStatus === 'succeded' || reviewStatus === 'succeded') {
      allUserOrders = orders.map((order) => {
        return (
          <>
            <li key={order.id} className="orders">
              <div className="order">{order.id}</div>
              <div className="order">{order.total}</div>
              <div className="order">{order.status}</div>
              <div className="order">
                {' '}
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
            <OrderDetail
              id={order.id}
              data={order.orderLines}
              review={order.status === 'completed' ? true : false}
            ></OrderDetail>
          </>
        );
      });
    } else if (userStatus === 'failed' || reviewStatus === 'failed') {
      allUserOrders = (
        <>
          <h3>Ha ocurrido un error</h3>
        </>
      );
    }
  }

  return (
    <Paper className="profile">
      {' '}
      <h4 className="title">Mi información</h4>
      <div className="info">
        <p className="data">Nombre {user.firstName + ' ' + user.lastName}</p>
        <p className="data">email {user.email}</p>
        <p className="data">Fecha de nacimiento {user.birthdate}</p>
        <p className="data">Télefono/celular {user.cellphone}</p>
      </div>
      <h4 className="title">Mis compras</h4>
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
  *funcion para mostrar||ocultar el detalle de la orden
  let OrderDetail = document.getElementById(id).style.display;
  if (OrderDetail !== 'inline') {
    document.getElementById(id).style.display = 'inline';
  } else {
    document.getElementById(id).style.display = 'none';
  }
}

export default Profile;
