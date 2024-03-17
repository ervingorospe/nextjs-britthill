import React from 'react'
import _ from 'lodash'
// function
import { getNavigationDetails } from '@/function/navigation'
import { getGeneralInfo } from '@/function/page'
// components
import { HeaderPopover } from '@/components/layouts'

export async function HeaderMobile() {
  const navigation = await getNavigationDetails()
  const general = await getGeneralInfo()

  return (
    <header className="sticky top-0 relative z-1000 bg-white xl:hidden">
      <div className="sticky top-0 w-full z-1000">
        <HeaderPopover navigation={_.filter(navigation, data => _.get(data, 'fields.showInNavigation'))} general={general}/>
      </div>
    </header>
  )
}