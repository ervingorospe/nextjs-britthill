import React from 'react'
import Image from 'next/image'
import _ from 'lodash'
// layouts
import { Section, Container, Motion } from '@/app/layouts'
// components
import { Title, Body, Button, BgImageFadeSlider } from '@/components/shared'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// api
import { getCollection } from '@/api/collection'

const defaults = {
  textAlign: 'text-left',
  width: 'default',
  bgColor: 'white',
  title: 'hero-title',
  subtitle: 'hero-subtitle',
  bodySize: 'hero',
  extraBodySize: 'hero',
  buttonStyle: 'hero',
  buttonStyle2: 'hero'
}

export async function HeroTestimonial({ data, sectionCount }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : sectionCount === 1 ? 'h1' : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : sectionCount === 1 ? 'h2' : 'h3'
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 
  const extraBodySize = _.get(fields, 'extraBodySize') === 'default' ? defaults.extraBodySize : _.get(fields, 'extraBodySize') 

  let title = defaults.title
  let subtitle = defaults.subtitle

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = defaults.subtitle
    subtitle = defaults.title
  }

  let subCollection = [];

  if (_.get(fields, 'contentCollection')) {
    const collections = await getCollection(_.get(fields, 'contentCollection'))

    subCollection = collections[0].items
  }

  return (
    <Section className="relative w-full lg:h-[70vh]" bg={bg}>
      <Container className="relative h-full" width={width} margin="hero">
        <div className="block lg:absolute h-[30vh] md:h-[50vh] lg:h-full w-full lg:inset-0">
          <BgImageFadeSlider 
            images={subCollection}
            className={{ 
              container: "h-full w-full",
              div: "h-full w-full",
              image: "w-full h-full object-cover object-center"
            }}
          />
        </div>

        <div className="z-1 left-0 block lg:flex w-full flex-col justify-between lg:absolute bottom-0 lg:max-w-[850px] bg-primary px-6 py-6 lg:px-10 lg:py-12">
          <Motion>
            {/* title */}
            <Title
              title={_.get(fields, 'title')}
              tag={titleTag}
              align={titleAlign}
              style={title}
              size={title}
              variants={fadeInFromBottom}
              className={`${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')}`}
            />

            {/* subtitle */}
            <Title
              title={_.get(fields, 'subtitle')}
              tag={subtitleTag}
              align={titleAlign}
              style={subtitle}
              size={subtitle}
              variants={fadeInFromBottom}
              className={`mt-1 ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
            />

            {/* body */}
            <Body
              body={_.get(fields, 'body')}
              size={bodySize}
              className={`mt-6 ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
              variants={fadeInFromBottom}
            />

            {/* extra body */}
            <Body
              body={_.get(fields, 'extraBody')}
              size={extraBodySize}
              className={`mt-1 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
              variants={fadeInFromBottom}
            />
          </Motion>

          {
            (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
              <Motion className="relative mt-4 lg:mt-8 grid space-y-2 z-1000">
                {
                  _.get(fields, 'button') && (
                    <Button
                      data={{
                        button: {
                          ..._.get(fields, 'button'),
                        },
                        buttonPageLink: _.get(fields, 'buttonPageLink')
                      }}
                      styles={defaults.buttonStyle}
                      className=""
                      variants={fadeInFromBottom}
                    />
                  )
                }

                {
                  _.get(fields, 'button-2') && (
                    <Button
                      data={{
                        button: {
                          ..._.get(fields, 'button-2'),
                        },
                        buttonPageLink: _.get(fields, 'buttonPageLink-2')
                      }}
                      styles={defaults.buttonStyle2}
                      className=""
                      variants={fadeInFromBottom}
                    />
                  )
                }
              </Motion>
            )
          }
        </div>
      </Container>

      <div className="z-1 absolute right-0 top-0">
        <Image
          src="https://fluxconsole.com/files/item/1334/173957/shape-1.png"
          alt="britt hill"
          height={500}
          width={500}
          className="w-full h-[8vh] md:h-[15vh] lg:h-[25vh] xl:h-[35vh]"
        />
      </div>
    </Section>
  )
}
