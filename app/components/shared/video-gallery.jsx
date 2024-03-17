'use client'

import React, { useRef, useEffect  } from 'react'
import _ from 'lodash'

export function VideoGallery({ file, autoPlay = true, playbackRate = 1, controls=true }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate; // Set the default playback rate here
    }
  }, [playbackRate]);

  return (
    <figure className="relative">
      <div className="w-full">
        <video id="myVideo" autoPlay={autoPlay} className="w-full" ref={videoRef} controls={controls}>
          <source src={_.get(file, 'file.videoUrl')} type="video/mp4"/>
        </video>
      </div>
    </figure>
  )
}
