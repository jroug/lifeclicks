import type { MetadataRoute } from 'next'

const robots: MetadataRoute.Robots = {
  rules: {
    userAgent: '*',
    allow: '',
    disallow: '/',
  },
  sitemap: undefined,
}

export default robots