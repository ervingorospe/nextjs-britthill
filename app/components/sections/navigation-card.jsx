import React from 'react'
import _ from 'lodash'
// layouts
import { Section, Container, Motion } from '@/app/layouts'
// components
import { Title, Body, ButtonCard } from '@/components/shared'
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


export async function NavigationCard({ data, sectionCount }) {
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
      <Container width={width} margin="section">
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
          _.filter(subCollection, item => item.fields.showInNavigationSection).length > 0 && (
            <Motion className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <SubCollection subCollection={_.filter(subCollection, item => item.fields.showInNavigationSection)} collection={subCollection}/>
            </Motion>
          )
        }
      </Container>
    </Section>
  )
}


const SubCollection = ({ subCollection, collection }) => {
  return (
    subCollection?.map(item => {
      const subNav = _.filter(collection, sub => sub.parentId === item.id && sub.fields.showInNavigation)
      const navData = subNav.length > 0 ? subNav[0] : item
  
      return ( 
        <ButtonCard
          data={{
            button: {
              url: _.get(navData, 'fields.nav.url') ? _.get(navData, 'fields.nav.url') : navData.slug,
              text: item.name,
              target: _.get(navData, 'fields.nav.target'),
            },
            buttonPageLink: _.get(navData, 'id')
          }}
          image={_.get(item, 'fields.image')}
          variants={fadeInFromBottom}
          key={item.name}
        />
      )
    })
  )
}
