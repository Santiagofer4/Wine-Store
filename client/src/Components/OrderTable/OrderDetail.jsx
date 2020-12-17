import React from 'react'
import './OrderDetail.modules.css';
function OrderDetail(props) {
    // props va a ser un arreglo con todas las orderLines
    return (

        <div className='OrderDetail__Container' id={props.id}>
                <ul className='OrderTable__Ul'>
                    <li className='OrderTable__Text' >Quantity</li>
                    <li className='OrderTable__Text' >Price</li>
                    <li className='OrderTable__Text' >Product name</li>
                    <li className='OrderTable__Text' >Product price</li>
                </ul>
            { props.data.map(element =>{
                console.log( 'tu vieja',element)
            return(
                <ul className='OrderTable__Ul'>
                <li className='OrderTable__Text' >{element.quantity}</li>
                <li className='OrderTable__Text' >{element.price}</li>
                <li className='OrderTable__Text' >{element.product.name}</li>
                <li className='OrderTable__Text' >{element.product.price}</li>

            </ul>
                )
        }) }
               


        </div>
    )
}
export default OrderDetail
