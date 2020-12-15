import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import './ProductCard.modules.css';
import { connect } from 'react-redux';
import { setProductDetail } from '../../actions';
import { useHistory } from 'react-router-dom';

// Recibe props con Products.info

function ProductCard(props) {
  const { image, name, price, id, stock } = props.data;
  const history = useHistory();

  const detailClickHandler = () => {
    // console.log('CLICK CARD', props.data);
    props.setProductDetail(props.data);
    history.push(`/product/${id}`);
  };

  return (
    <Card className="ProCards_Card">
      <img
        src={image}
        id="Product__img"
        className="ProCard__img"
        alt="Imagen no encontrada"
      />
      <div className="">
        <CardContent className="ProCard__Container">
          <Typography component="h4" className="ProCard__name">
            {name}
          </Typography>
        </CardContent>
        <CardContent className="ProCard__Price">
          <Typography component="h4" className="ProCard__price">
            ${price}
          </Typography>
        </CardContent>
        <CardActions id="Button__Card">
       <div id="buttonsContainer"> {stock === 0 ? <h3>No hay STOCK</h3> :  <Button id="Button__Buy">Comprar</Button>}
      
          <Button id="Button__Info" onClick={detailClickHandler}>
            +
          </Button>
          </div>
        </CardActions>
      </div>
    </Card>
  );
}

export default connect(null, { setProductDetail })(ProductCard);

// Este componente es una tarjeta donde tiene la información básica del Producto.
// Nos va a servir para ser usado en el componente Catálogo.
