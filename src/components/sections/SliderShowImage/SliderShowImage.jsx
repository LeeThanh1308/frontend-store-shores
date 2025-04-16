"use client";

import React, { memo, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./stylesSliderShowImage.css";
// import required modules
import {
  EffectCoverflow,
  EffectFade,
  Pagination,
  Autoplay,
} from "swiper/modules";
import Image from "next/image";
function SliderShowImage({ data }) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={1}
      pagination={true}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[EffectCoverflow, Pagination, Autoplay]}
      className=" w-full h-full relative z-0"
    >
      {data.map((_, i) => {
        return (
          <SwiperSlide key={i}>
            <Image src={_} alt="slider show" objectFit="cover" layout="fill" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default memo(SliderShowImage);
