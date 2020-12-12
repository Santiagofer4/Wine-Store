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
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

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

function ProductDetail({
  wineDetail: { name, price, yearHarvest, description, image, categories },
}) {
  //   console.log('DETALLE', props.wineDetail);
  const classes = useStyles();
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
          </CardActions>
        </Card>
      </Paper>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  wineDetail: state.productReducers.wineDetail,
});

export default connect(mapStateToProps)(ProductDetail);
