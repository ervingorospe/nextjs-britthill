'use client'

import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import _ from 'lodash'
// layouts
import { Section, Container, Motion } from '@/app/layouts'
// components
import { Title, Body } from '@/components/shared'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// functions
import { splitWuffooForm } from '@/function/embed-codes'

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
export function FormLeft({ data, sectionCount }) {
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

  const [wufooForm, setWufooForm] = useState({})

  useEffect(() => {
    if (fields.embed) 
      setWufooForm(splitWuffooForm(fields.embed))
  }, [fields.embed])

  return (
    <Section className="relative overflow-hidden" bg={bg}>
      <Container width={width} margin="section" className="relative z-1">
        <Motion className="grid text-left justify-start">
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
            className={`mt-6 text-white ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
            variants={fadeInFromBottom}
          />

          {/* extra body */}
          <Body
            body={_.get(fields, 'extraBody')}
            size={extraBodySize}
            className={`mt-1 text-white ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
            variants={fadeInFromBottom}
          />
        </Motion>

        {
          fields.embed && (
            <div className="mt-6 grid text-center">
              <div className="relative w-full bg-gray-50 lg:max-w-2xl rounded-lg max-w-[600px] min-h-[399px]">
                <div className="px-6 pt-6">
                  <div dangerouslySetInnerHTML={{__html: wufooForm.divElement}}/>
                  <Script
                    id="form-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: eval(`${wufooForm.scriptCode}`),
                    }}
                  />
                </div>
                <p className="abosulute text-xs text-center bg-gray-100 border rounded-b-xl p-0 py-7 m-0">
                  We care about protecting your data. Read our <strong><a href="/privacy-policy" target="_blank">Privacy Policy.</a></strong>
                </p>
              </div>
            </div>
          )
        }
        
      </Container>

      <div className="absolute inset-0 bg-fixed" 
        style={{ 
          backgroundImage: `url(https://fluxconsole.com/files/item/1334/173956/pattern-purple.svg})`,
          backgroundRepeat: 'repeat',  
          backgroundSize: '20rem', 
          backgroundPosition: 'right center',
        }}
        ></div>
      <div className="absolute inset-0 bg-gradient-to-b via-white from-white"></div>
    </Section>
  )
}
