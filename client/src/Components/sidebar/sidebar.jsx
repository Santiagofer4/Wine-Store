import React from 'react'
import './sidebar.modules.css'
let datos = ['categoria pepe', 'categoria pepa', 'categoria papa']
function sidebar(props) {
    return (
        // debe recibir data por porps props.data que es un arreglo de categorias
        <div className='Sidebar__container'>
               <p className='h3'>categorias</p>
           <ol className='Sidebar__lista'>
           {props.data.map(element =>{
                    return (

               <label htmlFor="1"> 
               <input type='checkbox' name='1' id='1'></input>
                 categoria
               </label>
                    )    
                    })}
           </ol>
        </div>
    )
}

export default sidebar
