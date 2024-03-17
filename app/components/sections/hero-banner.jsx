import React from 'react'
import Image from 'next/image'
import _ from 'lodash'
// layouts
import { Section, Container, Motion } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder } from '@/components/shared'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'

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


export async function HeroBanner({ data, sectionCount }) {
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

  return (
    <Section className="relative w-full lg:h-[70vh]" bg={bg}>
      <Container className="relative lg:h-full lg:w-full" width={width} margin="hero">
        {
          _.get(fields, 'backgroundImage') && (
            <>
              <ImageHolder
                image={_.get(fields, 'backgroundImage')} 
                className={{
                  figure: "aspect-h-9 aspect-w-16 xl:hidden",
                  image: "absolute left-0 top-0 h-full w-full object-cover object-center"
                }}
              />

              <ImageHolder
                image={_.get(fields, 'backgroundImage')} 
                className={{
                  figure: "",
                  image: "absolute left-0 top-0 hidden h-full w-full object-cover object-bottom xl:block"
                }}
              />
            </>
          )
        }

        <Motion className="left-0 flex w-full flex-col lg:justify-between lg:absolute lg:bottom-0 lg:max-w-[850px]">
          <div className="bg-primary px-6 py-6 lg:px-10 lg:py-12 z-1">
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

            {
              (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
                <Motion className="relative mt-4 lg:mt-8 grid space-y-2">
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
        </Motion>
      </Container>

      <div className="z-1 absolute inset-y-0 right-0 top-0">
        <Image
          src="https://fluxconsole.com/files/item/1334/173957/shape-1.png"
          alt="britt hill"
          height={500}
          width={500}
          className="w-full h-[15vh] md:h-[30vh]"
        />
      </div>
    </Section>
  )
}
