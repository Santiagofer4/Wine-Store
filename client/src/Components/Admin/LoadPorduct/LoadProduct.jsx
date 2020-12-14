import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import FormField from '../../FormComponents/FormField';
import { Formik, Form } from 'formik';
import { validationSchemaLoadProducts } from '../adminValidations.js';
import { Container, Paper, Button, CircularProgress } from '@material-ui/core';
import './LoadProduct.modules.css';
import { getStrainList } from '../../../actions/';
import { formatArrayToOption } from '../../utils.js';
import axios from 'axios';
import { Switch, useHistory } from 'react-router-dom';
import { setProductDetail, getProductsList } from '../../../actions/';

// ---- FUNCIONA PERO TIENE MUCHAS VUELTAS :S ----
//? el select de las options no renderizan de primera, hay que ver la forma de se rerenderize cuando el fetch termina...el fetch lo hace pero no lo renderiza correctamente
//? las cepas (strains) no son obligagtorias ahora, ya que en el create no son necesarias...
//? Create,Udpate y Delete funcionan

const LoadProduct = (props) => {
  const emptyValues = {
    name: '',
    strain: '',
    yearHarvest: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    taste1: '',
    taste2: '',
    taste3: '',
  }; //valores "vacios" del form
  const { wineDetail, categoryList, prodCats } = props;

  const edit = props.location.state ? props.location.state.edit : false; //true cuando entro por edit, false cualquier otra forma
  const [loading, setLoading] = useState(true); //estado para cargar el spinner de cargango
  const [strainOption, setStrainOption] = useState([]); //mantiene actualziada la lista de opciones de cepa...no me convence...creo que es al pedo definir un estado local si tenemos un store
  const [success, setSucces] = useState(false); //para cambiar el mensaje de los botones
  const [initialValues, setInitialValues] = useState(emptyValues); //estado para manejar los valores iniciales, o precargar los valores del producto, del formulario de carga/edicion de un producto
  const [tasteList, setTasteList] = useState([]); //mantiene actualziada la lista de sabores(nuestras categorías)...no me convence...creo que es al pedo definir un estado local si tenemos un store
  const history = useHistory(); //para redirect despues del create-update-delete
  // const [deleteTaste, setDeleteTaste] = useState(''); // Probando a hacer que active la actualización de los sabores
  // console.log('PROPS LOAD', props.strainList);
  // console.log('LOADING', loading);

  const callTastes = async () => {
    // await props.getCategoryList();
    (await Array.isArray(props.categoryList)) &&
      props.categoryList.length > 0 &&
      setTasteList(formatArrayToOption(categoryList, 'taste')); //? Tiene que haber una mejor manera para solucionar esto...
    // console.log('CATS LIST', categoryList);
    // console.log('dentro de calltests', tasteList);
  };

  // ESTE BLOQUE HAY QUE ANALZIARLO Y DEBUGEARLO BIEN --------->>>>>>>>>>>
  useEffect(() => {
    callStrainList();
    callTastes();
    //si edit, entonces vengo de un product detail, entonces precargo los valores iniciales
    if (edit) {
      setInitialValues({
        name: wineDetail.name,
        strain: '',
        description: wineDetail.description,
        yearHarvest: wineDetail.yearHarvest,
        price: wineDetail.price,
        stock: wineDetail.stock,
        image: wineDetail.image,
        taste1: !!prodCats[0] ? prodCats[0].id : '',
        taste2: !!prodCats[1] ? prodCats[1].id : '',
        taste3: !!prodCats[2] ? prodCats[2].id : '',
      });
      // console.log('prodCats useEffect', prodCats);
    }
  }, [wineDetail, categoryList, prodCats]);

  const callStrainList = async () => {
    //! el getStrainList() es necesario para cargar el estado, aunque podria ejecutarse cada vez que cargo una nueva cepa.... el resto funciona....pero me parece ultra berreta
    await props.getStrainList();
    await setStrainOption(formatArrayToOption(props.strainList)); //? Tiene que haber una mejor manera para solucionar esto...
    setLoading(false);
  };

  // <<<<<<<<<<<<<<<<<<----------------------

  const handleSubmit = async (values, onSubmitProps) => {
    // console.log(values);

    //Esto se tiene que poder hacer sin escribir tanto
    //armo el objeto para pasarle a la API
    const payload = {
      name: values.name,
      strain: values.strain,
      description: values.description,
      yearHarvest: values.yearHarvest,
      price: values.price,
      stock: values.stock,
      image: values.image,
      categories: [values.taste1, values.taste2, values.taste3],
    };
    try {
      //si edit es un update (put), si !edit entonces es un create (post)
      console.log('ID enviado', wineDetail.id);
      const res = edit
        ? await axios.put(
            `http://localhost:3000/products/${wineDetail.id}`,
            payload
          )
        : await axios.post(`http://localhost:3000/products`, payload);
      if (res.status === 200) {
        //me devuelve status 200 entonces seteo success=ture y limpio el form (deberia hacerlo de forma automatica pero no me estuvo funcionando...hay que ver que pasa)
        setSucces(true);
        onSubmitProps.resetForm({
          values: { ...payload },
          errors: { ...emptyValues },
        });
        //si edit recargo la pagina con los nuevos datos del producto
        if (edit) {
          props.setProductDetail(payload);
          history.push({
            pathname: `/admin/edit/${wineDetail.id}`,
            state: {
              edit: true,
            },
          });
          setSucces(false); //vuelve a success false...esto se puede manejar mejor...un estado que tenga el tipo de accion que se tomo C || U || D y en funcion de eso muestra los mensajes....por ahora modo `cavernicola: ON`.
          //El formulario queda en gris y no deja submitear a menos que `toques` o `edites` algun campo...es para evitar el doble submit
        }
        // si !edit, entonces create, actualizo el detial y la lista de productos y redirect a catalogo
        else {
          props.setProductDetail(payload);
          props.getProductsList();
          history.push('/catalogue');
        }
      }
    } catch (error) {
      console.error(error);
      alert('No se ha podido cargar el producto');
    }
  };

  const handleDelete = async (formik) => {
    // console.log('DELETING');
    try {
      const res = await axios.delete(
        `http://localhost:3000/products/${wineDetail.id}`
      );
      if (res.status == 200) {
        //si status = 200, success = ture, actualizo productlisty y redirect a catalogo
        setSucces(true);
        props.getProductsList();
        history.push('/catalogue');
      }
    } catch (error) {
      console.error(error);
      alert('No se ha podido borrar el producto');
    }
  };

  const handleReset = (formik) => {
    // console.log(formik);
    //func para resetear el form
    formik.resetForm({
      values: { ...emptyValues },
      errors: { ...emptyValues },
    });
  };

  //! el delete lo manda a la API correctamente, y esta responde 200 si todo salio bien, o error
  //! No hay ninguna redireccion despues del delete, pero habria que vaciar el campo "select" que se elimino
  //! Tampoco estamos manejando el doble delete
  //! Habria que ver de levantar la data del producto nuevamente de la DB y re-renderizar el componente (o la parte que cambio)
  //! la otra seria trabajarlo con algun estado de redux....
  const deleteTasteHandler = async (e) => {
    let select = e.target.name;
    // let label ='';
    console.log(select);
    try {
      var remove_cat_id = tasteList.find(
        (taste) =>
          document.querySelector(`#${e.target.name}`).textContent ===
          taste.label
      ).value;
    } catch (error) {
      console.error(error);
      alert('No se puede borrar una categoria vacia');
      return;
    }
    try {
      const res = await axios.delete(
        `http://localhost:3000/products/${wineDetail.id}/category/${remove_cat_id}`
      );
      if (res.status === 200) {
        props.getProductsList();
        document.querySelector(`#${select}`).textContent = 'Eliminada';
        // console.log('Queryselector', document.querySelector(`#${select}`))
        // history.push(`/admin/edit/${wineDetail.id}`); //intento fallido de forzar el renderizado del componente
        console.log('DELETE');
      }
    } catch (error) {
      console.log(error);
      alert('No se ha podido eliminar la categoria');
      return;
    }
  };

  const handleOnClickSelect = (e) => {
    let taste = e.target.name;
    initialValues[taste] = e.target.value;
    console.log(e.target.value);
    console.log(initialValues);
  };

  return (
    <Container className="">
      {edit ? <h1>Editar {wineDetail.name}</h1> : <h1>Carga de Productos</h1>}
      {loading ? (
        <CircularProgress />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemaLoadProducts}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Container>
              <Form>
                <FormField
                  fieldType="input"
                  label="Marca"
                  name="name"
                  required
                />
                <FormField
                  fieldType="select"
                  label="Cepa"
                  name="strain"
                  options={strainOption}
                />
                <FormField
                  fieldType="input"
                  type="number"
                  label="Año de cosecha"
                  name="yearHarvest"
                  required
                />
                <FormField
                  fieldType="input"
                  type="number"
                  label="Stock Inicial"
                  name="stock"
                />
                <FormField
                  fieldType="input"
                  type="number"
                  label="Precio"
                  name="price"
                  required
                />
                <FormField
                  fieldType="input"
                  label="URL de imagen"
                  name="image"
                  required
                />
                {edit ? (
                  <FormField
                    fieldType="select"
                    label="Sabor 1"
                    name="taste1"
                    options={tasteList}
                    id="delete1"
                    value={initialValues.taste1}
                    onChange={(e) => handleOnClickSelect(e)}
                  />
                ) : (
                  <FormField
                    fieldType="select"
                    label="Sabor 1"
                    name="taste1"
                    options={tasteList}
                    id="delete1"
                  />
                )}
                {edit && (
                  <Button
                    variant="outlined"
                    color="primary"
                    label="Eliminar"
                    name="delete1"
                    onClick={(e) => deleteTasteHandler(e)}
                  >
                    X
                  </Button>
                )}
                {edit ? (
                  <FormField
                    fieldType="select"
                    label="Sabor 2"
                    name="taste2"
                    options={tasteList}
                    id="delete2"
                    value={initialValues.taste2}
                    onChange={(e) => handleOnClickSelect(e)}
                  />
                ) : (
                  <FormField
                    fieldType="select"
                    label="Sabor 2"
                    name="taste2"
                    options={tasteList}
                    id="delete2"
                  />
                )}

                {edit && (
                  <Button
                    variant="outlined"
                    color="primary"
                    label="Eliminar"
                    name="delete2"
                    onClick={(e) => deleteTasteHandler(e, formik)}
                  >
                    X
                  </Button>
                )}
                {edit ? (
                  <FormField
                    fieldType="select"
                    label="Sabor 3"
                    name="taste3"
                    options={tasteList}
                    id="delete3"
                    value={initialValues.taste3}
                    onChange={(e) => handleOnClickSelect(e)}
                  />
                ) : (
                  <FormField
                    fieldType="select"
                    label="Sabor 3"
                    name="taste3"
                    options={tasteList}
                    id="delete3"
                  />
                )}
                {edit && (
                  <Button
                    variant="outlined"
                    color="primary"
                    label="Eliminar"
                    name="delete3"
                    onClick={(e) => deleteTasteHandler(e, formik)}
                  >
                    X
                  </Button>
                )}

                <FormField
                  fieldType="textarea"
                  label="Descripcion del producto"
                  name="description"
                  rows={8}
                  required
                />

                <br></br>
                <Container>
                  {edit ? (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={!formik.isValid}
                        type="submit"
                      >
                        {' '}
                        {success ? `PRODUCTO EDITADO!` : 'Update'}
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={!formik.isValid}
                        onClick={() => handleDelete(formik)}
                      >
                        DELETE
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!formik.isValid}
                      type="submit"
                    >
                      {' '}
                      {success ? `PRODUCTO AGREGADO!` : 'Submit'}
                    </Button>
                  )}
                  <br></br>
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={!formik.isValid}
                    onClick={() => handleReset(formik)}
                    type="reset"
                  >
                    RESET
                  </Button>
                </Container>
              </Form>
            </Container>
          )}
        </Formik>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  strainList: state.formReducers.strainList,
  wineDetail: state.productReducers.wineDetail,
  categoryList: state.productReducers.categories,
  prodCats: state.formReducers.prodCategoryList,
});

export default connect(mapStateToProps, {
  getStrainList,
  setProductDetail,
  getProductsList,
})(LoadProduct);
