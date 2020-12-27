import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { validationSchemaLoadProducts } from '../adminValidations';
import { useSelector, useDispatch } from 'react-redux';
import {
  allCategoriesSelector,
  allStrainsSelector,
  strainsStatusSelector,
  allCategoriesStatusSelector,
} from '../../../selectors';
import { formatArrayToOption } from '../../utils';
import FormField from '../../FormComponents/FormField';
import { postNewProduct } from '../../../slices/productSlice';

function LoadProduct() {
  const dispatch = useDispatch();
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
  };
  const [strainOption, setStrainOption] = useState([]);
  const [tasteOption, setTasteOption] = useState([]);

  const allCats = useSelector(allCategoriesSelector);
  const allStrains = useSelector(allStrainsSelector);
  const allCatStatus = useSelector(allCategoriesStatusSelector);
  const strainStatus = useSelector(strainsStatusSelector);

  let content;

  useEffect(() => {
    if (allCatStatus === 'succeded')
      setTasteOption(formatArrayToOption(allCats, 'taste'));
    if (strainStatus === 'succeded')
      setStrainOption(formatArrayToOption(allStrains));
  }, [allCatStatus, strainStatus, dispatch]);

  const handleSubmit = (values, formik) => {
    const product = {
      name: values.name,
      strain: values.strain,
      description: values.description,
      yearHarvest: values.yearHarvest,
      price: values.price,
      stock: values.stock,
      image: values.image,
      categories: [values.taste1, values.taste2, values.taste3],
    };
    const payload = {
      product,
      formik,
    };
    // console.log(payload);
    dispatch(postNewProduct(payload));
  };

  const handleReset = (formik) => {
    formik.resetForm({
      values: { ...emptyValues },
      errors: { ...emptyValues },
    });
  };

  if (allCatStatus === 'loading' || strainStatus === 'loading') {
    content = (
      <>
        <h2>Cargando...</h2>
        <CircularProgress />
      </>
    );
  }
  if (allCatStatus === 'failed' || strainStatus === 'failed') {
    content = (
      <>
        <h3>Ha ocurrido un error</h3>
        <Button>Reintentar</Button>
      </>
    );
  }
  if (allCatStatus === 'succeded' && strainStatus === 'succeded') {
    content = (
      <Formik
        initialValues={emptyValues}
        validationSchema={validationSchemaLoadProducts}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Container>
            <Form>
              <FormField fieldType="input" label="Marca" name="name" required />
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
              <FormField
                fieldType="select"
                label="Sabor 1"
                name="taste1"
                options={tasteOption}
              />
              <FormField
                fieldType="select"
                label="Sabor 2"
                name="taste2"
                options={tasteOption}
              />
              <FormField
                fieldType="select"
                label="Sabor 3"
                name="taste3"
                options={tasteOption}
              />
              <FormField
                fieldType="textarea"
                label="Descripcion del producto"
                name="description"
                rows={8}
                required
              />
              <br></br>
              <Container>
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={!formik.isValid}
                  type="submit"
                >
                  CARGAR
                </Button>
                <br></br>
                <Button
                  variant="outlined"
                  color="secondary"
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
    );
  }

  return <Container>{content}</Container>;
}

export default LoadProduct;
