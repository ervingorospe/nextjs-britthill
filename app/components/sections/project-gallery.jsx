'use client'

import React, { useState } from 'react'
import _ from 'lodash'
// layouts
import { Section, Container, Motion } from '@/app/layouts'
// components
import { Title, GalleryImage, ModalCarousel } from '@/components/shared'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'

const defaults = {
  textAlign: 'text-left',
  width: 'max-w-screen-2xl',
  bgColor: 'transparent',
  title: 'default',
  subtitle: 'default-subtitle',
  bodySize: 'default',
  extraBodySize: 'default',
  buttonStyle: 'default',
  buttonStyle2: 'default'
}

export function ProjectGallery({ data, photos, loops, sectionCount }) {
  const { fields } = data
  const PhotoArrStyle = ['relative aspect-w-16 aspect-h-9', 'relative aspect-w-1 aspect-h-1 mt-8', 'relative aspect-w-1 aspect-h-1 mt-8', 'hidden sm:block relative aspect-w-1 aspect-h-1 mt-8', 'hidden sm:block relative aspect-w-16 aspect-h-9 mt-8', 'hidden sm:block relative aspect-w-1 aspect-h-1 mt-8', 'hidden sm:block relative aspect-w-1 aspect-h-1 mt-8', 'hidden sm:block relative aspect-w-1 aspect-h-1 mt-8', 'hidden sm:block relative aspect-w-16 aspect-h-9 mt-8']

  const [curr, setCurr] = useState(0)
  const [open, setOpen] = useState(false)

  const openModal = (i) => {
    setCurr(i)
    setOpen(true)
  }

  return (
    <Section className="relative" bg={defaults.bgColor}>
      <Container width={defaults.width} margin="default" className="relative z-1 mt-16 pb-24">
        <Motion className="text-center justify-center">
          {/* title */}
          <Title
            title={`Gallery`}
            tag="h2"
            align={defaults.textAlign}
            style={defaults.title}
            size={defaults.title}
            variants={fadeInFromBottom}
            className=""
          />
        </Motion>

        {
          photos.length > 0 && (
            <div className="mt-6">
              {
                loops?.map(num => {
                  const startIndex = ((num * 9) - 9)
                  const nextNineElements = photos.slice(startIndex, startIndex + 9);

                  return (
                    <Motion className="relative columns-1 sm:columns-3 gap-6" key={num}>
                      {
                        nextNineElements?.map((item, i) => {
                          return (
                            <GalleryImage
                              index={i + startIndex}
                              openModal={openModal}
                              data={item}
                              styles={{
                                image: 'w-full object-cover',
                                container: PhotoArrStyle[i]
                              }}
                              key={item.id}
                            />
                          )
                        })
                      }
                    </Motion>
                  )
                })
              }
            </div>
          )
        }
      </Container>

      <ModalCarousel images={photos} current={curr} open={open} onClose={() => setOpen(false)}/>
    </Section>
  )
}
