import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Section, Motion, MotionVariant } from '@/app/layouts'
// components
import { ImageHolder } from '@/components/shared'

const defaults = {
  textAlign: 'text-center',
  width: 'max-w-screen-2xl',
  bgColor: 'white',
  title: 'default-inverted',
  subtitle: 'default-subtitle-inverted',
  bodySize: 'default',
  extraBodySize: 'default',
  buttonStyle: 'default',
  buttonStyle2: 'default'
}

export async function DefaultHero({ data }) {
  const bgImage = _.get(data, 'fields.image.imageUrl') ? _.get(data, 'fields.image.imageUrl') : 'https://static.wixstatic.com/media/fb11a5_9a7cea260f75408990d5e93b73d33cc8~mv2.jpg'
  const bg = defaults.bgColor

  return (
    <Section className="relative pt-16 xl:pt-0 w-full lg:h-[70vh]" bg={bg}>
      <div className="relative xl:h-full xl:w-full">
        <ImageHolder
          image={{
            imageUrl: bgImage,
            altText: 'Britt Hill'
          }} 
          className={{
            figure: "aspect-h-9 aspect-w-16 xl:hidden",
            image: "absolute left-0 top-0 h-full w-full object-cover object-center"
          }}
        />

        <ImageHolder
          image={{
            imageUrl: bgImage,
            altText: 'Britt Hill'
          }} 
          className={{
            figure: "",
            image: "absolute left-0 top-0 hidden h-full w-full object-cover object-center xl:block"
          }}
        />

        <Motion className="relative z-1 left-0 flex w-full flex-col lg:justify-between xl:absolute xl:bottom-0 xl:max-w-[850px] bg-primary px-8 py-10">
          <MotionVariant variants={fadeInFromBottom}>
            <h1 className="font-heading text-white text-3xl md:text-6xl">{data.name}</h1>
          </MotionVariant>
        </Motion>
      </div>
    </Section>
  )
}
