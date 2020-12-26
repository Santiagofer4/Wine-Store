const baseEndpoint = 'http://localhost:3000/';

export const productEndpoint = baseEndpoint + `products/`;

export const categoryEndpoint = productEndpoint + 'category/';

export const getAllProductsCartEnpoint = 'http://localhost:3000/users/'; // ${id}/cart

export const getCatsOfProductEnpoint =
  'http://localhost:3000/products/category/product/'; // ${productId}'

export const postProductsCardEnpoint = 'http://localhost:3000/users/'; //1/cart'

export const deleteProductCarEnpoint = 'http://localhost:3000/users/'; //${idUser}/cart/${productId}'

export const getAllProdsByCategoryEnpoint =
  productEndpoint + 'productsByCategory/';

export const strainsEndpoint = baseEndpoint + 'strain/';

// export const getAllProdsByCategoryEnpoint =
//   'http://localhost:3000/products/productsByCategory/';

export const searchProductEndpoint = baseEndpoint + 'search?word=';

export const addUserEndpoint = baseEndpoint + 'users/';
