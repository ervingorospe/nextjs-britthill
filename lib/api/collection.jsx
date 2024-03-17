// const url = process.env.REACT_APP_NEXT_API
const url = process.env.REACT_APP_FLUX_API

export const getCollection = async (ids) => {
  const { collections } = await (await fetch(`${url}?collection=${ids}&fields=collections{items{name,id,parentId,sectionCollection,fields,file}}`)).json()

  return collections
}

export const generalInfo = async () => {
  return await (await fetch(`${url}?fields=id,disabled,name,url,cleanUrl,devUrl,organizationName,organizationLegal,analyticsId,facebookId,defaultMetaTitle,cssUrls,siteColors,typekitId`)).json()
}