'use client'

import React from 'react'

export function P({ styles, title }) {
  return (
    <p className={styles}>{title}</p>
  )
}