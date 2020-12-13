import React from 'react';
import { Container, Paper, CardContent, CardActions, Card, Typography, Button, } from '@material-ui/core';
import './ProductDetail.modules.css';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { setProductDetail, setHistory } from '../../actions';

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
    categories,
  } = wineDetail;
  const classes = useStyles();

  //* EDITHANDLER, redirect a form para editar producto
  const history = useHistory();
  const editHandler = () => {
    props.setProductDetail(wineDetail); //necesario en caso que ingrese al product detail sin pasar por catalogue.
    //Actualmente no es posible, pero podria ser una opcion en el futuro
    history.push({
      pathname: `/admin/edit/${id}`,
      state: {
        edit: true,
      },
    });
  };

  return (
    <Container className="ProductDetail__Container">
      <Paper className="ProductDetail__Paper">
        <Container>
          <img src={image} alt={`imagen del vino ${name}`} />
        </Container>
        <Card className={classes.root} variant="outlined">
          <CardContent>
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
            <Button size="small">BACK</Button>
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
});

export default connect(mapStateToProps, { setProductDetail, setHistory })(
  ProductDetail
);
