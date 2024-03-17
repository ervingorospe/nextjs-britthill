/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { motion } from "framer-motion";
// component
import { ImageHolder } from '@/components/shared'
// function
import { fadeInFromBottom } from "@/function/framer-animation";

export function ReviewCard({ data }) {
  const { fields } = data

  return (
    <motion.div variants={fadeInFromBottom} className="pt-8 sm:inline-block sm:w-full sm:px-4">
      <figure className="border bg-gray-50 p-8 text-sm leading-6 2xl:p-10">
        <blockquote className="text-gray-900">
          <p>“{fields.reviewBody}”</p>
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-x-4">
          {
            fields.image && (
              <ImageHolder
                image={fields.image} 
                className={{
                  figure: "",
                  image: "h-10 w-10 rounded-full bg-gray-50"
                }}
              />
            )
          }
          
          <div className="leading-snug">
            <div className="font-semibold text-gray-900">{data.name}</div>
            <div className="text-gray-600">Client Testimonial</div>
          </div>
        </figcaption>
      </figure>
    </motion.div>
  )
}
