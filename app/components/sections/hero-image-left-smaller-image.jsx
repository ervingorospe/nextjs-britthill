import React from 'react'
import _ from 'lodash'
import Image from 'next/image'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder } from '@/components/shared'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'

const defaults = {
  textAlign: 'text-left',
  width: 'max-w-screen-2xl',
  bgColor: 'white',
  title: 'default',
  subtitle: 'default-subtitle',
  bodySize: 'default',
  extraBodySize: 'default',
  buttonStyle: 'default',
  buttonStyle2: 'default'
}

export async function HeroImageLeftSmallerImage({ data, sectionCount }) {
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
    <Section className="relative" bg={bg}>
      <Container width={width} margin="section" className="relative z-100">
        <Motion>
          <div className="mt-6 grid items-center lg:gap-12 xl:gap-16 2xl:gap-20 lg:grid-cols-2 xl:grid-cols-12">
            <div className="mx-auto relative xl:col-span-4">
              {
                fields.backgroundImage && (
                  <MotionVariant variants={fadeInFromBottom} className="mt-4">
                    <ImageHolder
                      image={fields.backgroundImage} 
                      className={{
                        figure: "",
                        image: "h-full w-full object-center"
                      }}
                    />
                  </MotionVariant>
                )
              }

              {
                fields.image && (
                  <MotionVariant className="relative" variants={fadeInFromBottom}>
                    <ImageHolder
                      image={fields.image} 
                      className={{
                        figure: "z-10 relative",
                        image: "h-full w-full object-center shadow-md"
                      }}
                    />

                    <div className="hidden sm:block absolute -top-32 -right-48 opacity-50">
                      <Image
                        src="https://fluxconsole.com/files/item/1334/173961/shape-5.png"
                        alt="britt hill"
                        height={500}
                        width={500}
                        className="w-full"
                      />
                    </div>
                  </MotionVariant>
                )
              }
            </div>
            

            <div className="relative z-10 xl:col-span-8 mt-4 lg:mt-0">
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
                className={`${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
                variants={fadeInFromBottom}
              />

              {/* extra body */}
              <Body
                body={_.get(fields, 'extraBody')}
                size={extraBodySize}
                className={`mt-4 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
                variants={fadeInFromBottom}
              />

              {
                (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
                  <Motion className="mt-6 grid space-y-2">
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
          </div>
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
