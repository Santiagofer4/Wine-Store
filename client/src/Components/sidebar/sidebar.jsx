import React, {useEffect, useState} from "react";
import './sidebar.modules.css'
import axios from "axios";



function Sidebar () {

    const [ list, setList] = useState([]);
  
    useEffect(() => {
      
      axios.get('http://localhost:3000/products/category')
        .then(catList => {
         setList (catList.data);
          console.log('array completo',catList)
         
        })
        .catch(err => {
          console.log('este es el error', err)
          return err;
        })
    }, [list] )


    if(list) {
        console.log('array completo 1',list)
      return (
        <div className='Sidebar__container'>
        
        <div className='Sidebar__lista' >
          {console.log('posicion 1',list[0])}
          { list.map((product, index) => {
                   return (

                               <label htmlFor="1"> 
                               <input type='checkbox' name='1' id='1'></input>
                                 {product.name}
                               </label>
                                    )  
          })}
        </div>
        </div>
      );} 
      if(!list) {
        return (
        <h3>No hay productos</h3>
        )
      }

    // return (
    //     // debe recibir data por porps props.data que es un arreglo de categorias
    //     <div className='Sidebar__container'>
    //            <p className='h3'>categorias</p>
    //        <ol className='Sidebar__lista'>
    //        {props.data.map(element =>{
    //                 return (

    //            <label htmlFor="1"> 
    //            <input type='checkbox' name='1' id='1'></input>
    //              categoria
    //            </label>
    //                 )    
    //                 })}
    //        </ol>
    //     </div>
    // )
}

export default Sidebar;
