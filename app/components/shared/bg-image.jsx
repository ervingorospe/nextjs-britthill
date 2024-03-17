import React from 'react'
import _ from 'lodash'

export function BgImage({ backgroundImage, className, styles }) {
  return (
    _.get(backgroundImage, 'imageUrl') &&  (
      <div className={className}
        style={{ 
          backgroundImage: `url(${_.get(backgroundImage, 'imageUrl')})`, 
          ...styles
        }}
      />
    )
  )
}