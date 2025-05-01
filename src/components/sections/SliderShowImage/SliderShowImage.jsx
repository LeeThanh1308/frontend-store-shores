"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./stylesSliderShowImage.css";

import {
  Autoplay,
  EffectCoverflow,
  EffectFade,
  Pagination,
} from "swiper/modules";
import React, { memo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";

function SliderShowImage({ data, onActiveImage = (index) => {}, ...props }) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={1}
      pagination={true}
      onActiveIndexChange={(swiper) => onActiveImage(swiper?.activeIndex)}
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
      {...props}
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
