' use client '

import React from 'react'
import _ from 'lodash'
// function
import { ButtonLink } from '@/components/layouts/functions'

export function Custom({ data, styles, navigation }) {
  const { fields } = data
  
  return (
    <div>
      <p className={styles.title}>{data.name}</p>
      {
        _.get(fields, 'button') && (
          <div className="mt-3 space-y-2 text-lg text-gray-300">
            <ButtonLink
              navigation={navigation}
              data={{
                button: {
                  ..._.get(fields, 'button'),
                },
                buttonPageLink: _.get(fields, 'buttonPageLink'),
                buttonStyle: 'footer-button'
              }}
              className={styles.buttonStyle}
            />
          </div>
        )
      }

      {
        _.get(fields, 'button-2') && (
          <div className="mt-3 space-y-2 text-lg text-gray-300">
            <ButtonLink
              navigation={navigation}
              data={{
                button: {
                  ..._.get(fields, 'button-2'),
                },
                buttonPageLink: _.get(fields, 'buttonPageLink-2'),
                buttonStyle: 'footer-button'
              }}
              className={styles.buttonStyle}
            />
          </div>
        )
      }
    </div>
  )
}
