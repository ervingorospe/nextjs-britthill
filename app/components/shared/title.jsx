'use client'

import React from 'react'
import clsx from 'clsx'
import { motion } from "framer-motion";
// component
import * as TitleComponent from '@/components/shared/title-tags'
// function
import { formatComponentName } from '@/function/formatting'

const titleAlign = {
  'default': '',
  'text-left': 'text-left',
  'text-center': 'text-center',
  'text-right': 'text-right',
  'text-justify': 'text-justify'
}

const titleSizes = {
  'default': 'text-4xl md:text-6xl',
  'default-subtitle': 'text-xl md:text-2xl',
  'default-inverted': 'text-4xl md:text-6xl',
  'default-subtitle-inverted': 'text-xl md:text-2xl',
  'hero-title': 'text-3xl md:text-6xl',
  'hero-subtitle': 'text-xl md:text-4xl',
  'call-to-action': 'text-4xl md:text-6xl',
  'call-to-action-subtitle': 'text-xl md:text-2xl',
  'text-xs': 'text-xs',
  'text-sm': 'text-sm',
  'text-base': 'text-base',
  'text-lg': 'text-lg',
  'text-xl': 'text-xl',
  'text-2xl': 'text-2xl',
  'text-3xl': 'text-3xl',
  'text-4xl': 'text-4xl',
  'text-5xl': 'text-5xl',
  'text-6xl': 'text-6xl',
  'text-7xl': 'text-7xl',
  'text-8xl': 'text-8xl',
  'text-9xl': 'text-9xl',
  'form-title': 'text-2xl md:text-4xl',
  'form-title-subtitle': 'text-xl'
}

const titleStyle = {
  'default': 'font-heading text-gray-900',
  'default-subtitle': 'font-normal uppercase tracking-wide text-primary-600',
  'default-inverted': 'font-heading font-bold text-white',
  'default-subtitle-inverted': 'font-normal uppercase tracking-wide text-gray-300',
  'hero-title': 'font-heading text-white',
  'hero-subtitle': 'font-normal uppercase uppercase tracking-wide text-primary-400',
  'call-to-action-subtitle': 'font-normal uppercase tracking-wide text-primary-300',
  'call-to-action': 'max-w-5xl font-heading text-white',
  'form-title': 'font-heading text-gray-900',
  'form-title-subtitle': 'font-normal uppercase tracking-wide text-primary-600'
}

export function Title({ title, tag = "default", align = "default", style = "default", size = "default", variants, className }) {
  if (title) {
    const TitleType = TitleComponent[formatComponentName(tag)];

    return (
      <motion.div variants={variants}>
        <TitleType title={title} styles={clsx(titleStyle[style], titleSizes[size], titleAlign[align], className)}/>
      </motion.div>
    )
  }
}
