import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  Grid,
  Paper,
  Button,
  Link,
  List,
  Toolbar,
  AppBar,
  Box,
  Drawer,
  CssBaseline,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { userSelector, allProductsSelector } from '../../../selectors/index';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers } from '../../../slices/userSlice';
import Usuarios from './Usuarios';
import Deposits from './Deposits';
import OrderTable from '../../OrderTable/OrderTable';
import './Dashboard.modules.css';
import AdminStrain from '../LoadCategory/AdminStrain';
import AdminCategory from '../LoadCategory/AdminCategory';
import AdminProduct from './Products';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Wine Store
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  // },
  // toolbar: {
  //   paddingRight: 24, // keep right padding when drawer closed
  // },
  // toolbarIcon: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   padding: '0 8px',
  //   ...theme.mixins.toolbar,
  // },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  //   transition: theme.transitions.create(['width', 'margin'],
  //   {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  // },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   // width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // menuButton: {
  //   marginRight: 36,
  // },
  // menuButtonHidden: {
  //   display: 'none',
  // },
  // title: {
  //   flexGrow: 1,
  // },
  // drawerPaper: {
  //   position: 'relative',
  //   whiteSpace: 'nowrap',
  //   width: drawerWidth,
  //   transition: theme.transitions.create('width', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // drawerPaperClose: {
  //   overflowX: 'hidden',
  //   transition: theme.transitions.create('width', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   width: theme.spacing(7),
  //   [theme.breakpoints.up('sm')]: {
  //     width: theme.spacing(9),
  //   },
  // },
  // appBarSpacer: theme.mixins.toolbar, //ancho del contenedor
  // content: {
  //   flexGrow: 1,
  //   height: '100vh',
  //   overflow: 'auto',
  // },
  // container: {
  //   paddingTop: theme.spacing(4),
  //   paddingBottom: theme.spacing(4),
  // },
  // paper: {
  //   // padding: theme.spacing(2),
  //   display: 'flex',
  //   overflow: 'auto',
  //   flexDirection: 'column',
  // },
  // fixedHeight: {
  //   // marginTop: '0rem',
  //   height: '90rem',
  // },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [menu, setMenu] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const products = useSelector(allProductsSelector);

  const handleOnClick = (e) => {
    setMenu(parseInt(e.target.value));
    console.log('NRO', e.target.value);
    return;
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  function getMenu(menu) {
    console.log('MENU', menu);
    switch (menu) {
      case 0:
        return <Deposits />;
      case 1:
        return <OrderTable />;
      case 2:
        return <Usuarios />;
      case 3:
        return <AdminProduct />;
      case 4:
        return <AdminCategory />;
      case 5:
        return <AdminStrain />;
      default:
        return <Deposits />;
    }
  }

  useEffect(() => {
    {
      getMenu(menu);
    }
  }, [menu]);

  return (
    <div id="dashboard">
      <Paper id="lateral">
        <Button value="0" className="list" button onClick={handleOnClick}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          Panel Admin
          {/* <ListItemText primary="Panel Admin"/> */}
        </Button>
        <Button value="1" className="list" button onClick={handleOnClick}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          Ordenes
          {/* <ListItemText id="1" primary="Ordenes" /> */}
        </Button>
        <Button value="2" className="list" button onClick={handleOnClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          Usuarios
          {/* <ListItemText primary="Usuarios" /> */}
        </Button>
        <Button value="3" className="list" button onClick={handleOnClick}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          Productos
          {/* <ListItemText primary="Productos" /> */}
        </Button>
        <Button value="4" className="list" button onClick={handleOnClick}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          Categorías
          {/* <ListItemText primary="Categorías" /> */}
        </Button>
        <Button value="5" className="list" button onClick={handleOnClick}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          Cepas
          {/*  <ListItemText primary="Cepas" /> */}
        </Button>
      </Paper>

      <div id="menu">
        <main>
          <div />
          <Container>
            <Paper>{getMenu(menu)}</Paper>

            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </div>
  );
}
