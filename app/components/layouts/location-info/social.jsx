' use client '

import React from 'react'
import _ from 'lodash'
// platform sections
import * as SocialPlatform from '@/components/shared/socialmedia-platform'
// lib
import { capitalizeFirstLetter } from '@/function/formatting'

export function Social({ data, socialMedia, styles }) {
  return (
    <div>
      <p className={styles.title}>{data.name}</p>
      <div className="mt-3 flex justify-center space-x-5">
        {
          socialMedia?.map((item, i) => {
            const ComponentType = SocialPlatform[capitalizeFirstLetter(_.get(item, 'fields.platform'))]

            if (_.get(item, 'fields.active') && ComponentType)
              return (
                <ComponentType data={item} styles={styles} key={i}/>
              )
          })
        }
      </div>
    </div>
  )
}