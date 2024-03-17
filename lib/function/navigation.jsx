import { cache } from 'react';
import _ from 'lodash'
// function
import { formatRouteName } from './formatting'
// api
import { getCollection } from '@/api/collection'
import { getItem } from '@/api/item'

const ids = {
  navigation: 29560,
  actionButtons: 29536,
  callToActionSections: 29559,
  footerLocationInfo: 29532,
  socialMedia: 29534,
  location: 29531,
  projects: 30462,
  freeStandingPages: 29562,
  ladingPages: 31805
}

const buttonNav = (navigation, data) => {
  const url = _.find(navigation, path => path.id === data.buttonPageLink)

  return {
    ..._.get(data, 'button'),
    url: _.get(url, 'slug') ? `/${_.get(url, 'slug')}` : '/'
  }
}

const getNavigation = cache(async () => {
  const collections = await getCollection(ids.navigation)
  return collections[0].items
})

const getStandingPage = cache(async () => {
  const collections = await getCollection(ids.freeStandingPages)
  return collections[0].items
})

const getLandingPage = cache(async () => {
  const collections = await getCollection(ids.ladingPages)
  return _.filter(collections[0].items, data => data.fields.active)
})

const generateStaticRoutes = cache(async () => {
  const navigations = await getNavigation()
  const standingPages = await getStandingPage()
  const landingPages = await getLandingPage()

  // standing pages loop
  const standingPagesPaths = standingPages?.map(data => {
    const slug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)

    return {
      slug: [`${slug}`]
    }
  })

  // landing pages loop
  const landingPagesPaths = landingPages?.map(data => {
    const slug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)

    return {
      slug: [`${slug}`]
    }
  })

  const paths = await Promise.all(navigations?.map(async data => {
    const parentSlug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : data.name

    if (data.parentId !== 0) {
      const items = await getItem(data.parentId)
      const parentRoute = formatRouteName(_.get(items[0], 'fields.slug') ? _.get(items[0], 'fields.slug') : _.get(items[0], 'name'))

      if (_.get(items[0], 'parentId') !== 0) {
        const mainParent = await getItem(_.get(items[0], 'parentId'))
        const mainParentRoute = formatRouteName(_.get(mainParent[0], 'fields.slug') ? _.get(mainParent[0], 'fields.slug') : _.get(mainParent[0], 'name'))

        return {
          slug: [`${mainParentRoute}`,`${parentRoute}`,`${formatRouteName(parentSlug)}`]
        }
      }

      return {
        slug: [`${parentRoute}`,`${formatRouteName(parentSlug)}`]
      }
    }
    
    return {
      slug: [`${formatRouteName(parentSlug)}`]
    }
  }))
 
  return [...paths, ...standingPagesPaths, ...landingPagesPaths]
})

const getNavigationDetails = cache(async () => {
  const navigations = await getNavigation()
  const standingPages = await getStandingPage()
  const landingPages = await getLandingPage()

  // standing pages loop
  const standingPagesPaths = standingPages?.map(data => {
    const slug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)

    return {
      ...data,
      slug
    }
  })

  // landing pages loop
  const landingPagesPaths = landingPages?.map(data => {
    const slug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)

    return {
      ...data,
      slug
    }
  })

  const paths = await Promise.all(navigations?.map(async data => {
    const parentSlug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : data.name

    if (data.parentId !== 0) {
      const items = await getItem(data.parentId)
      const parentRoute = formatRouteName(_.get(items[0], 'fields.slug') ? _.get(items[0], 'fields.slug') : _.get(items[0], 'name'))

      if (_.get(items[0], 'parentId') !== 0) {
        const mainParent = await getItem(_.get(items[0], 'parentId'))
        const mainParentRoute = formatRouteName(_.get(mainParent[0], 'fields.slug') ? _.get(mainParent[0], 'fields.slug') : _.get(mainParent[0], 'name'))

        return {
          ...data,
          slug: `${mainParentRoute}/${parentRoute}/${formatRouteName(parentSlug)}`,
        }
      }

      return {
        ...data,
        slug: `${parentRoute}/${formatRouteName(parentSlug)}`,
      }
    }

    return {
      ...data,
      slug: formatRouteName(parentSlug),
    }
  }))

  return [...paths, ...standingPagesPaths, ...landingPagesPaths]
})

const checkRoute = cache(async (routeName) => {
  if (routeName === '/') {
    routeName = 'home'
  }

  const paths = await getNavigationDetails()
  return _.find(paths, data => data.slug == routeName)
})

// for brit hill
const checkPortfolioRoute = cache(async (routeName) => {
  const paths = await portfolioRoute()
  return _.find(paths, data => data.slug == routeName)
})


const generatePortfolioRoutes = cache(async () => {
  const collections = await getCollection(ids.projects)
  const navs = collections[0].items
  let categoryArr = []

  const paths = await Promise.all(navs?.map(async data => {
    const slug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)

    if (_.get(data, 'fields.categories')) {
      const collections = await getCollection(_.get(data, 'fields.categories'))
      const categories = collections[0].items

      const categoryPath = categories?.map(category => {
        const categorySlug = _.get(category, 'fields.slug') ? _.get(category, 'fields.slug') : formatRouteName(category.name)

        return {
          slug: [`${slug}`, `${categorySlug}`]
        }
      })
      
      categoryArr = [...categoryArr, ...categoryPath]
    }

    return {
      slug: [`${slug}`]
    }
  }))

  return [...categoryArr, ...paths]
})

const portfolioRoute = cache(async () => {
  const collections = await getCollection(ids.projects)
  const navs = collections[0].items
  let categoryArr = []

  const paths = await Promise.all(navs?.map(async data => {
    const slug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)

    if (_.get(data, 'fields.categories')) {
      const collections = await getCollection(_.get(data, 'fields.categories'))
      const categories = collections[0].items

      const categoryPath = categories?.map(category => {
        const categorySlug = _.get(category, 'fields.slug') ? _.get(category, 'fields.slug') : formatRouteName(category.name)

        return {
          ...category,
          slug: `${slug}/${categorySlug}`
        }
      })

      categoryArr = [...categoryArr, ...categoryPath]
    }

    return {
      ...data,
      slug
    }
  }))

  return [...categoryArr, ...paths]
})

export {
  checkRoute,
  generateStaticRoutes,
  getNavigationDetails,
  generatePortfolioRoutes,
  checkPortfolioRoute,
  buttonNav
}