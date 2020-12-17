import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import { getOrderList } from '../../actions';
import './OrderTable.modules.css'
// Tabla que muestra una lista de ordenes.s
// Esta tabla es para el admin.
// Tiene que mostrar todas las ordenes de todos los usuarios.


// get a /orders
function OrderTable(props) {
    useEffect(()=>{
        props.getOrderList();

    },[])
    console.log('datos de props', props)
    return (
        <div className='OrderTable__Container'>
                <ul className='OrderTable__Ul'>
                    <li className='OrderTable__Text' >Total</li>
                    <li className='OrderTable__Text' >Status</li>
                    <li className='OrderTable__Text' >User Id</li>
                    <li className='OrderTable__Text' >Order Id</li>
                    <li className='OrderTable__Text' >Detalle</li>

                </ul>

            {props.orderList && props.orderList.map(element =>{
                return(
                    <ul className='OrderTable__Ul'>
                    <li className='OrderTable__Text' >{element.total}</li>
                    <li className='OrderTable__Text' >{element.status}</li>
                    <li className='OrderTable__Text' >{element.userId}</li>
                    <li className='OrderTable__Text' >{element.id}</li>
                    <li className='OrderTable__Text'> <button>D</button></li>
                    </ul>
  
                )
            })}
        </div>
    )
}


function mapStateToProps(state){
    console.log('del map',state.productReducers)
    return{
        orderList: state.productReducers.orderList ? state.productReducers.orderList : []
    }
}
export default connect(mapStateToProps,{getOrderList})(OrderTable)
