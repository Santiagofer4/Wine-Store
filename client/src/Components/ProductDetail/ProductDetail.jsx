import React from 'react';
import {
  Container,
  Paper,
  CardContent,
  CardActions,
  Card,
  Typography,
  Button,
} from '@material-ui/core';
import './ProductDetail.modules.css';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { wineDetails } from '../../slices/productDetailSlice';
import { addToCart, postProductsCar } from '../../slices/productsCartSlice';
import { getAllCatsOfProduct } from '../../slices/categorySlice';
import { productDetailSelector } from '../../selectors/index';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ProductDetail() {
  const productDetail = useSelector(productDetailSelector);
  const dispatch = useDispatch();

  const history = useHistory();
  const classes = useStyles();

  const {
    id,
    name,
    price,
    yearHarvest,
    description,
    image,
    stock,
    categories,
  } = productDetail;
  //* EDITHANDLER, redirect a form para editar producto
  const editHandler = () => {
    // dispatch(wineDetails(productDetail));
    // props.setProductDetail(wineDetail); //necesario en caso que ingrese al product detail sin pasar por catalogue.
    //Actualmente no es posible, pero podria ser una opcion en el futuro
    // dispatch(getAllCatsOfProduct(id));
    history.push(
      id
        ? {
            pathname: `/admin/edit/${id}`,
            state: {
              edit: true,
            },
          }
        : {
            pathname: '/catalogue',
            state: {
              edit: false,
            },
          }
    );
  };

  // esta funcion debe ser refactorizada
  function handlerProductToCart(userId) {
    dispatch(addToCart({ userId, productDetail }));
    let e = { id, price, quantity: 1 };
    dispatch(postProductsCar({ e, userId: 1 }));
  }

  return (
    <Container id="pageContainer" className="ProductDetail__Container">
      <Paper id="paper" className="ProductDetail__Paper">
        <Container id="imgContainer">
          <img id="prodImg" src={image} alt={`imagen del vino ${name}`} />
        </Container>
        <Card id="detailsContainer" className={classes.root} variant="outlined">
          <CardContent className="ProdDetail__CardText">
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {yearHarvest}
            </Typography>
            <Typography variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="h5" component="h2">
              Codigo #{id}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {categories}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              $ {price}
            </Typography>
            <Typography variant="body2" component="p">
              {description}
            </Typography>
          </CardContent>

          <CardActions id="buttons">
            <Button
              id="backButton"
              size="small"
              onClick={() => history.goBack()}
            >
              {' '}
              <img
                id="backButtonImage"
                src="https://static.thenounproject.com/png/251451-200.png"
                alt="backBtn"
              ></img>
              VOLVER
            </Button>
            <Button size="small" onClick={editHandler}>
              {' '}
              <img
                id="editImage"
                src="https://download.tomtom.com/open/manuals/TomTom_GO_PREMIUM/html/es-mx/reordericons.png"
                alt="editBtn"
              ></img>
              {/* <i class="fa fa-pencil-square-o" aria-hidden="true"></i> */}
              EDITAR
            </Button>
            {stock === 0 ? (
              <h3>No hay STOCK</h3>
            ) : (
              <Button
                id="Button__Buy"
                onClick={() => {
                  handlerProductToCart(1);
                }}
              >
                Comprar
              </Button>
            )}
          </CardActions>
        </Card>
      </Paper>
    </Container>
  );
}

export default ProductDetail;
