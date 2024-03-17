import _ from 'lodash'
import Script from 'next/script'
// function
import { generatePortfolioRoutes, checkPortfolioRoute, checkRoute } from '@/function/navigation'
import { formatRouteName } from '@/function/formatting'
import { getGeneralInfo, getSettings } from '@/function/page'
import { getScriptUrl } from '@/function/embed-codes'
// layouts
import { HeroPorfolio, ProjectGallery } from '@/components/sections'
import { Section, Container, Motion } from '@/app/layouts'
// components
import { Title, ButtonCard } from '@/components/shared'
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

export async function generateMetadata({ params }) {
  const general = await getGeneralInfo()
  const path = await checkPortfolioRoute(`${params.slug.join("/")}`)
  const { fields } = path

  return {
    title: `Britt Hill Interiors - ${path.name}`,
    description: _.get(fields, 'metaDescription'),
    openGraph: {
      title: `Britt Hill Interiors - ${path.name}`,
      description: _.get(fields, 'metaDescription'),
      images: [`${_.get(fields, 'ogImage.imageUrl')}`],
      url: `${_.get(general, 'url')}interior-design/portfolio/${path.slug}`,
      site_name: _.get(general, 'organizationName')
    },
    alternates: {
      canonical: `${_.get(general, 'url')}interior-design/portfolio/${path.slug}`,
    },
  };
}

export default async function Page({ params }) {
  const path = await checkPortfolioRoute(`${params.slug.join("/")}`)
  const settings = _.first(await getSettings())

  let categories = []
  let photos = []
  let loops = 1

  if (_.get(path, 'fields.categories')) {
    const collections = await getCollection(_.get(path, 'fields.categories'))
    categories = _.filter(collections[0].items, cat => cat.fields.active)
  }

  if (_.get(path, 'fields.gallery')) {
    const collections = await getCollection(_.get(path, 'fields.gallery'))
    const count = Math.ceil(collections[0].items.length / 9)
    loops = Array.from({ length: count }, (_, i) => i + 1)

    if (collections) {
      const mappedImages = await Promise.all(
        collections[0].items?.map(async image => {
          const items = await getItem(image.id)
          return items[0]
        })
      );

      photos = mappedImages
    }
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${_.get(settings, 'fields.googleTagManagerId')}`}
      />

      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${_.get(settings, 'fields.googleTagManagerId')}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Script src={getScriptUrl(_.get(settings, 'fields.headScripts'))}/>

      <main>
        <HeroPorfolio data={path}/>

        {
          categories.length > 0 && (
            <Section className="relative" bg={defaults.bgColor}>
              <Container width={defaults.width} margin="section">
                <Motion>
                  {/* title */}
                  <Title
                    title="Categories"
                    tag="h2"
                    align={defaults.textAlign}
                    style={defaults.title}
                    size={defaults.title}
                    variants={fadeInFromBottom}
                    className=""
                  />

                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {
                      categories?.map(item => (
                        <ButtonCard
                          data={{
                            button: {
                              url: `/interior-design/portfolio/${params.slug.join("/")}/${formatRouteName(item.name)}`,
                              text: item.name,
                              target: "",
                            },
                            buttonPageLink: ""
                          }}
                          image={_.get(item, 'fields.backgroundImage')}
                          variants={fadeInFromBottom}
                          key={item.name}
                        />
                      ))
                    }
                  </div>
                </Motion>
              </Container>
            </Section>
          )
        }

        {
          _.get(path, 'fields.gallery') && (
            <ProjectGallery  
              sectionCount={2}
              photos={photos}
              loops={loops}
              data={path}
            />
          )
        }
        
      </main>
    </>
  )
}

export async function generateStaticParams() {
  return await generatePortfolioRoutes()
}
