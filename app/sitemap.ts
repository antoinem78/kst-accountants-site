import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { services } from '@/lib/services';
import { insights } from '@/lib/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;

  const corePages = [
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

  const insightsIndex = {
    url: `${base}/insights`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  };

  const insightEntries = insights.map((i) => ({
    url: `${base}/insights/${i.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(i.publishedAt + 'T00:00:00Z'),
  }));

  const tools = [
    {
      url: `${base}/tools/take-home-pay`,
      priority: 0.7,
      changeFrequency: 'yearly' as const,
    },
  ];

  return [
    ...corePages,
    ...serviceEntries,
    insightsIndex,
    ...insightEntries,
    ...tools,
  ].map((p) => ({ lastModified: now, ...p }));
}
