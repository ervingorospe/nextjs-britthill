'use client'

import React from 'react'
import Link from 'next/link'
import _ from 'lodash'

export function Address({ data, location, styles }) {
  return ( 
    <div>
      <span className={`block ${styles.title}`}>{data.name}</span>
      <div className={`mt-3 ${styles.contentText}`}>
        <span className="block">
          {_.get(location, 'fields.address.address') && (
            <>
              {_.get(location, 'fields.address.address')} <br/>
            </>
            
          )} 

          {_.get(location, 'fields.address.address2') && (
            <>
              {_.get(location, 'fields.address.address2')} <br/>
            </>
          )}
         
          {_.get(location, 'fields.address.city')}, {_.get(location, 'fields.address.state')} {_.get(location, 'fields.address.zip')} {_.get(location, 'fields.address.country')}
        </span>
        <Link href={_.get(location, 'fields.googleMapUrl')} target="_blank" rel="noreferrer" className={styles.buttonStyle}>
          Get Directions
        </Link>
      </div>
    </div>
  )
}