import React from 'react'
import _ from 'lodash'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder, VideoGallery } from '@/components/shared'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// api
import { getCollection } from '@/api/collection'

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

export async function Default({ data, sectionCount }) {
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
    <Section className="relative" bg={bg}>
      <Container width={width} margin="section" className="z-1">
        <Motion className="grid mx-auto text-left justify-start">
          {/* title */}
          <Title
            title={_.get(fields, 'title')}
            tag={titleTag}
            align={titleAlign}
            style={title}
            size={title}
            variants={fadeInFromBottom}
            className={`${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')} text-gray-300`}
          />

          {/* subtitle */}
          <Title
            title={_.get(fields, 'subtitle')}
            tag={subtitleTag}
            align={titleAlign}
            style={subtitle}
            size={subtitle}
            variants={fadeInFromBottom}
            className={`mt-3 ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
          />

          {
            fields.backgroundImage && (
              <MotionVariant variants={fadeInFromBottom} className="mt-4">
                <ImageHolder
                  image={fields.backgroundImage} 
                  className={{
                    figure: "",
                    image: "w-8/12"
                  }}
                />
              </MotionVariant>
            )
          }

          {
            fields.image && (
              <MotionVariant className="mt-4" variants={fadeInFromBottom}>
                <ImageHolder
                  image={fields.image} 
                  className={{
                    figure: "",
                    image: "shadow-md w-full md:max-w-xl"
                  }}
                />
              </MotionVariant>
            )
          }

          {
            fields.videoUrl && (
              <div className="grid w-full border">
                testiong
                <iframe src={fields.videoUrl} className="w-full" frameborder="0" allow="autoplay" allowfullscreen="allowfullscreen"/>
              </div>
            )
          }
          

          {/* body */}
          <Body
            body={_.get(fields, 'body')}
            size={bodySize}
            className={`mt-6 max-w-full ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
            variants={fadeInFromBottom}
          />

          {/* extra body */}
          <Body
            body={_.get(fields, 'extraBody')}
            size={extraBodySize}
            className={`mt-4 max-w-full ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
            variants={fadeInFromBottom}
          />
        </Motion>

        {
          (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
            <Motion className="relative z-10 mt-8 grid space-y-2">
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

        {
          subCollection.length > 0 && (
            <div className="mt-8 grid md:flex md:space-x-4">
              {
                subCollection?.map(img => (
                  <ImageHolder
                    image={_.get(img, 'file')} 
                    className={{
                      figure: "mt-2",
                      image: "shadow-md"
                    }}
                    key={img.id}
                  />
                ))
              }
            </div>
          )
        }
      </Container>
    </Section>
  )
}
