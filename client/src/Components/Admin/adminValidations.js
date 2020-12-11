import * as yup from 'yup';

//* Objecto de validacion para formulario de carga de producto (Reducer: postNewProduct;POST: '/products')
export const validationSchemaLoadProducts = yup.object({
  product: yup
    .string()
    .required('El nombre del producto es requerido')
    .min('El nombre del producto es demasiado corto')
    .max('El nombre del producto es demasiado largo'),
  strain: yup.string().required('Es necesario indicar la cepa'),
  harvestYear: yup
    .number()
    .integer()
    .positive('El año de cosecha no puede ser negativo')
    .min(1900, 'El año de cosecha debe ser >1900')
    .required('Debe indicar año de cosecha'),
  stock: yup
    .string()
    .max(500, 'La descricion no puede exceder los 500 caracteres'),
  price: yup
    .number('El precio debe ser un nombre')
    .positive('El precio debe ser positivo')
    .required('Debe indicar precio'),
  image: yup
    .string()
    .url('Debe ser una URL valida')
    .required('Debe pasar URL de img')
    .max(200, 'La URL no puede exceder los 200 caracteres'),
});
