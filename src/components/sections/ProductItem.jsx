"use client";

import { handleConvertPrice } from "@/services/utils";
import { ConfigProvider, Rate } from "antd";
import { useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";

function ProductItem({ isLike = false, brand = "", name = "" }) {
  const [Like, setIsLike] = useState(isLike);
  return (
    <div className="font-dancing-script text-rose-500 text-xl rounded-xl bg-white shadow-md hover:shadow-lg shadow-black/25 p-3 transition-shadow space-y-2 relative overflow-hidden">
      <div className=" absolute top-0 left-0 px-3 py-0.5 z-20 bg-rose-500 rounded-br-xl text-sm font-roboto font-bold text-white">
        20%
      </div>
      {/* Hình ảnh sản phẩm */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <div
          className="absolute top-2 right-2 cursor-pointer rounded-full p-1 transition"
          onClick={() => setIsLike(!Like)}
        >
          {Like ? (
            <GoHeartFill className="text-rose-500" size={20} />
          ) : (
            <FaRegHeart className="text-gray-500" size={20} />
          )}
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">{brand}</h2>
        <div className="flex items-center gap-1">
          <span className="text-lg font-medium text-gray-700">5</span>
          <FaStar size={14} className="text-rose-500" />
        </div>
      </div>

      <p className="text-gray-800 line-clamp-3">{name}</p>

      {/* Giá sản phẩm */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-red-500">
          {handleConvertPrice(500000000)}
        </h2>
      </div>
    </div>
  );
}

export default ProductItem;
