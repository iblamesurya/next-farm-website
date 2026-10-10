import { NextResponse } from 'next/server';
import { BLOG_ARTICLES } from '@/lib/blog-data';
import { DISTRICT_GUIDES } from '@/lib/districts-data';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = 'https://nextfarmbiosciences.app';
  const pubDate = new Date().toUTCString();

  const blogItems = BLOG_ARTICLES.map((article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/blog/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${article.slug}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <author><![CDATA[${article.author.name} (info@nextfarmbiosciences.app)]]></author>
      <category><![CDATA[${article.category}]]></category>
      <pubDate>${new Date(article.publishDate).toUTCString()}</pubDate>
    </item>
  `).join('');

  const districtItems = DISTRICT_GUIDES.map((d) => `
    <item>
      <title><![CDATA[${d.name} Aquaculture Medicine & Biosecurity Field Guide]]></title>
      <link>${baseUrl}/districts/${d.slug}</link>
      <guid isPermaLink="true">${baseUrl}/districts/${d.slug}</guid>
      <description><![CDATA[${d.metaDescription}]]></description>
      <author><![CDATA[Next Farm Field Microbiology Cell (info@nextfarmbiosciences.app)]]></author>
      <category><![CDATA[Aquaculture Districts & Salinity]]></category>
      <pubDate>${pubDate}</pubDate>
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Next Farm Bio Sciences — Clinical Aquaculture & Pathology Feed</title>
    <link>${baseUrl}</link>
    <description>Official clinical publications, field trial monographs, and district aquaculture management guides for Indian shrimp and prawn culture.</description>
    <language>en-in</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${blogItems}
    ${districtItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
