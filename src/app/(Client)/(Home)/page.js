"use client";

import Responsive from "@/components/layout/Responsive";
import ProductItem from "@/components/sections/ProductItem";
import SliderShowImage from "@/components/sections/SliderShowImage/SliderShowImage";
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
  return (
    <div>
      <Responsive>
        <div className=" w-full h-[80vh] relative z-10">
          <SliderShowImage data={ImageStore} />
        </div>

        <div className=" mt-8 min-h-screen">
          <div className=" flex items-center justify-center">
            <div className="h-0.5 flex-[0.3] bg-rose-700"></div>
            <h2 className=" shrink-0 font-great font-bold text-3xl text-center text-rose-700 px-8">
              Sản phẩm bán chạy
            </h2>
            <div className="h-0.5 flex-[0.3] bg-rose-700"></div>
          </div>

          <div className=" grid grid-cols-5 gap-3">
            <ProductItem
              brand="Nike"
              name="Giày Nike Air Jordan 1 Retro Low OG ‘Mocha’ [CZ0858 102]"
            />
          </div>
        </div>
      </Responsive>
    </div>
  );
}

export default Page;
