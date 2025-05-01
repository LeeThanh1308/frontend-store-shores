"use client";

import {
  bootstrapReducer,
  bootstrapSelector,
  handleGetProductBrands,
  handleGetTrendingProducts,
} from "@/services/redux/Slices/bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Image from "next/image";
import ProductSection from "@/components/sections/ProductSection";
import Responsive from "@/components/layout/Responsive";
import SliderShowImage from "@/components/sections/SliderShowImage/SliderShowImage";
import { generateUrlImage } from "@/services/utils";

const ImageStore = [
  "/slides/vutru1.webp",
  "/slides/coder.webp",
  "/slides/cotrang.webp",
  "/slides/hiendai.webp",
  "/slides/kysi.webp",
  "/slides/tienhiep1.webp",
  "/slides/marvel.webp",
  "/slides/tienhiep3.webp",
  "/slides/hiendai1.webp",
  "/slides/nguyenthuy1.webp",
  "/slides/tienhiep.webp",
  "/slides/marvel1.webp",
  "/slides/cotrang1.webp",
  "/slides/tienhiep2.webp",
  "/slides/vutru.webp",
];
function Page() {
  const dispatch = useDispatch();
  const { trendings, productBrands } = useSelector(bootstrapSelector);
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    if (trendings?.products?.length == 0) {
      dispatch(handleGetTrendingProducts());
    }
    if (productBrands?.length == 0) {
      dispatch(handleGetProductBrands());
    }
  }, []);
  return (
    <div>
      <Responsive>
        <div className=" w-full h-[40vh] relative z-10 flex justify-between gap-1 mt-3">
          <div className="w-3/4 relative rounded-sm overflow-hidden h-full">
            <SliderShowImage
              data={ImageStore}
              speed={5000}
              onActiveImage={setActiveImage}
            />
          </div>
          <div className="w-1/4 flex flex-col gap-1">
            <div className=" flex-1 w-full rounded-sm bg-black overflow-hidden relative">
              <Image
                src={
                  ImageStore?.[
                    ImageStore.length >= activeImage + 2 ? activeImage + 1 : 0
                  ]
                }
                layout="fill"
                alt="banner"
              />
            </div>
            <div className=" flex-1 w-full rounded-sm bg-black overflow-hidden relative">
              <Image
                src={
                  ImageStore?.[
                    ImageStore.length >= activeImage + 2 ? activeImage + 2 : 1
                  ]
                }
                layout="fill"
                alt="banner"
              />
            </div>
          </div>
        </div>

        <ProductSection title="Sản phẩm bán chạy" data={trendings?.products} />

        {productBrands.map((_) => {
          return <ProductSection title={`${_.name}`} data={_?.products} />;
        })}
      </Responsive>
    </div>
  );
}

export default Page;
