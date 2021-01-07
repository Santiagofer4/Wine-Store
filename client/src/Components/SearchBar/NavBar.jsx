import React, { useEffect, useState, useRef } from "react";
import SearchBar from "./SearchBar.jsx";
import "./NavBar.modules.css";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../slices/productSlice";
import { getAllCategories } from "../../slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { userSelector, userStatusSelector } from "../../selectors/index.js";
import axios from "axios";
function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const status = useSelector(userStatusSelector);
  const [logged, setLogin] = useState(false);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);

  useEffect(() => {
    if (status === "succeded") {
      setLogin(true);
    }
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [user, open]);

  return (
    <div>
      <nav className="Nav">
        <ul className="Nav__ul">
          <li className="Nav__li">
            {" "}
            <Link to="/" className="Nav__Link">
              Home
            </Link>
          </li>
          <li className="Nav__li">
            {" "}
            <Link
              to="/catalogue"
              className="Nav__Link"
              onClick={() => {
                dispatch(getAllProducts()); // ! Al que comenta esto le corto las manos xD
                dispatch(getAllCategories());
              }}
            >
              Catalogo
            </Link>
          </li>
          <li className="Nav__li">
            <Button
              className="Nav__Link"
              onClick={() => {
                let config = {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                };
                axios
                  .get('http://localhost:3000/auth/test')
                  .then((x) => console.log('XXX', x))
                  .catch((err) => console.error(err));
              }}
            >
              HEADERS
            </Button>
          </li>
          <li className="Nav__li">
            {" "}
            <Link to="/admin" className="Nav__Link" id="invisible">
              Admin
            </Link>
          </li>
        </ul>
        <div id="search-cart">
          <div>
            <SearchBar id="searchbar"></SearchBar>
          </div>
          <Grid
            className="avatar"
            container
            justify="center"
            alignItems="center"
          >
            <Button
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Avatar>
                {logged
                  ? user.firstName.charAt(0) + user.lastName.charAt(0)
                  : "?"}
              </Avatar>
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        {logged ? (
                          <>
                            {" "}
                            <MenuItem onClick={handleClose}>
                              Ingresado como
                              <br></br>
                              {user.firstName + " " + user.lastName}
                            </MenuItem>
                            <hr className="line"></hr>
                            {user.isAdmin ? (
                              <>
                                <MenuItem onClick={handleClose}>
                                  <Link to="/admin" className="menu">
                                    Panel admin
                                  </Link>
                                </MenuItem>
                              </>
                            ) : null}
                            <MenuItem onClick={handleClose}>
                              <Link to="/user/profile" className="menu">
                                Mi cuenta
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              <Link to="/form/user/logout" className="menu">
                                Cerrar sesión
                              </Link>
                            </MenuItem>{" "}
                          </>
                        ) : (
                          <>
                            {" "}
                            <MenuItem onClick={handleClose}>
                              <Link to="/form/user/login" className="menu">
                                Ingresar
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              <Link to="/form/user" className="menu">
                                Regístrate
                              </Link>
                            </MenuItem>{" "}
                          </>
                        )}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
          <div id="cartDiv">
            <Link id="cart" to="/cart" className="Nav__Link">
              <img
                id="imgCart"
                src="https://i.ibb.co/FsngVZ5/carrito1.png"
                alt="Carrito"
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
