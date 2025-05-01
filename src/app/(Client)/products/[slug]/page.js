"use client";

import {
  generateUrlImage,
  getDistanceFromLatLonInKm,
  handleConvertPrice,
} from "@/services/utils";
import { useEffect, useState } from "react";

import { BsFillLightningFill } from "react-icons/bs";
import { Button } from "antd";
import Comments from "@/components/sections/Comments";
import { FaStar } from "react-icons/fa6";
import GuestRequest from "@/services/axios/GuestRequest";
import Image from "next/image";
import InputQuantitySpinner from "@/components/ui/InputQuantitySpinner";
import IsArray from "@/components/ui/IsArray";
import { LiaDirectionsSolid } from "react-icons/lia";
import Link from "next/link";
import Responsive from "@/components/layout/Responsive";
import { RiTimeFill } from "react-icons/ri";
import SlideProduct from "@/components/sections/SlideProduct";
import { TiLocation } from "react-icons/ti";
import Toastify from "@/components/sections/Toastify";
import { handleCreateCart } from "@/services/redux/Slices/carts";
import { number } from "zod";
import { useDispatch } from "react-redux";
import { useGeolocated } from "react-geolocated";
import { useParams } from "next/navigation";

function DetailProductPage() {
  const dispatch = useDispatch();
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const { slug } = useParams();
  const [productData, setProductData] = useState({});
  const [quantity, setQuantity] = useState();
  const [activeColor, setActiveColor] = useState(0);
  const [activeType, setActiveType] = useState(undefined);
  const [filterReviewStars, setFilterReviewStars] = useState();
  const [showFullProduct, setShowFullProduct] = useState({
    status: false,
    index: 0,
  });

  const sortedBranches = isGeolocationEnabled
    ? [...(productData?.sizes?.[activeType]?.branches || [])].sort((a, b) => {
        const distA = getDistanceFromLatLonInKm(
          coords?.latitude,
          coords?.longitude,
          a?.latitude,
          a?.longitude
        );
        const distB = getDistanceFromLatLonInKm(
          coords?.latitude,
          coords?.longitude,
          b?.latitude,
          b?.longitude
        );
        return distA - distB; // tăng dần
      })
    : productData?.sizes?.[activeType]?.branches;
  console.log(sortedBranches);
  useEffect(() => {
    if (!showFullProduct.status) {
      window.scrollTo(0, 100);
    }
  }, [showFullProduct.status]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GuestRequest.get("products", {
        params: {
          slug,
        },
      });
      getPosition();
      setProductData(response.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className=" min-h-screen">
        <Responsive className="py-3 font-dancing-script">
          <div className="relative flex justify-between gap-4 p-4 h-fit">
            <div className=" w-6/11">
              <div className="sticky top-0 px-2">
                <SlideProduct
                  data={productData?.images ?? []}
                  onShowFull={setShowFullProduct}
                  scrollToSlider={productData?.images?.findIndex((_) => {
                    if (
                      +_?.id ==
                      +productData?.colors?.[activeColor]?.images?.[0]?.id
                    )
                      return _;
                  })}
                />
              </div>
            </div>
            <div className="w-5/11 flex-col flex gap-2">
              <div className=" font-medium text-base flex gap-1">
                <h1 className="font-bold font-roboto">Thương hiệu: </h1>
                <h2 className=" text-blue-700">{productData?.brand?.name}</h2>
              </div>
              <h1 className=" text-2xl text-gray-950 font-medium">
                {productData?.name}
              </h1>

              {/* <div className=" w-full flex items-center text-[#4a4f63]">
                <div className="sku">
                  <span className="text-base font-normal cursor-pointer hover:opacity-70 transition-all duration-300">
                    {productData?.sku}
                  </span>
                </div>
                <div className=" w-1 h-1 rounded-full bg-gray-400 mx-1.5"></div>
                <div className=" flex items-center gap-0.5">
                  <span>{productData?.reviews?.star ?? 0}</span>
                  <FaStar className="text-yellow-500 text-sm" />
                </div>
                <div className=" w-1 h-1 rounded-full bg-gray-400 mx-1.5"></div>
                <span className=" text-blue-700 text-base">
                  {productData?.reviews?.items?.length} đánh giá
                </span>
                <div className=" w-1 h-1 rounded-full bg-gray-400 mx-1.5"></div>
                <span className=" text-blue-700 text-base">
                  {productData?.comments?.length} bình luận
                </span>
              </div> */}
              {/* Giá */}
              <div className=" text-blue-700 text-4xl font-semibold flex items-end gap-2 my-2">
                <span>
                  {handleConvertPrice(productData?.sellingPrice ?? 0)}
                </span>
              </div>

              <div className=" font-medium text-base flex flex-col gap-1">
                <h1 className="font-bold font-roboto">Màu sắc: </h1>
                <div className="flex flex-wrap gap-2">
                  {productData?.colors?.map((_, index) => {
                    return (
                      <div
                        key={index}
                        className={`w-16 h-16 rounded-lg overflow-hidden relative ${
                          activeColor == index && ""
                        }`}
                        style={{
                          borderColor: _?.hexCode,
                          boxShadow:
                            activeColor == index &&
                            `0 5px 10px -3px ${_?.hexCode}, 0 4px 6px -4px ${_?.hexCode}`,
                        }}
                        onClick={() => setActiveColor(index)}
                      >
                        <Image
                          src={generateUrlImage(_?.images?.[0]?.src)}
                          alt="colors"
                          layout="fill"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className=" font-medium text-base flex flex-col gap-1">
                <h1 className="font-bold font-roboto">Size: </h1>
                <div className="flex flex-wrap gap-2">
                  {productData?.sizes?.map((_, index) => {
                    return (
                      <div
                        className={` rounded-sm py-0.5 px-5 border border-gray-400 ${
                          activeType == index
                            ? "bg-slate-950 text-white font-bold"
                            : "hover:bg-slate-500 hover:text-white cursor-pointer"
                        } ${_?.inventory <= 0 && `opacity-20`}`}
                        onClick={() => {
                          getPosition();
                          setActiveType(index);
                        }}
                      >
                        <span>{_?.type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className=" font-medium text-base flex flex-col gap-1">
                <h1 className="font-bold font-roboto">Số lượng: </h1>
                <div
                  className={`${
                    typeof activeType !== "number" && "opacity-25"
                  }`}
                >
                  <InputQuantitySpinner
                    max={+productData?.sizes?.[activeType]?.inventory}
                    onOption={(quantity) => setQuantity(quantity)}
                  />
                </div>
              </div>

              <div className=" flex justify-between gap-2 mt-2">
                <Button className=" w-full">Mua ngay</Button>
                <Button
                  onClick={() => {
                    if (
                      +productData?.colors?.[activeColor]?.id &&
                      +productData.sizes?.[activeType]?.id
                    ) {
                      dispatch(
                        handleCreateCart({
                          colorID: +productData?.colors?.[activeColor]?.id,
                          sizeID: +productData.sizes?.[activeType]?.id,
                          quantity,
                        })
                      );
                    } else {
                      if (!productData?.colors?.[activeColor]?.id) {
                        Toastify(0, "Vui lòng chọn màu sắc sản phẩm.");
                      }
                      if (!productData.sizes?.[activeType]?.id) {
                        Toastify(0, "Vui lòng chọn kích thước sản phẩm.");
                      }
                    }
                  }}
                  className="w-full"
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>

              {/* Cửa hàng gần nhất */}
              <IsArray data={productData.sizes?.[activeType]?.branches}>
                <div className=" border border-gray-300 rounded-lg w-full text-sm font-medium my-3">
                  <div className=" p-3">
                    <h1 className=" text-slate-800 py-2">
                      Gợi ý cửa hàng gần bạn
                    </h1>

                    <div className=" flex flex-col gap-2 pt-2">
                      {productData.sizes?.[activeType]?.branches?.map(
                        (_, index) => {
                          return (
                            <div
                              key={index}
                              className={`flex justify-between items-center pb-2 ${
                                index < 2 && "border-b border-gray-300"
                              }`}
                            >
                              <div className=" flex flex-col gap-1">
                                <div className=" flex items-center gap-2">
                                  <h1 className=" text-base text-slate-950 font-semibold">
                                    {_?.name}{" "}
                                  </h1>

                                  <div className=" text-green-500">
                                    <div className="flex items-center gap-1">
                                      <div className=" w-2 h-2 rounded-full bg-green-500"></div>
                                      <span className=" text-sm">Có hàng</span>
                                    </div>
                                  </div>
                                </div>
                                <div className=" flex items-center gap-2 font-normal text-sm">
                                  <TiLocation className=" text-gray-500" />
                                  <span className=" font-medium">
                                    {_?.address}
                                  </span>

                                  <span className="font-bold">
                                    {isGeolocationEnabled &&
                                      getDistanceFromLatLonInKm(
                                        coords?.latitude,
                                        coords?.longitude,
                                        _?.latitude,
                                        _?.longitude
                                      )}
                                    KM
                                  </span>
                                </div>
                              </div>
                              <a
                                href={`https://www.google.com/maps?q=${_?.latitude},${_?.longitude}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.open(
                                    `https://www.google.com/maps?q=${_?.latitude},${_?.longitude}`
                                  );
                                }}
                              >
                                <div className=" text-blue-700 font-medium text-sm flex-center gap-1">
                                  <LiaDirectionsSolid />
                                  <span>Chỉ đường</span>
                                </div>
                              </a>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </IsArray>

              <div
                className="ql-editor text-xl"
                dangerouslySetInnerHTML={{ __html: productData?.description }}
              />
            </div>
          </div>

          {/* Đánh giá sản phẩm */}
          {/* <div className="mt-8 p-3 text-lg font-semibold bg-white rounded-lg">
            <div className=" flex items-center gap-2 mb-4 pb-3">
              <span className="">Đánh giá sản phẩm</span>
              <span className=" text-slate-500 text-base font-normal">
                {productData?.reviews.items.length} đánh giá
              </span>
            </div>
            <div className=" border-y border-gray-300 py-3 flex gap-8">
              <div className=" flex flex-col gap-2 w-fit">
                <h2 className=" font-medium text-base text-slate-800">
                  Trung bình
                </h2>
                <div className=" flex items-center gap-0.5 text-4xl">
                  <span>{productData?.reviews.star || 0}</span>
                  <FaStar className="text-orange-500 text-xl" />
                </div>
                <Button
                  className=" bg-blue-700 text-white font-medium"
                  text="Gửi đánh giá"
                />
              </div>

              <div className=" flex gap-2">
                <div className=" flex-1 flex flex-col items-center gap-2">
                  {FackData.slice(0, 5).map((_, index) => {
                    const currentTotalStar = productData?.reviews.items.filter(
                      (value) => {
                        if (value.score == 5 - index) return value;
                      }
                    ).length;

                    console.log(currentTotalStar);
                    return (
                      <div key={index} className=" flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {FackData.slice(0, 5).map((star, ix) => {
                            const starActive = 5 - index;
                            return (
                              <FaStar
                                key={ix}
                                size={14}
                                className={`${
                                  ix >= starActive
                                    ? "text-slate-500"
                                    : "text-orange-500"
                                }`}
                              />
                            );
                          })}
                        </div>
                        <div className="h-2 w-52 rounded-full bg-gray-300 overflow-hidden">
                          <div
                            className={`h-full bg-orange-500 rounded-full ${
                              productData?.reviews.items && currentTotalStar
                                ? `w-[${
                                    (100 / productData?.reviews.items.length) *
                                    currentTotalStar
                                  }%]`
                                : `w-0`
                            }`}
                          ></div>
                        </div>

                        <span className=" text-sm font-normal">
                          {currentTotalStar}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className=" py-3">
              <div className=" flex items-center gap-3">
                <span className=" font-normal text-base">Lọc theo:</span>
                <div>
                  {FackData.slice(0, 5).map((it, ix) => {
                    const currentStar = 5 - ix;
                  })}
                </div>
              </div>
              {productData?.reviews.items.map((_, key) => {
                if (filterReviewStars) {
                  if (_.score === filterReviewStars) return <Comments {..._} />;
                } else {
                  return <Comments {..._} />;
                }
              })}
            </div>
          </div>

          <div className="mt-8 p-3 text-lg font-semibold bg-white rounded-lg">
            <div className=" flex items-center gap-2 mb-4 pb-3">
              <span className="">Hỏi đáp</span>
              <span className=" text-slate-500 text-base font-normal">
                ( {productData?.comments.length} bình luận )
              </span>
            </div>

            <div className=" py-3">
              <div className=" flex items-center gap-3">
                <span className=" font-normal text-base">Lọc theo:</span>
                <div></div>
              </div>
              {productData?.comments.map((_, key) => {
                return <Comments {..._} key={key} />;
              })}
            </div>
          </div> */}
        </Responsive>
      </div>
    </>
  );
}

export default DetailProductPage;
