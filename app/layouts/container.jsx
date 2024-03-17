'use client'

import clsx from 'clsx'

const widthType = {
  'none': '',
  'default': 'xl:w-full',
  'max-w-prose': 'container max-w-prose',
  'max-w-screen-sm': 'container max-w-screen-sm',
  'max-w-screen-md': 'container max-w-screen-md',
  'max-w-screen-lg': 'container max-w-screen-lg',
  'max-w-screen-xl': 'container max-w-screen-xl',
  'max-w-screen-2xl': 'container max-w-screen-2xl',
  'max-w-full': 'container max-w-full',
  'max-w-xs': 'container max-w-xs',
  'max-w-sm': 'container max-w-sm',
  'max-w-md': 'container max-w-md',
  'max-w-lg': 'container max-w-lg',
  'max-w-xl': 'container max-w-xl',
  'max-w-2xl': 'container max-w-xl',
  'max-w-3xl': 'container max-w-3xl',
  'max-w-4xl': 'container max-w-4xl',
  'max-w-5xl': 'container max-w-5xl',
  'max-w-6xl': 'container max-w-6xl',
  'max-w-7xl': 'container max-w-7xl',
}

const marginType = {
  'default': '',
  'hero' : '',
  'section': 'py-24 lg:py-28'
}

export function Container({ width = 'default', margin = 'default', className, ...props }) {
  return <div className={clsx(widthType[width], marginType[margin], className)} {...props} />
}
