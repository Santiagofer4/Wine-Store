import React from 'react';
import { Container, Paper, CardContent, CardActions, Card, Typography, Button, } from '@material-ui/core';
import './ProductDetail.modules.css';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { setProductDetail, setHistory, getCatsOfProduct, addProductCart,putProductCart } from '../../actions';
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

function ProductDetail({ wineDetail, ...props }) {
  const {
    id,
    name,
    price,
    yearHarvest,
    description,
    image,
    stock,
    categories,
  } = wineDetail;
  const classes = useStyles();

  //* EDITHANDLER, redirect a form para editar producto
  const history = useHistory();
  const editHandler = () => {
    props.setProductDetail(wineDetail); //necesario en caso que ingrese al product detail sin pasar por catalogue.
    //Actualmente no es posible, pero podria ser una opcion en el futuro
    props.getCatsOfProduct(id);

    history.push({
      pathname: `/admin/edit/${id}`,
      state: {
        edit: true,
      },
    });
  };

  
  // const handleIncrement = (e, stock) => {
  //   let id = e.target.name;

  //   if(document.getElementById(`${id}`).value < stock) {
  //     document.getElementById(`${id}`).value++
  //   }
  //   props.putProductCart(1, id, document.getElementById(`${id}`).value);
  // };

// esta funcion debe ser refactorizada 
  function handlerProductToCart(userId, id, price,) {
    if(props.productsCart[0] !== undefined){//entro a la funcion
     if(props.productsCart[0].orderLines !== undefined){//cuando el estado tiene algo
       if(props.productsCart[0].orderLines.length > 0){//cuando el estado tiene un orderLine y tiene datos
          let products = props.productsCart[0].orderLines;
          for (let i = 0; i < products.length; i++) {
            if (products[i].productId === id) {
              if(products[i].quantity <= products[i].product.stock){
                props.putProductCart(1, id, products[i].quantity + 1);
                return i = products.length
              }
            } else if (i === products.length - 1) {
              props.addProductCart(userId, id, price) 
            }
          }
        }else{
          props.addProductCart(userId, id, price) //cuando la orderLine no tiene datos
        }

     }   
    } else {
      props.addProductCart(userId, id, price) //cuando el estado es undefined/ esta vacio
    }
  }



  return (
    <Container className="ProductDetail__Container">
      <Paper className="ProductDetail__Paper">
        <Container>
          <img id='prodImg' src={image} alt={`imagen del vino ${name}`} />
        </Container>
        <Card className={classes.root} variant="outlined">
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
          <CardActions>
            <Button size="small" onClick={() => history.goBack()} >BACK</Button>
            {stock === 0 ? <h3>No hay STOCK</h3> : <Button id="Button__Buy" onClick={() => handlerProductToCart(1, id, price)}>Comprar</Button>}
            <Button size="small" onClick={editHandler}>
              EDIT
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  wineDetail: state.productReducers.wineDetail,
  productsCart: state.productReducers.productsCart
});

export default connect(mapStateToProps, {
  setProductDetail,
  setHistory,
  getCatsOfProduct,
  addProductCart,
  putProductCart
})(ProductDetail);
