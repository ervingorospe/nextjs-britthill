'use client'

import { usePathname } from 'next/navigation';
import _ from 'lodash'
// function
import { sectionsComponent, formatComponentName } from '@/function/formatting'
// component
import * as ComponentSection from '@/components/sections'

export function CallToAction({ navigation, collection, settings }) {
  let pathname = usePathname();
  const items = _.filter(collection, res => res.fields.active)

  if (pathname === '/') {
    pathname = '/home'
  }

  const navDetails = _.find(navigation, data => `/${data.slug}` === pathname)

  if (!_.get(navDetails, 'fields.hideCallToActionSections')) {
    return (
      items?.map(item => {
        const componentName = sectionsComponent(item)

        if (componentName) {
          const ComponentType = ComponentSection[formatComponentName(componentName)] ? ComponentSection[formatComponentName(componentName)] : null

          if (ComponentType) {
            return <ComponentType data={item} key={item.name} navigation={navigation} settings={settings}/>
          }
        }
      })
    )
  }
}
