import React from 'react'
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

function Products(props) {
    const { image, name, price, description, stock, category } = props.data;
    return (
        <div>
            <img src={image} />
            <h1>{name}</h1>
            <h4>{price}</h4>
            <h4>{stock}</h4>
            <h5>{description}</h5>
            <h3>{category.map((cat) => {    //Se espera que la categorias sean un arreglo con los nombres de 
                return cat + ' '})                //la bodega, marca y cepa (abierto a cambio)
            }         
            </h3>         
            <CardActions>
                <Button>Comprar</Button>
            </CardActions>                  
        </div>
)}

//         <img src={image} className="ProCard__img" />
//         <CardContent className="ProCard__Container">
//           <Typography component="h4" className="ProCard__name">
//             {name}
//           </Typography>
//         </CardContent>
//         <CardContent className="ProCard__Container">
//           <Typography component="h4" className="ProCard__price">
//             ${price}
//           </Typography>
//         </CardContent>

// Pertenecer a una o más categorías.


export default Products