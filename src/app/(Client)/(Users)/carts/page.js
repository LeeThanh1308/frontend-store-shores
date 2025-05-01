"use client";

import { FaCartShopping, FaXmark } from "react-icons/fa6";
import {
  cartsSelector,
  handleDeleteCart,
  handleUpdateCart,
} from "@/services/redux/Slices/carts";
import {
  formatCurrencyVND,
  generateUrlImage,
  handleConvertPrice,
} from "@/services/utils";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";

import Image from "next/image";
import InputQuantitySpinner from "@/components/ui/InputQuantitySpinner";
import Link from "next/link";
import Responsive from "@/components/layout/Responsive";
import { authSelector } from "@/services/redux/Slices/auth";

function CartPage() {
  const dispatch = useDispatch();
  const { carts } = useSelector(cartsSelector);
  const { isAuthenticated } = useSelector(authSelector);

  const { totalCost, totalSale, totalSave, totalQuantity } = useMemo(() => {
    if (!carts?.items?.length) return {};
    return carts?.items?.reduce(
      (acc, item) => {
        const totalSellingPrice = +item?.sellingPrice * +item?.quantity;
        acc.totalCost += totalSellingPrice;
        acc.totalSale += totalSellingPrice * (1 - item?.discount / 100);
        acc.totalSave += acc.totalCost - acc.totalSale;
        acc.totalQuantity += +item?.quantity;
        return acc;
      },
      {
        totalCost: 0,
        totalSale: 0,
        totalSave: 0,
        totalQuantity: 0,
      }
    );
  }, [carts]);

  return (
    <Responsive>
      <div className="w-full flex text-lg text-black/70 py-3 font-dancing-script">
        {/* San pham */}
        <div className="w-full">
          {carts?.items?.length === 0 ? (
            <div className="flex justify-center items-center pt-24">
              <div className="h-80 aspect-video relative">
                <Image
                  src={"/images/empty-cart.webp"}
                  alt="empty carts"
                  layout="fill"
                />
              </div>
            </div>
          ) : (
            <div className=" flex justify-between gap-4">
              <div className=" flex-[0.7]">
                {carts?.items?.map((_, index) => (
                  <div
                    className="text-sm text-gray-500 flex py-2 items-center"
                    key={index}
                  >
                    <div className="w-3/6 flex items-center" key={index}>
                      <Image
                        className="w-14 h-14 rounded mr-2 text-xs"
                        src={generateUrlImage(_?.image)}
                        alt="image"
                        width={56}
                        height={56}
                        objectFit="cover"
                      />
                      <div className="truncate w-3/5 ...">
                        <div className="">{_.name}</div>
                        <div>Size: {_.size.type}</div>
                      </div>
                    </div>
                    <div className="w-1/6 text-start text-rose-500">
                      {formatCurrencyVND(_.sellingPrice)}
                    </div>
                    <div className="w-1/6 flex justify-center items-center">
                      <InputQuantitySpinner
                        defaultValue={_?.quantity}
                        max={_?.sold?.inventory}
                        onOption={(quantity) =>
                          dispatch(handleUpdateCart({ id: _?.id, quantity }))
                        }
                      />
                    </div>
                    <div className="w-1/6 text-end text-green-500">
                      {formatCurrencyVND(
                        _.sellingPrice * _.quantity * (1 - _.discount / 100)
                      )}
                    </div>

                    <div className="w-1/12 flex items-center justify-center group">
                      <div
                        className="w-5 h-5 rounded-full text-black/70 text-sm flex justify-center cursor-pointer items-center bg-rose-500"
                        onClick={() =>
                          dispatch(handleDeleteCart({ id: _?.id }))
                        }
                      >
                        {
                          <FaXmark className=" hidden group-hover:block text-white" />
                        }
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  className="text-rose-500 my-2 mx-4 cursor-pointer"
                  onClick={() => {
                    dispatch(handleDeleteCart({ clears: true }));
                  }}
                >
                  Xoá giỏ hàng
                </div>
              </div>
              <div className=" flex-[0.3]">
                <div className="w-full flex justify-between mb-2">
                  <div>Tạm tính giỏ hàng: </div>
                  <div className=" text-red-500">
                    {formatCurrencyVND(totalCost)}
                  </div>
                </div>
                <div className="w-full flex justify-between mb-2">
                  <div>Tạm tính sản phẩm khuyến mãi: </div>
                  <div
                    className={`${
                      totalSale < totalCost ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    {formatCurrencyVND(totalSale)}
                  </div>
                </div>
                <div className="w-full flex justify-between mb-2">
                  <div>Tiết kiệm được: </div>
                  <div
                    className={`${
                      totalSave ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    {formatCurrencyVND(totalSave)}
                  </div>
                </div>
                <div className="w-full flex justify-between mb-2">
                  <div>Phí vận chuyển: </div>
                  <div className=" text-red-500">0đ</div>
                </div>
                <div className="w-full flex justify-between mb-2">
                  <div>Tổng sản phẩm: </div>
                  <div className=" text-red-500">{totalQuantity}</div>
                </div>
                <div className="w-full flex justify-between  mb-2 border-t border-rose-500">
                  <div>Thành tiền: </div>
                  <div className=" text-rose-500 font-bold font-roboto">
                    {formatCurrencyVND(carts?.total)}
                  </div>
                </div>
                {isAuthenticated ? (
                  <Link href="/pay">
                    <div className="w-full h-10 border bg-red-500 flex justify-center items-center font-bold text-white rounded-lg cursor-pointer hover:bg-red-500/70">
                      Thanh toán: {handleConvertPrice(carts?.total)}
                    </div>
                  </Link>
                ) : (
                  <div
                    onClick={() => {
                      Toastify(
                        1,
                        "Vui lòng đăng nhập để sử dụng chức năng này."
                      );
                    }}
                    className="w-full h-10 border bg-red-500 flex justify-center items-center font-bold text-white rounded-lg cursor-pointer hover:bg-red-500/70"
                  >
                    THANH TOÁN: {formatCurrencyVND(bill?.total)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Responsive>
  );
}

export default CartPage;
