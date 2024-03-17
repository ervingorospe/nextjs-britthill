'use client'

import React from 'react'
import Image from 'next/image'
import _ from 'lodash'
import { motion } from "framer-motion";
// function
import { fadeInFromBottom } from "@/function/framer-animation";

export function GalleryImage({ data, styles, openModal, index }) {
  return (
    <motion.div 
      className={`${styles.container} group cursor-pointer overflow-hidden`}
      variants={fadeInFromBottom}
      onClick={() => openModal(index)}
    >
      <div className="z-1 absolute inset-0 bg-black opacity-0 group-hover:opacity-50 ease-in-out duration-300"></div>
      <Image
        src={_.get(data, 'file.imageUrl')}
        alt={_.get(data, 'fields.altText')}
        height={1500}
        width={1500}
        priority={true}
        className={`${styles.image} transform transition duration-500 ease-in-out group-hover:scale-110 aspect-wider`}
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10"></div>
    </motion.div>
  )
}
