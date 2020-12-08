import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './ProductForm.modules.css'

function CellarForm() {
    const [state, setstate] = useState({
        name: "",
        description: '',
        location: ''
      });
    
      function handleOnChange (e) {
        setstate({ ...state, [e.target.name] : e.target.value })
      }
      
      function handleOnSubmit (e) {
        e.preventDefault()
        if (state.name,state.description,state.location) {
         return alert('En Desarrollo ')
        } else return alert('Faltan campos por completar')
      }
    
    
    return (
    <div className='formProd'>
        <form onSubmit={(e) => {handleOnSubmit(e)}} className="SearchBar__form" noValidate autoComplete="off">
            <TextField id={state.name ? 'accepted' : 'error'}        name='name'        label="Nombre Bodega"  type='string' onChange={(e) => {handleOnChange(e)}}/>
            <TextField id={state.description ? 'accepted' : 'error'} name='description' label="Descripcion"   type='string' onChange={(e) => {handleOnChange(e)}}/>
            <TextField id={state.location ? 'accepted' : 'error'}    name='location'    label="Localizacion"  type='string' onChange={(e) => {handleOnChange(e)}}/>
            <Button type="submit">Agregar</Button>
        </form>
    </div>
    )
}

export default CellarForm