import React, { useEffect } from 'react'
import { sliceTime, total } from '../utils.js'
import OrderDetail from './OrderDetail';
import './OrderTable.modules.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderTable } from '../../slices/orderTableSlice';
import {
    allOrderSelector,
    allOrderStatusSelector,
} from '../../selectors';

// Esta tabla es para el admin.
// Tiene que mostrar todas las ordenes de todos los usuarios.

function OrderTable() {
    const dispatch = useDispatch();
    const orderTable = useSelector(allOrderSelector);
    const status = useSelector(allOrderStatusSelector);

    useEffect(()=>{
        dispatch(getOrderTable());
    }, [dispatch])

    return (
        <div className='OrderTable__Container'>
                <ul className='OrderTable__Ul'>
                    <li className='OrderTable__index' >ID</li>
                    <li className='OrderTable__index' >Total</li>
                    <li className='OrderTable__index' >Status</li>
                    <li className='OrderTable__index' >User Id</li>
                    <li className='OrderTable__index' >Fecha</li>
                    <li className='OrderTable__index' >Detalle</li>
                </ul>

            {status === 'succeded' && orderTable.map(order => {
                return(
                    <>
                    <ul className='OrderTable__Ul'>
                    <li className='OrderTable__Text' >{order.id}</li>
                    <li className='OrderTable__Text' >{Math.ceil(total(order.orderLines) * 121 / 100)}</li>
                    <li className='OrderTable__Text' >{order.status}</li>
                    <li className='OrderTable__Text' >{order.userId}</li>
                    <li className='OrderTable__Text' >{sliceTime(order.updatedAt)}</li>
                    <li className='OrderTable__Text' > <button onClick={()=>{ hide(order.id) }}>D</button></li>
                    </ul>
                     <OrderDetail id={order.id} data={order.orderLines} ></OrderDetail>
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

export default OrderTable;