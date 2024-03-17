import React from 'react'
import _ from 'lodash'
import Image from 'next/image'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { ImageHolder, BackButton } from '@/components/shared'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'

export async function HeroPorfolio({ data }) {
  const bgImage = _.get(data, 'fields.backgroundImage.imageUrl') ? _.get(data, 'fields.backgroundImage.imageUrl') : 'https://static.wixstatic.com/media/fb11a5_9a7cea260f75408990d5e93b73d33cc8~mv2.jpg'

  return (
    <Section className="relative w-full h-[50vh] lg:h-[70vh]" bg="transparent">
      <Container className="relative flex items-center justify-center h-full w-full" width="default" margin="hero">
        <div className="z-1 absolute inset-0 bg-primary transition opacity-30"></div>

        <ImageHolder
          image={{
            imageUrl: bgImage,
            altText: 'Britt Hill'
          }} 
          className={{
            figure: "",
            image: "z-0 absolute left-0 top-0 h-full w-full object-cover object-bottom block"
          }}
        />

      <div className="absolute inset-0 z-100">
        <BackButton/>
      </div>

        <Motion className="relative z-1">
          <MotionVariant variants={fadeInFromBottom}>
            {/* title */}
            <h1 className="font-heading text-2xl text-white md:text-4xl xl:text-5xl">{data.fields.title}</h1>
          </MotionVariant>
        </Motion>
      </Container>

      <div className="z-1 absolute right-0 top-0">
        <Image
          src="https://fluxconsole.com/files/item/1334/173957/shape-1.png"
          alt="britt hill"
          height={500}
          width={500}
          className="w-full h-[35vh]"
        />
      </div>
    </Section>
  )
}
