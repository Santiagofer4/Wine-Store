import React from 'react'

function CategoryForm() {
    const [state, setstate] = useState({
        cepa: "",
        bodega: "",
        description: "",
        yearHarvest: "",
        image: "",
        stock: "",
      });
    
      function handleOnChange (e) {
        if (e.target.name === 'price' || e.target.name === 'yearHarvest' || e.target.name === 'stock') {
          let value = parseInt(e.target.value)
          setstate({ ...state, [e.target.name] :value })
        } else setstate({ ...state, [e.target.name] : e.target.value })
      }
      
      function handleOnSubmit (e) {
        e.preventDefault()
        if (state.name && state.price && state.description && state.yearHarvest && state.image && state.stock) {
         return alert('En Desarrollo ')
        } else return alert('Faltan datos por completar')
      }
    
    
    return (
    <div className='formProd'>
        <form onSubmit={(e) => {handleOnSubmit(e)}} className="SearchBar__form" noValidate autoComplete="off">
            <TextField id={state.price ? 'accepted' : 'error'}       name='price'       label="Precio"      type='number'  onChange={(e) => {handleOnChange(e)}}/>
            <TextField id={state.name ? 'accepted' : 'error'}        name='name'        label="Nombre"      type='string'  onChange={(e) => {handleOnChange(e)}}/>
            <TextField id={state.price ? 'accepted' : 'error'}       name='description' label="Descripcion" type='string'  onChange={(e) => {handleOnChange(e)}}/>
            <TextField id={state.yearHarvest ? 'accepted' : 'error'} name='yearHarvest' label="Año cosecha" type='number'  onChange={(e) => {handleOnChange(e)}}/>
            <TextField id={state.image ? 'accepted' : 'error'}       name='image'       label="Img"         type='string'  onChange={(e) => {handleOnChange(e)}}/>
            <TextField id={state.stock ? 'accepted' : 'error'}       name='stock'       label="Stock"       type='number'  onChange={(e) => {handleOnChange(e)}}/>
            <Button type="submit">Agregar</Button>
        </form>
    </div>
    )
}

export default CategoryForm
