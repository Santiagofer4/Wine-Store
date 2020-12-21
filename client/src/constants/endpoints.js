const baseEndpoint = 'http://localhost:3000/';

export const getAllProdsEndpoint = baseEndpoint + `products/`;

export const getAllCatsEndpoint = getAllProdsEndpoint + 'category';

export const getAllProdsByCategoryEnpoint =
  getAllProdsEndpoint + 'productsByCategory/';

export const strainsEndpoint = baseEndpoint + 'strain/';
