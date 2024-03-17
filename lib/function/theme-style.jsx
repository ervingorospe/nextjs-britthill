import _ from 'lodash'

const sectionThemes = {
  light: 'light-theme',
  dark: 'dark-theme'
}

const arrLightTheme = ['primary-100','primary-200','primary-300','primary-400','primary-500','secondary-500','white','gray-50','gray-100','gray-200','gray-300','primary-600']
const arrDarkTheme = ['gray-400','gray-500','gray-600','gray-700','gray-800','gray-900','black','primary-700','primary-800','primary-900']

const defaultDarkTheme = ['hero-custom', 'hero-centered', 'hero-banner', 'hero-image-right', 'hero-image-left','hero-centered-form','hero-form-right']
const defaultLightTheme = ['default', 'form-right-detached-title', 'about']

const setDefaultHeaderColor = (sectionType) => {
  if (_.includes(defaultLightTheme, sectionType))
    return sectionThemes.light
  
  if (_.includes(defaultDarkTheme, sectionType))
    return sectionThemes.dark
}

const setHeaderColor = (sectionBgColor) => {
  if (_.includes(arrLightTheme, sectionBgColor))
    return sectionThemes.light
  
  if (_.includes(arrDarkTheme, sectionBgColor))
    return sectionThemes.dark
}

const setSectionColor = (sectionBgColor) => {
  if(!sectionBgColor) {
    return sectionThemes.light
  }

  if (_.includes(arrLightTheme, sectionBgColor))
    return sectionThemes.light
  
  if (_.includes(arrDarkTheme, sectionBgColor))
    return sectionThemes.dark
}

const setSectionStyles = (fields, defaultStyle) => {
  return {
    backgroundColorClass: !_.get(fields, 'backgroundColorClass') || _.get(fields, 'backgroundColorClass') === "default"  ? defaultStyle.backgroundColorClass : _.get(fields, 'backgroundColorClass'),
    buttonStyle: _.get(fields, 'buttonStyle') === "default" ? defaultStyle.buttonStyle : _.get(fields, 'buttonStyle'),
    buttonStyle2: _.get(fields, 'buttonStyle-2') === "default" ? defaultStyle.buttonStyle2 : _.get(fields, 'buttonStyle-2'),
    childButtonSize: _.get(fields, 'childButtonSize') === "default" ? defaultStyle.childButtonSize : _.get(fields, 'childButtonSize'),
    childButtonStyle: _.get(fields, 'childButtonStyle') === "default" ? defaultStyle.childButtonStyle : _.get(fields, 'childButtonStyle'),
    childIconSize: _.get(fields, 'childIconSize') === "default" ? defaultStyle.childIconSize : _.get(fields, 'childIconSize'),
    childTextAlign: _.get(fields, 'childTextAlign') === "default" ? defaultStyle.childTextAlign : _.get(fields, 'childTextAlign'),
    containerWidth: _.get(fields, 'containerWidth') === "default" ? defaultStyle.containerWidth : _.get(fields, 'containerWidth'),
    bodySize: _.get(fields, 'bodySize') === "default" ? defaultStyle.bodySize : _.get(fields, 'bodySize'),
    extraBodySize: _.get(fields, 'extraBodySize') === "default" ? defaultStyle.extraBodySize : _.get(fields, 'extraBodySize'),
    subtitleSize: _.get(fields, 'subtitleSize') === "default" ? defaultStyle.subtitleSize : _.get(fields, 'subtitleSize'),
    subtitleTag: _.get(fields, 'subtitleTag') === "default" ? defaultStyle.subtitleTag : _.get(fields, 'subtitleTag'),
    textAlign: _.get(fields, 'textAlign') === "default" ? defaultStyle.textAlign : _.get(fields, 'textAlign'),
    titleSize: _.get(fields, 'titleSize') === "default" ? defaultStyle.titleSize : _.get(fields, 'titleSize'),
    titleTag: _.get(fields, 'titleTag') === "default" ? defaultStyle.titleTag : _.get(fields, 'titleTag'),
    backgroundCoverOpacity: _.get(fields, 'backgroundCoverOpacity') === "default" ? defaultStyle.backgroundCoverOpacity : _.get(fields, 'backgroundCoverOpacity'),
    backgroundImageBlendMode: _.get(fields, 'backgroundImageBlendMode')  === "default" ? defaultStyle.backgroundImageBlendMode : _.get(fields, 'backgroundImageBlendMode')
  }
}

export {
  sectionThemes,
  setDefaultHeaderColor,
  setHeaderColor,
  setSectionColor,
  setSectionStyles
}