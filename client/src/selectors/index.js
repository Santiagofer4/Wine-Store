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
