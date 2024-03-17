'use client'

import React from 'react'
import Image from 'next/image'
import _ from 'lodash'
// layouts
import { Section } from '@/app/layouts'
// component
import { Title, Body, CallToActionButton } from '@/components/shared'

const defaults = {
  textAlign: 'text-left',
  width: 'max-w-screen-2xl',
  bgColor: 'white',
  title: 'call-to-action',
  subtitle: 'call-to-action-subtitle',
  bodySize: 'prose',
  extraBodySize: 'prose',
  buttonStyle: 'call-to-action',
  buttonStyle2: 'hero'
}

export function CallToAction({ data, navigation }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : 'h3'
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 

  let title = defaults.title
  let subtitle = defaults.subtitle

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = defaults.subtitle
    subtitle = defaults.title
  }

  return (
    <Section className="pb-6" bg={bg}>
      <div className="relative bg-primary z-100">
        <div className="bg-indigo-600 relative overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <Image
            src={_.get(fields, 'image.imageUrl')}
            alt={_.get(fields, 'image.alt') ? _.get(fields, 'image.alt') : 'Britt Hill Interior'}
            height={500}
            width={500}
            className="h-full w-full object-cover"
          />
          <svg viewBox="0 0 926 676" aria-hidden="true" className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]">
            <path fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)" fillOpacity=".4" d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z" />
            <defs>
              <linearGradient id="60c3c621-93e0-4a09-a0e6-4c228a0116d8" x1="926.392" x2="-109.635" y1=".176" y2="321.024" gradientUnits="userSpaceOnUse">
                <stop stopColor="#776FFF" />
                <stop offset="1" stopColor="#FF4694" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="md:min-h-[600px] relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-0 lg:py-24 xl:py-48">
          <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-6 lg:w-1/2 lg:pl-12">
            {/* title */}
            <Title
              title={_.get(fields, 'title')}
              tag={titleTag}
              align={titleAlign}
              style={title}
              size={title}
              className={`${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')}`}
            />

            {/* subtitle */}
            <Title
              title={_.get(fields, 'subtitle')}
              tag={subtitleTag}
              align={titleAlign}
              style={subtitle}
              size={subtitle}
              className={`mt-1 ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
            />

            {/* body */}
            <Body
              body={_.get(fields, 'body')}
              size={bodySize}
              className={`mt-6 text-base leading-7 text-gray-300 ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
            />

            {
              (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
                <div className="mt-8 grid space-y-2">
                  {
                    _.get(fields, 'button') && (
                      <CallToActionButton
                        data={{
                          button: {
                            ..._.get(fields, 'button'),
                          },
                          buttonPageLink: _.get(fields, 'buttonPageLink')
                        }}
                        styles={defaults.buttonStyle}
                        className=""
                        navigation={navigation}
                      />
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </Section>
  )
}
