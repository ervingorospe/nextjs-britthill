import React from 'react'
import _ from 'lodash'
import Link from 'next/link'
// layout
import { MotionVariant } from '@/app/layouts'
import clsx from 'clsx'

const buttonStyles = {
  'hero': 'button-outlined inline-flex border-white text-white hover:bg-white hover:text-gray-700',
  'default' : 'button inline-flex border-gray-300 text-gray-700 hover:border-gray-700 hover:text-gray-900 focus:ring-gray-500',
  'text-button' : 'flex items-center text-header-button hover:text-link-hover text-sm md:text-lg',
  'footer-button': 'button flex w-full border-white text-white hover:bg-white hover:text-secondary-900 focus:ring-white md:w-auto',
  'button-primary' : 'button flex bg-primary-500 text-white hover:bg-primary-600 hover:text-white focus:ring-primary-700 max-w-lg',
  'button-gray' : 'button bg-primary-500 text-white hover:bg-primary-600 hover:text-white focus:ring-primary-700 max-w-lg',
  'button-gray-light-outlined' : 'button bg-primary-500 text-white hover:bg-primary-600 hover:text-white focus:ring-primary-700 max-w-lg',
  'button-gray-outlined' : 'button bg-primary-500 text-white hover:bg-primary-600 hover:text-white focus:ring-primary-700 max-w-lg',
  'button-outlined' : 'button bg-primary-500 text-white hover:bg-primary-600 hover:text-white focus:ring-primary-700 max-w-lg',
  'button-primary-outlined' : 'button bg-primary-500 text-white hover:bg-primary-600 hover:text-white focus:ring-primary-700 max-w-lg',
  'call-to-action': 'button border-primary-300 text-white hover:border-white'
}

const buttonSizes = {
  'default' : 'text-base',
  'text-xs' : 'text-xs',
  'text-sm' : 'text-sm',
  'text-base' : 'text-base',
  'text-lg' : 'text-lg',
  'text-xl' : 'text-xl',
  'text-2xl' : 'text-2xl'
}

export function CallToActionButton({ data, className, variants, size = "default", styles, navigation }) {
  if (data.button) {
    let buttonDetails = {
      ..._.get(data, 'button'),
      url: _.get(data, 'button.url') ? _.get(data, 'button.url') : '/'
    }
  
    const getNavigation = () => {
      const url = _.find(navigation, path => path.id === data.buttonPageLink)
  
      return {
        ..._.get(data, 'button'),
        url: _.get(url, 'slug') ? _.get(url, 'slug') : '/'
      }
    }
  
    if (data.buttonPageLink) {
      buttonDetails = getNavigation()
    }

    return (
      <MotionVariant variants={variants}>
        <Link className={clsx(buttonStyles[styles], buttonSizes[size], className)} href={buttonDetails.url} target={buttonDetails.target}>{buttonDetails.text}</Link>
      </MotionVariant>
    )
  }
}
