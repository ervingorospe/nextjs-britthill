'use client'

import React from 'react'

export function VideoHolder({ video, className }) {
  return (
    <figure className={className.figure}>
      <div className={className.video}>
        <video playsInline autoPlay muted loop>
          <source src={video} type="video/mp4"/>
        </video>
      </div>
    </figure>
  )
}