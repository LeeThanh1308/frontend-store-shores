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
import { categorySelector, handleGetCategories } from "../Slices/categories";
import { colorsSelector, handleGetColors } from "../Slices/colors";
import { handleGetProducts, productsSelector } from "../Slices/products";
import { handleGetTargets, targetsSelector } from "../Slices/targets";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function BootStrapApp() {
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);

  const { onRefresh: onRefreshBootstrap, isLoading: isLoadingBootstrap } =
    useSelector(bootstrapSelector);
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

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (onRefreshCate) dispatch(handleGetCategories());
      if (onRefreshBrench) dispatch(handleGetBranches());
      if (onRefreshBrand) dispatch(handleGetBrands());
      if (onRefreshColor) dispatch(handleGetColors());
      if (onRefreshTarget) dispatch(handleGetTargets());
      if (onRefreshProducts) dispatch(handleGetProducts());
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
  ]);

  useEffect(() => {
    if (
      isLoadingCate ||
      isLoadingBrench ||
      isLoadingBrand ||
      isLoadingColor ||
      isLoadingTarget ||
      isLoadingProducts ||
      isLoadingBootstrap
    ) {
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }, [
    isLoadingCate,
    isLoadingBrench,
    isLoadingBrand,
    isLoadingColor,
    isLoadingTarget,
    isLoadingProducts,
    isLoadingBootstrap,
  ]);

  useEffect(() => {
    dispatch(handleGetBootstrapBrands());
    dispatch(handleGetBootstrapCategories());
    dispatch(handleGetBootstrapTargetGroups());
  }, []);
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
