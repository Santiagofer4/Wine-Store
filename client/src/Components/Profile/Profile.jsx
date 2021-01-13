import React, { useEffect, useState } from "react";
import { Link, Paper, CircularProgress, Button } from "@material-ui/core";
import "./Profile.modules.css";
import { useDispatch, useSelector } from "react-redux";
import {
  userOrdersStatusSelector,
  userOrdersSelector,
  userSelector,
} from "../../selectors/index.js";
import { userOrders } from "../../slices/userSlice";
import { userReviews } from "../../slices/reviewSlice";
import OrderDetail from "../OrderTable/OrderDetail";

import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

/* 
export default function CheckboxesGroup() {

  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2; // PICK TWO

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
            label="Gilad Gray"
          />
          <FormControlLabel
            control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
            label="Jason Killian"
          />
          <FormControlLabel
            control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
      <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
            label="Gilad Gray"
          />
          <FormControlLabel
            control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
            label="Jason Killian"
          />
          <FormControlLabel
            control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl>
    </div>
  );
} */

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const orders = useSelector(userOrdersSelector);
  const status = useSelector(userOrdersStatusSelector);

  const classes = useStyles();
  const [state, setState] = useState({
    created: true,
    canceled: true,
    pending: true,
    completed: true,
    cart: true,
  });

  let allUserOrders;

  useEffect(() => {
    dispatch(userOrders(user.id));
    dispatch(userReviews(user.id));
  }, [dispatch]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { cart, canceled, completed, created, pending } = state;

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
      ); // [{status}, {}, {}]
    } else if (status === "succeded") {
     /*  let estados = [];
      for (const prop in state) {
        if(state[prop] === true) {
          estados.push(prop)
        }
      }
      console.log('ESTADOS', estados)
      console.log('ORDERS', orders)
      let filteredOrders = orders.filter(o => {
        console.log('O', o.state)
        return estados.includes(o.state)
      })
      console.log('FILTERED ORDERS', filteredOrders) */
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
            <OrderDetail
              id={order.id}
              data={order.orderLines}
              review={order.status === "completed" ? true : false}
            ></OrderDetail>
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
      <h4 className="title">Mi información</h4>
      <div className="info">
        <p className="data">Nombre {user.firstName + " " + user.lastName}</p>
        <p className="data">email {user.email}</p>
        <p className="data">Fecha de nacimiento {user.birthdate}</p>
        <p className="data">Télefono/celular {user.cellphone}</p>
      </div>
      <h4 className="title">Mis compras</h4>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">STATUS</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
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
                  checked={completed}
                  onChange={handleChange}
                  name="completed"
                />
              }
              label="Completed"
            />
          </FormGroup>
        </FormControl>
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
  if (OrderDetail !== "inline") {
    document.getElementById(id).style.display = "inline";
  } else {
    document.getElementById(id).style.display = "none";
  }
}

export default Profile;
