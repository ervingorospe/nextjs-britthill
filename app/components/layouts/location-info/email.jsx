' use client '

import React from 'react'
import Link from 'next/link'
import _ from 'lodash'

export function Email({ data, location, styles }) {
  return (
    <div>
      <p className={styles.title}>{data.name}</p>
      <p className={styles.contentText}>
        <Link href={`mailto:${_.get(location, 'fields.email')}`} targe="_blank" className={styles.link}>{_.get(location, 'fields.email')}</Link>
      </p>
    </div>
  )
}