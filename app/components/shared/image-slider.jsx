'use client'

import React from 'react';
import Image from 'next/image'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import _ from 'lodash'
import { Autoplay, Pagination, Navigation } from 'swiper';

export function BgImageFadeSlider({ images, className }) {
  return (
    <>
      <Swiper
        spaceBetween={0}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={false}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={`${className.container} mySwiper`}
      >
        {images.map((image, idx) => (
           <SwiperSlide
            key={idx}
             className={className.div}
          >
             <Image src={_.get(image, 'file.imageUrl')} alt="Britt Hill" height={1000} width={1000} className={className.image}/>
           </SwiperSlide>
         ))}
      </Swiper>
    </>
  );
}