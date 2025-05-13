"use client";

import {
  bootstrapSelector,
  handleGetProductBrands,
  handleGetTrendingProducts,
} from "@/services/redux/Slices/bootstrap";
import {
  handleGetSliders,
  sliderSelector,
} from "@/services/redux/Slices/sliders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Image from "next/image";
import ProductSection from "@/components/sections/ProductSection";
import Responsive from "@/components/layout/Responsive";
import SliderShowImage from "@/components/sections/SliderShowImage/SliderShowImage";
import { generateUrlImage } from "@/services/utils";

function Page() {
  const dispatch = useDispatch();
  const { trendings, productBrands } = useSelector(bootstrapSelector);
  const { sliders } = useSelector(sliderSelector);
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    if (trendings?.products?.length == 0) {
      dispatch(handleGetTrendingProducts());
    }
    if (productBrands?.length == 0) {
      dispatch(handleGetProductBrands());
    }
    if (sliders?.length == 0) {
      dispatch(handleGetSliders());
    }
  }, []);
  return (
    <div>
      <Responsive>
        <div className=" w-full h-[40vh] relative z-10 flex justify-between gap-1 mt-3 mb:mt-0">
          <div className="tl:w-3/4 mb:w-full relative rounded-sm overflow-hidden h-full">
            <SliderShowImage
              data={sliders}
              speed={5000}
              onActiveImage={setActiveImage}
            />
          </div>
          <div className="w-1/4 flex flex-col gap-1 mb:hidden lt:flex tl:flex">
            <div className=" flex-1 w-full rounded-sm overflow-hidden relative">
              <Image
                src={generateUrlImage(
                  sliders?.[
                    sliders.length >= activeImage + 2 ? activeImage + 1 : 0
                  ]?.src
                )}
                layout="fill"
                alt="banner"
              />
            </div>
            <div className=" flex-1 w-full rounded-sm overflow-hidden relative">
              <Image
                src={generateUrlImage(
                  sliders?.[
                    sliders?.length >= activeImage + 2 ? activeImage + 2 : 1
                  ]?.src
                )}
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
