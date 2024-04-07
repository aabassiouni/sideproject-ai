import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://usesideprojectai.com/',
      lastModified: new Date(),
    },
  ]
}