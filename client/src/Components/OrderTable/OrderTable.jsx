import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import { getOrderList } from '../../actions';
import {sliceTime} from '../utils.js'
import OrderDetail from './OrderDetail';

import './OrderTable.modules.css'
// Tabla que muestra una lista de ordenes.s
// Esta tabla es para el admin.
// Tiene que mostrar todas las ordenes de todos los usuarios.


// get a /orders
function OrderTable(props) {
    useEffect(()=>{
        props.getOrderList();

    },[])
    return (
        <div className='OrderTable__Container'>
                <ul className='OrderTable__Ul'>
                    <li className='OrderTable__Text' >Total</li>
                    <li className='OrderTable__Text' >Status</li>
                    <li className='OrderTable__Text' >User Id</li>
                    <li className='OrderTable__Text' >Fecha</li>
                    <li className='OrderTable__Text' >Detalle</li>

                </ul>

            {props.orderList && props.orderList.map(element =>{
                return(
                    <>
                    <ul className='OrderTable__Ul'>
                    <li className='OrderTable__Text' >{element.total}</li>
                    <li className='OrderTable__Text' >{element.status}</li>
                    <li className='OrderTable__Text' >{element.userId}</li>
                    <li className='OrderTable__Text' >{sliceTime(element.updatedAt)}</li>
                    <li className='OrderTable__Text'> <button onClick={()=>{ hide(element.id)}}>D</button></li>

                    </ul>
                     <OrderDetail id={element.id} data={element.orderLines} ></OrderDetail>
                     </>
                )
            })}
        </div>
    )
}

function hide(id){
    let OrderDetail = document.getElementById(id).style.display;
    if( OrderDetail !== 'inline'){
        document.getElementById(id).style.display = 'inline'
    }
    else{
        document.getElementById(id).style.display = 'none'
        
    }
}

function mapStateToProps(state){
    return{
        orderList: state.productReducers.orderList ? state.productReducers.orderList : []
    }
}
export default connect(mapStateToProps,{getOrderList})(OrderTable)
