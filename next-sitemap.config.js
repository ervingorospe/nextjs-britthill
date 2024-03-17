/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: 'https://www.britthillinteriors.com/',
  generateRobotsTxt: true, // (optional)
  changefreq: 'daily',
  generateIndexSitemap: false,
  exclude: ['/home', '/interior-design', '/news-and-media']
  // ...other options
}

module.exports = config