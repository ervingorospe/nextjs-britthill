import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import _ from 'lodash'
// function
import { getNavigationDetails } from '@/function/navigation'
import { getGeneralInfo } from '@/function/page'
// components
import { Nav } from '@/components/layouts'

export async function HeaderAside() {
  const navigation = await getNavigationDetails()
  const general = await getGeneralInfo()

  return (
    <aside className="relative sticky top-0 hidden h-screen w-[260px] flex-col border-r bg-white xl:flex xl:flex-shrink-0">
      <div className="absolute inset-x-0 -left-10 bottom-0">
        <Image
          src="https://fluxconsole.com/files/item/1334/173954/nav-pattern.svg"
          alt="britt hill"
          height={500}
          width={500}
          className=""
        />
      </div>
      <Link href="/" className="mt-8 flex w-full justify-center">
        <Image 
          className="h-40 w-auto" 
          src="https://fluxconsole.com/files/view/234059" 
          alt={_.get(general, 'organizationName')}
          height={500}
          width={500}
        />
      </Link>
      <div className="mt-10 w-full overflow-auto relative z-10">
        <Nav
          navigation={_.filter(navigation, data => _.get(data, 'fields.showInNavigation'))}
          className="block w-full py-2 pl-8 pr-4 uppercase tracking-wide text-gray-900 hover:bg-gray-100"
        />
      </div>
    </aside>
  )
}