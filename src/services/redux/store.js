"use client";

import { authReducer } from "./Slices/auth";
import { bootstrapReducer } from "./Slices/bootstrap";
import { branchesReducer } from "./Slices/branches";
import { brandsReducer } from "./Slices/brands";
import { categoryReducer } from "./Slices/categories";
import { colorsReducer } from "./Slices/colors";
import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./Slices/products";
import { sizesReducer } from "./Slices/sizes";
import { storesReducer } from "./Slices/stores";
import { targetsReducer } from "./Slices/targets";

const store = configureStore({
  reducer: {
    bootstrap: bootstrapReducer,
    auth: authReducer,
    category: categoryReducer,
    branches: branchesReducer,
    brands: brandsReducer,
    colors: colorsReducer,
    targets: targetsReducer,
    products: productsReducer,
    sizes: sizesReducer,
    stores: storesReducer,
  },
});

export default store;
