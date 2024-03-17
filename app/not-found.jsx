/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash'
import Link from 'next/link'
// function
import { getGeneralInfo } from '@/function/page'
import { generateStaticRoutes, checkRoute } from '@/function/navigation'
// components
import { DefaultHero } from '@/components/sections'

export async function generateMetadata({ params }) {
  const general = await getGeneralInfo()
  const path = await checkRoute(`/`)
  const { fields } = path

  const metaTitle = _.get(fields, 'metaTitle') ? _.get(fields, 'metaTitle') : _.get(general, 'defaultMetaTitle')

  return {
    title: `404 - Page Not Found - ${metaTitle}`,
    description: metaTitle,
    openGraph: {
      title: `404 - Page Not Found - ${metaTitle}`,
      description: metaTitle,
      images: [],
      url: `${_.get(general, 'url')}404`,
      site_name: _.get(general, 'organizationName')
    },
    alternates: {
      canonical: `${_.get(general, 'url')}404`,
    },
  };
}

export default async function NotFound({ params }) {
  const message = "We're sorry, this page does not exist but you can"

  return (
    <>
      <DefaultHero
        data={{
          name: '404 - Page Not Found'
        }}
      />

      <div className="w-full overflow-hidden relative">
        <div className="py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-prose xl:text-lg text-center">
            <h2 className="mt-0 text-4xl md:text-5xl font-heading font-bold">Wait a second...</h2>
            <div className="mt-6 text-base text-primary-700 lg:text-lg">
              {message} <Link href="/" className="font-bold text-primary-700 hover:underline">explore the rest of our site.</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  return await generateStaticRoutes()
}
