/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
import Image from 'next/image'
// layouts
import { Section, Container } from '@/app/layouts'
// components
import { Title, Body, FormWufoo, ImageHolder } from '@/components/shared'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// api
import { getCollection } from '@/api/collection'

const defaults = {
  textAlign: 'text-left',
  width: 'w-full',
  bgColor: 'white',
  title: 'default',
  subtitle: 'default-subtitle',
  bodySize: 'default',
  extraBodySize: 'default',
  buttonStyle: 'default',
  buttonStyle2: 'default'
}


export async function FormImageRight({ data, sectionCount }) {
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
    <div id="form" className="on-scroll-form">
      <Section className="relative overflow-hidden" bg={bg}>
        <Container width={width} margin="" className="relative z-100">
          <ImageHolder
            image={fields.image} 
            className={{
              figure: "lg:absolute lg:inset-0 lg:left-1/2",
              image: "h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full"
            }}
          />
          <div className="lg:border-b lg:grid lg:grid-cols-2 w-full">
            <div className="pb-0 lg:pb-24 pt-16 sm:pt-24 lg:mx-auto lg:max-w-3xl lg:pt-16">
              <div className="container">
                <div className="mx-auto max-w-full">
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
                    className={`mt-2 ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
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
                    className={`mt-4 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
                    variants={fadeInFromBottom}
                  />

                  <FormWufoo data={data} className="mt-6 max-w-[600px] min-h-[836px] lg:max-w-[600px]" titleText=""/>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}