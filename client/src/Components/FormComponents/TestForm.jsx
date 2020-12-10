import { Button, Paper } from '@material-ui/core';
import MuiSwitch from '@material-ui/core/Switch';
import { Formik, Form } from 'formik';
import React from 'react';
import FormField from './FormField.jsx';
import { validationSchema } from './validations';
import './TestForm.modules.css';

const initialValues = {
  product: '',
  cellar: '',
};
const wine_types = [
  {
    label: 'Red',
    value: 'tinto',
  },
  {
    label: 'White',
    value: 'blanco',
  },
  {
    label: 'Blend',
    value: 'blend',
  },
];
const strains = [
  {
    label: 'Pinot Noir',
    value: 'pinot',
  },
  {
    label: 'Malbec',
    value: 'malbec',
  },
  {
    label: 'Carmenere',
    value: 'carmenere',
  },
  {
    label: 'Syrah',
    value: 'syrah',
  },
  {
    label: 'Blend',
    value: 'red_bled',
  },
];

function Test() {
  const handleSubmit = (values, onSubmitProps) => {
    console.log('<----- SUBMITING FORM ----->');
    setTimeout(() => {
      onSubmitProps.setSubmitting(true);
      console.log('VALORES SUBMITEADOS', values);
      onSubmitProps.resetForm();
    }, 2000);
  };

  //! Para armar un formulario es necesario:
  //Envolver todo con el tag <Formik>, y pasar dentro de este los:
  //*initialValues={VARIABLE_CON_VALORES_INICIALES}; objeto con los valores iniciales de cada Field del form
  //*validationSchema={VARIABLE_CON_EL_ESQUEMA_DE_VALIDACION}; objeto con forma identica a `initialValues`,
  //*las validaciones se hacen contra este objeto `yup`
  //*onSubmit={FUNC_PARA_MANEJAR_EL_SUBMIT}; cualquier funcion a ejecutar con los datos del form, la func onSubmit,
  //*ademas de recibir `values` como parametro, tambien recibe una callback func `onSubmitProps`, con los siguientes metodos:
  //*setSubmitting(`true||false`)->setea el submitting state del form (util para evitar doble envio, etc.)
  //*resetForm()->limpia el formulario, llamar al final para `resetear` el form.

  //Entre los tags de <Formik> llamar una Arrow Func, pasandole el parametro (formik), y devolver:
  //un <Form> de formik, dentro de los tags de <Form> vamos a llamara todos los <FormField>
  //Se pueden utilizar los botones de MUI directamente,
  //para el boton de submit es necesario definir el `type='submit'`
  //Es buena practica deshabilitar el boton `submit` si hay errores,
  //para eso, agregar como prop: `disabled={!formik.isValid}`
  //Pueden agregarse otros botones, ligados c/u a su handlerFunc

  //* Parametros <<obligatorios>> a pasar a <FormField/>:
  //? fieldType: Un string que tiene el tipo de campo que queremos renderizar, puede ser:
  //? ['input','validateinput',textarea','switch','select','checkbox','radio','datepicker','uploader']
  //? label: Un string que sera el label del campo
  //? name: Un string que sera el nombre de referencia para el Field. `name` es la propiedad que permite
  //? enlazar los objetos `errors`, `touched`,`validations` (de yup). Entonces:
  //? `initialValues.name === validationSchema.name === FormField.name`
  //? Para los fieldType=['select','groupcheckbox','radio','groupswitch'] es necesario pasar
  //? una prop adicional `options`, con un array de objetos de la forma:
  //? [{label:'LABEL_TO_SHOW'},value:'VALUE_TO_USE/STORE'},...{}]
  //?  `value` es el parametro que se utiliza para las validaciones de los campos.

  //* Parametros <<opcionales>> a pasar a <FormField/>:
  //? Todos los parametros opcionales que pueden pasarse a un Field de MUI, del mismo tipo a renderizar,
  //? pueden ser pasados como props adicionales.

  return (
    <Paper className="TestForm">
      <h3>TEST FORM ONE OF EACH</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div>
              <FormField
                fieldType="textarea"
                label="Product"
                name="product"
                rows={5}
              />
              <FormField fieldType="input" label="Cellar" name="cellar" />
              <FormField
                fieldType="select"
                label="Strain"
                name="strain"
                options={strains}
                margin="normal"
              />
              <FormField
                fieldType="switch"
                label="Premium"
                name="isPremium"
                color="primary"
              />
              <FormField
                fieldType="radio"
                label="Wine Types"
                name="wine_types"
                options={wine_types}
              />
            </div>
            <br></br>
            <div>
              <Button
                variant="contained"
                color="secondary"
                disabled={!formik.isValid}
                type="submit"
              >
                {' '}
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default Test;
