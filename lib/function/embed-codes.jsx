const getTiktokSrc = (embedCode) => {
  const splitEmbedCode = embedCode.split('"')
  return {
    scriptCode: splitEmbedCode[1],
    divCode: splitEmbedCode[3]
  }
}

const splitWuffooForm = (embedCode) => {
  const splitEmbedCode = embedCode.split('<script type="text/javascript">')
  const splitScriptCode = splitEmbedCode[1].split('</script>')

  return {
    divElement: splitEmbedCode[0],
    scriptCode: splitScriptCode[0]
  }
}

const getScriptUrl = (scriptEmbedCode) => {
  scriptEmbedCode = scriptEmbedCode ? scriptEmbedCode : ''
  const srcRegex = /src=["'](.*?)["']/

  const match = scriptEmbedCode.match(srcRegex)
  const srcUrl = match ? match[1] : ''

  return srcUrl
}

export {
  getTiktokSrc,
  splitWuffooForm,
  getScriptUrl
}