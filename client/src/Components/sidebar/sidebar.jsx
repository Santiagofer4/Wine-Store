import React, { useEffect, useState } from "react";
import "./sidebar.modules.css";
import axios from "axios";

function Sidebar() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products/category")
      .then((catList) => {
        setList(catList.data);
        // console.log("array completo", catList);
      })
      .catch((err) => {
        // console.log("este es el error", err);
        return err;
      });
  }, []); // Le dejo el array vacío para que busque solo en el mount


  // cuando este lista las relaciones  de la DB, esta funcion debe pisar el estado 'List' 
  //con el array de objetos devueltos. para que el map haga el render
  function categoria(e){
    console.log('entro', e.target.innerText)
    let categoryName = e.target.innerText;
    axios
    .get(`http://localhost:3000/products/category/${categoryName}`)
    .then((categoryProducts) => {
      // setList(categoryProducts);
      console.log("categorias", categoryProducts);
    })
    .catch((err) => {
      console.log("este es el error", err);
      return err;
    });
  }

  if (list) {
    // console.log("array completo 1", list);
    return (
      <div className="Sidebar__container">
        <div className="Sidebar__lista">
          
          {list.map((product,index) => {
            return (
                <a href='#' onClick={(e)=>{categoria(e) }}>
                     {product.name}
                </a>
            );
          })}
        </div>
      </div>
    );
  }
  if (!list) {
    return <h3>No hay productos</h3>;
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
