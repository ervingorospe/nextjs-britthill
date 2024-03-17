import _ from 'lodash'
import { cache } from 'react';
// function
import { setDefaultHeaderColor, setHeaderColor } from './theme-style'
// api
import { getCollection, generalInfo } from '@/api/collection'
import { getItem } from '@/api/item'

const ids = {
  actionButtons: 29536,
  callToActionSections: 29559,
  footerLocationInfo: 29532,
  socialMedia: 29534,
  location: 29531,
  settings: 168574,
  homepageSlider: 30685
}

const getHomepageImageSlider = cache(async () => {
  const temp = await getCollection(`${ids.homepageSlider}`)

  const images = await Promise.all(temp[0].items?.map(async item => {
    const result = await getItem(item.id)
    return result[0]
  }))

  return images
})

const getLocation = cache(async () => {
  return await getCollection(`${ids.location}`)
})

const getGeneralInfo = cache(async () => {
  return await generalInfo()
})

const getSettings = cache(async () => {
  const items = await getItem(ids.settings)
  return items
})

const pageDetails = cache(async (id) => {
  const collection = await getItem(id)

  const { sectionItems } = _.first(collection)
  const firstSection = _.find(_.first(collection).sectionItems, data => data.fields.active === '1')
  const activeSections = _.filter(sectionItems, data => _.get(data, 'fields.active') === '1')

  let themeColor = setDefaultHeaderColor(_.get(firstSection, 'fields.customType') || _.get(firstSection, 'fields.type'));
  
  if (_.get(firstSection, 'fields.backgroundColorClass')) 
    themeColor = setHeaderColor(_.get(firstSection, 'fields.backgroundColorClass') ? _.get(firstSection, 'fields.backgroundColorClass') : 'default')

  if (!themeColor)
    themeColor = 'light-theme' 

  return {
    themeColor,
    activeSections
  }
})

const getCallToAction = cache(async () => {
  const temp = await getCollection(ids.callToActionSections)
  return temp[0].items
})

const getSocialMedia = cache(async () => {
  const temp = await getCollection(ids.socialMedia)
  return temp[0].items
})

const getFooterLocationInfo = cache(async () => {
  const temp = await getCollection(ids.footerLocationInfo)
  return temp[0].items
})

const getCommonCollection = cache(async () => {
  return await getCollection(`${ids.actionButtons},${ids.callToActionSections},${ids.footerLocationInfo},${ids.socialMedia},${ids.location}`)
})

export {
  pageDetails,
  getCommonCollection,
  getSettings,
  getCallToAction,
  getSocialMedia,
  getLocation,
  getGeneralInfo,
  getFooterLocationInfo,
  getHomepageImageSlider
}