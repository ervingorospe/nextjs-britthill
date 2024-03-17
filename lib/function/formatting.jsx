import _ from 'lodash'

const formatRouteName = (name) => {
  const routeName = name.replaceAll('/', '').toLowerCase();

  return routeName.replaceAll(' ', '-').toLowerCase();;
}

const sectionsComponent = (item) => {
  if (!_.get(item, 'fields.active') || (!_.get(item, 'fields.customType') && !_.get(item, 'fields.type'))) {
    return null
  }

  if (_.get(item, 'fields.customType')) {
    return _.get(item, 'fields.customType').toLowerCase()
  }

  return _.get(item, 'fields.type').toLowerCase()
}

const formatComponentName = (name) => {
  const splitName = name.split(/\W+/);

  splitName.map((arr, index) => {
    return splitName[index] = arr.charAt(0).toUpperCase() + arr.slice(1)
  })

  return `${splitName.join("").replaceAll("[^A-Za-z0-9]","")}`
}

const capitalizeFirstLetter = (name) => {
  if (typeof name === 'string')
    return name.charAt(0).toUpperCase() + name.slice(1)
}

const lowerCaseFirstLetter = (name) => {
  if (typeof name === 'string')
    return name.charAt(0).toLowerCase() + name.slice(1)
}

const itemLink = (item) => {
  return {
    name: _.get(item, 'fields.nav.text') ? _.get(item, 'fields.nav.text') : item.name,
    href: navLinkRouteName(item),
    target: _.get(item, 'fields.nav.target'),
    pageLink: _.get(item, 'fields.nav.url') ? false : _.get(item, 'fields.pageLink') ? true : false
  }
}

const navLinkRouteName = (item) => {
  return _.get(item, 'fields.nav.url') ? _.get(item, 'fields.nav.url') : _.get(item, 'fields.pageLink') ? _.get(item, 'fields.pageLink') : 
    _.get(item, 'fields.routeName') ? _.get(item, 'fields.routeName') : _.get(item, 'fields.slug') ? _.get(item, 'fields.slug') : linkNameFormat(item.name)
}

const linkNameFormat = (name) => {
  return name.replaceAll(' ', '-').toLowerCase();
}

const actionButtonLink = (item) => {
  return {
    name: _.get(item, 'fields.button.text') ? _.get(item, 'fields.button.text') : item.name,
    href: actionButtonRouteName(item),
    target: _.get(item, 'fields.button.target'),
    pageLink: _.get(item, 'fields.button.url') ? false : _.get(item, 'fields.buttonPageLink') ? true : false
  }
}

const actionButtonRouteName = (item) => {
  return _.get(item, 'fields.button.url') ? _.get(item, 'fields.button.url') : _.get(item, 'fields.buttonPageLink') ? _.get(item, 'fields.buttonPageLink') : linkNameFormat(item.name)
}

export {
  formatRouteName,
  sectionsComponent,
  formatComponentName,
  capitalizeFirstLetter,
  lowerCaseFirstLetter,
  itemLink,
  navLinkRouteName,
  actionButtonLink,
  linkNameFormat
}
