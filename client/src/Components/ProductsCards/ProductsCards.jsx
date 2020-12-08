import React from 'react'

// Recibe Props con Products.info

function ProductsCards( {image, name, price } ) {
    return (
        <div>
            <div>
                <img className='ProCard__img' src={image} alt='Imagen del Producto' ></img>
            </div>
            <div className='ProCard__Container'>
                <h4 className='ProCard__name'>{name}</h4>
            </div>
            <div className='ProCard__Container'>
                <h4 className='ProCard__price'>{price}</h4>
            </div>
            <div>
                <button>Comprar</button>
            </div>
        </div>
    )
}

export default ProductsCards

// Este componente es una tarjeta donde tiene la información básica del Producto.
// Nos va a servir para ser usado en el componente Catálogo.