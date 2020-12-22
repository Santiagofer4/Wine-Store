export const allProductsSelector = (state) => state.products.allProducts.list;

export const allProductsStatusSelector = (state) =>
  state.products.allProducts.status;

export const allProductsErrorSelector = (state) =>
  state.products.allProducts.error;

export const allCategoriesSelector = (state) =>
  state.categories.allCategories.list;

export const allCategoriesStatusSelector = (state) =>
  state.categories.allCategories.status;

export const allCategoriesErrorSelector = (state) =>
  state.categories.allCategories.error;

export const allProdsByCategorySelector = (state) =>
  state.categories.allProdsByCategory.list;

export const allProdsByCategoryStatusSelector = (state) =>
  state.categories.allProdsByCategory.status;

export const allProdsByCategoryErrorSelector = (state) =>
  state.categories.allProdsByCategory.error;

export const filteredTasteSelector = (state) =>
  state.categories.allProdsByCategory.taste;
 
export const productDetailSelector = (state) =>
  state.wineDetail.wine;

export const allProductsCartSelector = (state) =>
  state.productsCart.allProductsCart.list;

export const allProductsCartStatusSelector = (state) =>
  state.allProductsCart.status;

export const allProductsCartErrorSelector = (state) =>
  state.allProductsCart.error

