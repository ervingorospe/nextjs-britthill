'use client'

import React from 'react'
import clsx from 'clsx'
import { motion } from "framer-motion";
import { containerMotion } from "@/function/framer-animation";

export function Motion({ className, ...props }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerMotion} className={clsx(className)} {...props}/>
  )
}
