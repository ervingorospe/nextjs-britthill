import React from 'react'
import _ from 'lodash'
// layouts
import { Section, Container, Motion } from '@/app/layouts'
// components
import { Title, Body, ImageHolder } from '@/components/shared'
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

export async function Quotation({ data, sectionCount }) {
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
    <section className="relative">
      <Section className="relative overflow-hidden pb-32 z-10" bg={bg}>
        <Container width={width} margin="default" className="py-6">
          <div className="container relative bg-vibrant-shade py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28">
            {
              fields.backgroundImage && (
                <div variants={fadeInFromBottom} className="block">
                  <ImageHolder
                    image={fields.backgroundImage} 
                    className={{
                      figure: "mb-8",
                      image: "absolute left-0 top-0 h-full w-full object-cover object-left opacity-50 saturate-0"
                    }}
                  />
                </div>
              )
            }

            <div className="absolute inset-0 bg-gradient-to-r from-vibrant-shade"></div>

            <Motion className="container relative z-1 max-w-screen-2xl">
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
                className={`mt-6 ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')} mt-6 max-w-prose font-heading text-lg leading-relaxed text-white sm:text-xl sm:leading-relaxed md:text-2xl md:leading-relaxed`}
                variants={fadeInFromBottom}
              />

              {/* extra body */}
              <Body
                body={_.get(fields, 'extraBody')}
                size={extraBodySize}
                className={`mt-4 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')} mt-6 max-w-prose font-heading text-lg leading-relaxed text-white sm:text-xl sm:leading-relaxed md:text-2xl md:leading-relaxed`}
                variants={fadeInFromBottom}
              />
            </Motion>
          </div>
        </Container>
      </Section>

      <div className="absolute inset-0 bg-fixed" 
        style={{ 
          backgroundImage: `url(https://fluxconsole.com/files/item/1334/173956/pattern-purple.svg})`,
          backgroundRepeat: 'repeat',  
          backgroundSize: '20rem', 
          backgroundPosition: 'right center',
        }}
        ></div>
      <div className="absolute inset-0 bg-gradient-to-b via-white from-white"></div>
    </section>
  )
}
