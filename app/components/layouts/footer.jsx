import React from 'react'
import _ from 'lodash'
// function
import { getCallToAction, getSettings, getSocialMedia, getLocation, getFooterLocationInfo, getGeneralInfo } from '@/function/page'
import { getNavigationDetails } from '@/function/navigation'
// component
import { CallToAction, FooterContent } from '@/components/layouts'

export async function Footer() {
  const collection = await getCallToAction()
  const navigation = await getNavigationDetails()
  const socialMedia = await getSocialMedia()
  const settings = _.first(await getSettings())
  const location = await getLocation()
  const locationInfo = await getFooterLocationInfo()
  const general = await getGeneralInfo()

  return (
    <section className="overflow-hidden relative">
      <CallToAction collection={collection} navigation={navigation} settings={settings}/>
      <FooterContent 
        navigation={navigation} 
        socialMedia={_.filter(socialMedia, res => res.fields.active)} 
        location={_.filter(location[0].items, res => res.fields.active)}
        locationInfo={_.filter(locationInfo, res => res.fields.active)}
        general={general}
      />

      <div className="absolute inset-0 bg-fixed" 
        style={{ 
          backgroundImage: `url(https://fluxconsole.com/files/item/1334/173956/pattern-purple.svg})`,
          backgroundRepeat: 'repeat',  
          backgroundSize: '20rem', 
          backgroundPosition: 'right center',
        }}
        ></div>
    </section>
  )
}
