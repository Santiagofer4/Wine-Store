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
  state.wineDetail.wineDetail.wine;

export const productDetailCatSelector = (state) =>
  state.wineDetail.wineDetail.categories;

export const productDetailStatusSelector = (state) =>
  state.wineDetail.wineDetail.status;

export const productDetailErrorSelector = (state) =>
  state.wineDetail.wineDetail.error;

export const allProductsCartSelector = (state) =>
  state.productsCart.allProductsCart.list;

export const allProductsCartSyncSelector = (state) =>
  state.productsCart.allProductsCart.sync;

export const allProductsCartStatusSelector = (state) =>
  state.productsCart.allProductsCart.status;

export const allProductsCartErrorSelector = (state) =>
  state.productsCart.allProductsCart.error;

export const allCatsOfProductSelector = (state) =>
  state.categories.allCatsOfProduct.list;

export const allCatsOfProductStatusSelector = (state) =>
  state.categories.allCatsOfProduct.status;

export const allCatsOfProductErrorSelector = (state) =>
  state.categories.allCatsOfProduct.error;

export const allStrainsSelector = (state) => state.strains.allStrains.list;

export const strainsStatusSelector = (state) => state.strains.status;

export const strainsErrorSelector = (state) => state.strains.error;

export const allOrderSelector = (state) => state.orderTable.orderTable.orders;

export const allOrderStatusSelector = (state) => state.orderTable.orderTable.status;