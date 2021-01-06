const baseEndpoint = 'http://localhost:3000/';

export const productEndpoint = baseEndpoint + `products/`;

export const categoryEndpoint = productEndpoint + 'category/';

export const usersEndpoint = baseEndpoint + 'users/';

export const getAllProductsCartEnpoint = usersEndpoint; // ${id}/cart

export const getCatsOfProductEnpoint = categoryEndpoint + 'product/'; // ${productId}'

export const getAllProdsByCategoryEnpoint =
  productEndpoint + 'productsByCategory/';

export const strainsEndpoint = baseEndpoint + 'strain/';

export const searchProductEndpoint = baseEndpoint + 'search?word=';

// export const addUserEndpoint = baseEndpoint + 'users/';

export const addUserEndpoint = baseEndpoint + 'auth/register/';

export const getOrderTableEndpoint = baseEndpoint + 'orders/';

export const UserLoginEndpoint = baseEndpoint + 'auth/login';

export const userOrdersEndpoint = baseEndpoint + 'users/'; // ${id}/orders
