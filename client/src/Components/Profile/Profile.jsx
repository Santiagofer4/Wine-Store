import React, { useEffect, useState } from 'react';
import { Paper, CircularProgress, Button } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
import Row from '../Profile/ProfileTable';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const userStatus = useSelector(userOrdersStatusSelector);
  const orders = useSelector(userOrdersSelector);
  const reviewStatus = useSelector(reviewsListStatusSelector);
  const [state, setState] = useState({
    created: true,
    canceled: true,
    pending: true,
    completed: true,
    cart: true,
  });

  const { cart, canceled, completed, created, pending } = state;
  let allUserOrders;

  let states = [];
  for (const prop in state) {
    if (state[prop] === true) {
      states.push(prop);
    }
  }

  useEffect(() => {
    if (userStatus === 'idle') dispatch(getUserOrders(user.id));
    if (reviewStatus === 'idle') dispatch(getUserReviews(user.id));
  }, [userStatus, reviewStatus, dispatch]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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
    } else if (userStatus === 'succeded' && reviewStatus === 'succeded') {
      return (
        <Paper className="profile">
          <div className="personalInfo">
            <h4 className="title">Mi información</h4>
            <div className="info">
              <p className="data">
                Nombre {user.firstName + ' ' + user.lastName}
              </p>
              <p className="data">email {user.email}</p>
              <p className="data">Fecha de nacimiento {user.birthdate}</p>
              <p className="data">Télefono/celular {user.cellphone}</p>
            </div>
          </div>
          <h4 className="title">Mis compras</h4>
          <div className="orders">
            <FormControl>
              <FormLabel>Filtro de órdenes</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      className="checkbox"
                      checked={created}
                      onChange={handleChange}
                      name="created"
                    />
                  }
                  label="Created"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      className="checkbox"
                      checked={canceled}
                      onChange={handleChange}
                      name="canceled"
                    />
                  }
                  label="Canceled"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      className="checkbox"
                      checked={cart}
                      onChange={handleChange}
                      name="cart"
                    />
                  }
                  label="Cart"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      className="checkbox"
                      checked={pending}
                      onChange={handleChange}
                      name="pending"
                    />
                  }
                  label="Pending"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      className="checkbox"
                      checked={completed}
                      onChange={handleChange}
                      name="completed"
                    />
                  }
                  label="Completed"
                />
              </FormGroup>
            </FormControl>
            <div className="ordersInfo">
              {allUserOrders}
              <TableContainer component={Paper} className="Table__Container">
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Codigo Compra</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      (allUserOrders = orders.map((row) =>
                        states.includes(row.status) ? (
                          <Row
                            key={row.id}
                            row={row.orderLines}
                            order={row}
                            review={row.status === 'completed' ? true : false}
                          />
                        ) : null
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Paper>
      );
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
      {allUserOrders}
    </Paper>
  );
}

/* 
function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const orders = useSelector(userOrdersSelector);
  const status = useSelector(userOrdersStatusSelector);

  const [state, setState] = useState({
    created: true,
    canceled: true,
    pending: true,
    completed: true,
    cart: true,
  });

  const { cart, canceled, completed, created, pending } = state;

  let states = [];
  for (const prop in state) {
    if (state[prop] === true) {
      states.push(prop);
    }
  }

  let allUserOrders;

  useEffect(() => {
    dispatch(userOrders(user.id));
    dispatch(userReviews(user.id));
  }, [dispatch, state]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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
            <li
              key={order.id}
              className="orders"
              style={{
                display: states.includes(order.status) ? "flex" : "none",
              }}
            >
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
              review={order.status === "completed" ? true : false}
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
      <FormControl>
        <FormLabel>Filtro de órdenes</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                className="checkbox"
                checked={created}
                onChange={handleChange}
                name="created"
              />
            }
            label="Created"
          />
          <FormControlLabel
            control={
              <Checkbox
                className="checkbox"
                checked={canceled}
                onChange={handleChange}
                name="canceled"
              />
            }
            label="Canceled"
          />
          <FormControlLabel
            control={
              <Checkbox
                className="checkbox"
                checked={cart}
                onChange={handleChange}
                name="cart"
              />
            }
            label="Cart"
          />
          <FormControlLabel
            control={
              <Checkbox
                className="checkbox"
                checked={pending}
                onChange={handleChange}
                name="pending"
              />
            }
            label="Pending"
          />
          <FormControlLabel
            control={
              <Checkbox
                className="checkbox"
                checked={completed}
                onChange={handleChange}
                name="completed"
              />
            }
            label="Completed"
          />
        </FormGroup>
      </FormControl>
      <div className="container">
        <h4 className="title">Mi información</h4>
        <div className="info">
          <p className="data">Nombre {user.firstName + " " + user.lastName}</p>
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
      </div>
    </Paper>
  );
}

function hide(id) {
  *funcion para mostrar||ocultar el detalle de la orden
  let OrderDetail = document.getElementById(id).style.display;
  if (OrderDetail !== "inline") {
    document.getElementById(id).style.display = "inline";
  } else {
    document.getElementById(id).style.display = "none";
  }
}

export default Profile;
 */
