import React from 'react'
import _ from 'lodash'
// layouts
import { Section, Container, Motion } from '@/app/layouts'
// components
import { Title, Body, Button, VideoGallery } from '@/components/shared'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// api
import { getCollection } from '@/api/collection'
import { getItem } from '@/api/item'

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

export async function MediaList({ data, sectionCount }) {
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

  let videos = [];

  if (_.get(fields, 'contentCollection')) {
    const collections = await getCollection(_.get(fields, 'contentCollection'))
    videos = collections[0].items
  }

  return (
    <Section className="relative" bg={bg}>
      <Container width={width} margin="section" className="relative z-1">
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
            <Motion className="mt-8 grid space-y-2">
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

        <Motion className="grid gap-8">
          {
            videos.length > 0 && (
              videos?.map(async video => {
                const item = await getItem(video.id)
                const file = item[0]

                return (
                  <VideoGallery file={file} key={video.id} autoPlay={true} playbackRate={1}/>
                )
              })
            )
          }
        </Motion>
      </Container>
    </Section>
  )
}
