'use client'

import React from 'react'
import { motion } from "framer-motion";

export function MotionVariant({ variants, className, ...props }) {
  return (
    <motion.div variants={variants} className={className} {...props}/>
  )
}
