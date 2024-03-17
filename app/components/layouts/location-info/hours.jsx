'use client'

import _ from 'lodash';
import React from 'react'

export function Hours({ data, location, styles }) {
  return ( 
    <div>
      <span className={`block ${styles.title}`}>{data.name}</span>
      <div className={styles.contentText} dangerouslySetInnerHTML={{__html: _.get(location, 'fields.hours')}}/>
    </div>
  )
}