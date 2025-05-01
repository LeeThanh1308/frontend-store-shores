"use client";

import "@ant-design/v5-patch-for-react-19";

import {
  bootstrapSelector,
  handleGetBootstrapBrands,
  handleGetBootstrapCategories,
  handleGetBootstrapTargetGroups,
} from "../Slices/bootstrap";
import { branchesSelector, handleGetBranches } from "../Slices/branches";
import { brandsSelector, handleGetBrands } from "../Slices/brands";
import {
  cartsSelector,
  handleClearCart,
  handleGetCarts,
} from "../Slices/carts";
import { categorySelector, handleGetCategories } from "../Slices/categories";
import { colorsSelector, handleGetColors } from "../Slices/colors";
import { handleGetListAccountCustomers, usersSelector } from "../Slices/users";
import { handleGetProducts, productsSelector } from "../Slices/products";
import { handleGetSearch, searchSelector } from "../Slices/search";
import { handleGetSliders, sliderSelector } from "../Slices/sliders";
import { handleGetStores, storesSelector } from "../Slices/stores";
import { handleGetTargets, targetsSelector } from "../Slices/targets";
import { redirect, useParams, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { authSelector } from "../Slices/auth";
import { handleGetInfoVerifyCodeSign } from "../Slices/auth/registerApi";

function BootStrapApp() {
  const params = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const { onRefresh: onRefreshBootstrap, isLoading: isLoadingBootstrap } =
    useSelector(bootstrapSelector);
  const {
    isLoading: isLoadingAuth,
    activeVerifyCodeSignID,
    isAuthenticated,
    user,
  } = useSelector(authSelector);
  const { onRefresh: onRefreshCate, isLoading: isLoadingCate } =
    useSelector(categorySelector);
  const { onRefresh: onRefreshBrench, isLoading: isLoadingBrench } =
    useSelector(branchesSelector);
  const { onRefresh: onRefreshBrand, isLoading: isLoadingBrand } =
    useSelector(brandsSelector);
  const { onRefresh: onRefreshColor, isLoading: isLoadingColor } =
    useSelector(colorsSelector);
  const { onRefresh: onRefreshTarget, isLoading: isLoadingTarget } =
    useSelector(targetsSelector);
  const { onRefresh: onRefreshProducts, isLoading: isLoadingProducts } =
    useSelector(productsSelector);
  const { onRefresh: onRefreshStores, isLoading: isLoadingStores } =
    useSelector(storesSelector);
  const { onRefresh: onRefreshSearch, isLoading: isLoadingSearch } =
    useSelector(searchSelector);
  const { onRefresh: onRefreshCart, isLoading: isLoadingCart } =
    useSelector(cartsSelector);
  const { onRefresh: onRefreshUsers, isLoading: isLoadingUsers } =
    useSelector(usersSelector);
  const { onRefresh: onRefreshSliders, isLoading: isLoadingSliders } =
    useSelector(sliderSelector);

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (onRefreshCate) dispatch(handleGetCategories());
      if (onRefreshBrench) dispatch(handleGetBranches());
      if (onRefreshBrand) dispatch(handleGetBrands());
      if (onRefreshColor) dispatch(handleGetColors());
      if (onRefreshTarget) dispatch(handleGetTargets());
      if (onRefreshProducts) dispatch(handleGetProducts());
      if (onRefreshStores) dispatch(handleGetStores({ branchID: params?.id }));
      if (onRefreshSliders) dispatch(handleGetSliders());
      if (isAuthenticated) {
        if (onRefreshCart) dispatch(handleGetCarts());
        if (onRefreshUsers) dispatch(handleGetListAccountCustomers());
      }
    }, 100);

    return () => clearTimeout(timerID);
  }, [
    onRefreshBootstrap,
    onRefreshCate,
    onRefreshBrench,
    onRefreshBrand,
    onRefreshColor,
    onRefreshTarget,
    onRefreshProducts,
    onRefreshStores,
    onRefreshCart,
    onRefreshUsers,
    onRefreshSliders,
  ]);

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (
        isLoadingCate ||
        isLoadingBrench ||
        isLoadingBrand ||
        isLoadingColor ||
        isLoadingTarget ||
        isLoadingProducts ||
        isLoadingBootstrap ||
        isLoadingAuth ||
        isLoadingStores ||
        isLoadingSearch ||
        isLoadingCart ||
        isLoadingUsers ||
        isLoadingSliders
      ) {
        setShowLoading(true);
      } else {
        setShowLoading(false);
      }
    }, 500);

    return () => clearTimeout(timerID);
  }, [
    isLoadingAuth,
    isLoadingCate,
    isLoadingBrench,
    isLoadingBrand,
    isLoadingColor,
    isLoadingTarget,
    isLoadingProducts,
    isLoadingBootstrap,
    isLoadingStores,
    isLoadingSearch,
    isLoadingCart,
    isLoadingUsers,
    isLoadingSliders,
  ]);

  useEffect(() => {
    dispatch(handleGetBootstrapBrands());
    dispatch(handleGetBootstrapCategories());
    dispatch(handleGetBootstrapTargetGroups());
    if (isAuthenticated) {
      dispatch(handleGetCarts());
    }
  }, []);

  useEffect(() => {
    if (Number(activeVerifyCodeSignID)) {
      dispatch(handleGetInfoVerifyCodeSign(+activeVerifyCodeSignID));
    }
  }, [activeVerifyCodeSignID]);

  useEffect(() => {
    // if (isAuthenticated && pathname == "/login" && user && !isLoadingAuth) {
    //   redirect("/");
    // }
    // if (!isAuthenticated && pathname !== "/" && !isLoadingAuth) {
    //   redirect("/");
    // }
    if (isAuthenticated) {
    } else {
      dispatch(handleClearCart());
    }
  }, [isAuthenticated, user]);

  return (
    showLoading && (
      <div className=" fixed top-0 right-0 left-0 bottom-0 backdrop-blur-3xl z-[9999] flex justify-center items-center">
        <div className="loader">
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  );
}

export default BootStrapApp;
