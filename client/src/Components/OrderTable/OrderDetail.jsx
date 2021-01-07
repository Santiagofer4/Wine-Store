import React from 'react'
import './OrderDetail.modules.css';

function OrderDetail(props) {
    // props va a ser un arreglo con todas las orderLines
    return (

        <div className='OrderDetail__Container' id={props.id}>
                <li className='OrderDetail__li'>
                    <div className='OrderDetail__Text' >Quantity</div>
                    <div className='OrderDetail__Text' >Product name</div>
                    <div className='OrderDetail__Text' >Product price</div>
                    <div className='OrderDetail__Text' >Price</div>
                </li>
            { props.data.map(element =>{
            return(
                <li key={element.id} className='OrderDetail__li'>
                    <div className='OrderDetail__Text' >{element.quantity}</div>
                    <div className='OrderDetail__Text' >{element.product.name}</div>
                    <div className='OrderDetail__Text' >{element.product.price}</div>
                    <div className='OrderDetail__Text' >{element.product.price * element.quantity}</div>
                    <>{props.review ? props.review : null}</>
                </li>
                )
        }) }
        </div>
    )
}

export default OrderDetail