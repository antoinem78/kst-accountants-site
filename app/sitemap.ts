import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { services } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;
  const pages = [
    { url: `${base}/`, priority: 1.0, changeFrequency: 'monthly' as const },
    { url: `${base}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/contact`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
  ];
  const serviceEntries = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  }));
  return [...pages, ...serviceEntries].map((p) => ({ ...p, lastModified: now }));
}
