import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  CardContent,
  CardActions,
  Card,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import "./ProductDetail.modules.css";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { postProductToCart, sync } from "../../slices/productsCartSlice";
import {
  productDetailSelector,
  productDetailStatusSelector,
  reviewsListSelector,
  reviewsListStatusSelector,
  userSelector,
} from "../../selectors/index";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import ReviewCard from "../Review/ReviewCard";
import { average, functionCartGuest, isLogged } from "../utils/index";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ProductDetail() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const productDetail = useSelector(productDetailSelector);
  const statusProductDetail = useSelector(productDetailStatusSelector);
  const reviews = useSelector(reviewsListSelector);
  const reviewStatus = useSelector(reviewsListStatusSelector);
  const history = useHistory();
  const classes = useStyles();
  let logged = isLogged();
  //let value;

  const [value, setValue] = useState(0); // Rating traer promedio de calificación de base de datos según producto

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

  useEffect(() => {
    if (reviewStatus === "succeded" && reviews.length !== 0) {
      let rs = average(reviews);
      setValue(rs);
    }
  }, [reviewStatus]);

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
            pathname: "/catalogue",
            state: {
              edit: false,
            },
          }
    );
  };

  function handlerProductToCart(userId) {
    const payload = {
      id,
      price,
      detail: productDetail,
      quantity: 1,
      userId,
      increment: true,
    };
    dispatch(postProductToCart(payload));
  }

  function handlerProductToCartGuest(id) {
    // Carrito de guest en el local storage
    const payload = {
      id,
      price,
      name: productDetail.name,
      description: productDetail.description,
      stock: productDetail.stock,
      yearHarvest: productDetail.yearHarvest,
      image: productDetail.image,
      strainId: productDetail.strainId,
      quantity: 1,
    };

    functionCartGuest(payload, null, null);
    dispatch(sync(false));
  }

  if (reviewStatus === "loading") {
    return (
      <div className="ProductDetail__containerCargando">
          <h3>Cargando....</h3>
          <CircularProgress />
      </div>
    );
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
            <Box component="fieldset" mt={3} borderColor="transparent">
              <Rating value={value} readOnly />{" "}
              <div>{reviews.length} reviews</div>
            </Box>
          </CardContent>

          <CardActions id="buttons">
            <Button
              id="backButton"
              size="small"
              onClick={() => history.goBack()}
            >
              {" "}
              <img
                id="backButtonImage"
                src="https://static.thenounproject.com/png/251451-200.png"
                alt="backBtn"
              ></img>
              VOLVER
            </Button>
            {user && user.isAdmin ? (
              <>
                <Button size="small" onClick={editHandler}>
                  {" "}
                  <img
                    id="editImage"
                    src="https://download.tomtom.com/open/manuals/TomTom_GO_PREMIUM/html/es-mx/reordericons.png"
                    alt="editBtn"
                  ></img>
                  {/* <i class="fa fa-pencil-square-o" aria-hidden="true"></i> */}
                  EDITAR
                </Button>
              </>
            ) : null}
            {stock === 0 ? (
              <h3>No hay STOCK</h3>
            ) : (
              <Button
                id="Button__Buy"
                onClick={() => {
                  logged
                    ? handlerProductToCart(user.id)
                    : handlerProductToCartGuest(id);
                }}
              >
                Comprar
              </Button>
            )}
          </CardActions>
          {reviews.length > 0 &&
            reviews.map((review) => {
              return <ReviewCard data={review} />;
            })}
        </Card>
      </Paper>
    </Container>
  );
}

export default ProductDetail;
