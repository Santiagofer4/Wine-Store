const baseEndpoint = 'http://localhost:3000/';

export const getAllProdsEndpoint = baseEndpoint + `products/`;

export const categoryEndpoint = getAllProdsEndpoint + 'category/';


export const getAllProductsCartEnpoint = 'http://localhost:3000/users/' // ${id}/cart

export const getCatsOfProductEnpoint = 'http://localhost:3000/products/category/product/' // ${productId}'

export const postProductsCardEnpoint = 'http://localhost:3000/users/'   //1/cart'

export const deleteProductCarEnpoint =  'http://localhost:3000/users/' //${idUser}/cart/${productId}'

export const getAllProdsByCategoryEnpoint =
  getAllProdsEndpoint + 'productsByCategory/';

export const strainsEndpoint = baseEndpoint + 'strain/';

// export const getAllProdsByCategoryEnpoint =
//   'http://localhost:3000/products/productsByCategory/';

export const searchProductEndpoint = baseEndpoint + 'search?word=';