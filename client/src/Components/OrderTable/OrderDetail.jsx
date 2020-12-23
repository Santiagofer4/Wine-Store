import React from 'react'
import './OrderDetail.modules.css';
function OrderDetail(props) {
    // props va a ser un arreglo con todas las orderLines
    return (

        <div className='OrderDetail__Container' id={props.id}>
                <ul className='OrderDetail__Ul'>
                    <li className='OrderDetail__Text' >Quantity</li>
                    <li className='OrderDetail__Text' >Price</li>
                    <li className='OrderDetail__Text' >Product name</li>
                    <li className='OrderDetail__Text' >Product price</li>
                </ul>
            { props.data.map(element =>{
            return(
                <ul className='OrderDetail__Ul'>
                <li className='OrderDetail__Text' >{element.quantity}</li>
                <li className='OrderDetail__Text' >{element.product.price * element.quantity}</li>
                <li className='OrderDetail__Text' >{element.product.name}</li>
                <li className='OrderDetail__Text' >{element.product.price}</li>

            </ul>
                )
        }) }

        </div>
    )
}
export default OrderDetail