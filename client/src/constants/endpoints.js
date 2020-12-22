const baseEndpoint = 'http://localhost:3000/';

export const getAllProdsEndpoint = baseEndpoint + `products/`;

export const categoryEndpoint = getAllProdsEndpoint + 'category/';

export const getAllProdsByCategoryEnpoint =
  getAllProdsEndpoint + 'productsByCategory/';

export const strainsEndpoint = baseEndpoint + 'strain/';

// export const getAllProdsByCategoryEnpoint =
//   'http://localhost:3000/products/productsByCategory/';
