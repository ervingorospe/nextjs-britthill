'use client'

import React from 'react'
import clsx from 'clsx'

const background = {
  'default': 'bg-transparent',
  'transparent': 'bg-transparent',
  'gray-700': 'bg-gray-700',
  'primary-600': 'bg-primary-600',
  'white': 'bg-white',
  'gray-50': 'bg-gray-50',
  'gray-100': 'bg-gray-100',
  'gray-200': 'bg-gray-200',
  'gray-300': 'bg-gray-300',
  'gray-400': 'bg-gray-400',
  'gray-500': 'bg-gray-500',
  'gray-600': 'bg-gray-600',
  'gray-700': 'bg-gray-700',
  'gray-800': 'bg-gray-800',
  'gray-900': 'bg-gray-900',
  'black': 'bg-black',
  'vibrant-shade': 'bg-vibrant-shade'
}

export function Section({ bg = 'default', className, ...props }) {
  return <section className={clsx(background[bg], className)} {...props} />
}
