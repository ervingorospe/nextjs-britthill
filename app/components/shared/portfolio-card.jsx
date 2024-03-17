import React from 'react'
import Link from 'next/link'
import _ from 'lodash'
// function
import { formatRouteName } from '@/function/formatting'

export async function PortfolioCard({ data }) {
  const { fields } = data
  const slug = formatRouteName(_.get(fields, 'slug') ? _.get(fields, 'slug') : _.get(data, 'name'))

  return (
    <Link className="bg-fixed group aspect-h-12 aspect-w-16 block bg-gray sm:aspect-h-9" href={`/interior-design/portfolio/${slug}`}
      style={{ 
        backgroundImage: `url(${_.get(fields, 'backgroundImage.imageUrl')})`, 
        backgroundRepeat: 'no-repeat',  
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-primary transition opacity-30"></div>
      <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
        <div className="">
          <div className="">
            <p className="font-heading text-2xl text-white md:text-4xl xl:text-5xl">{ data.name }</p>
            <p className="font-heading text-xl text-gray-200 md:text-2xl xl:text-3xl">{ _.get(fields, 'subtitle') }</p>
            <div className="mt-4 md:mt-6 xl:mt-8">
              <button className="button button-sm md:button-base inline-flex border-white text-white hover:bg-white hover:text-gray-700 focus:ring-gray-500" target="" href="interior-design/before--afters">View Project</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
