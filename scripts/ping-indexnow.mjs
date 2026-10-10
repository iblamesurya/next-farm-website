import fs from 'node:fs';

const key = '0fa53e20349f4c3984ca3b22cfc2d0f5';
const host = 'nextfarmbiosciences.app';
const keyLocation = `https://${host}/${key}.txt`;

// Read URLs from public/sitemap.xml
const sitemapXml = fs.readFileSync('public/sitemap.xml', 'utf8');
const urlMatches = [...sitemapXml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);

console.log(`Submitting ${urlMatches.length} URLs to IndexNow (Bing, Yahoo, DuckDuckGo, Yandex)...`);

const payload = {
  host,
  key,
  keyLocation,
  urlList: urlMatches
};

async function submitIndexNow() {
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    console.log(`IndexNow Response status: ${res.status} (${res.statusText})`);
    if (res.status === 200 || res.status === 202) {
      console.log('✅ URLs successfully submitted to IndexNow search engine cluster!');
    } else {
      const text = await res.text();
      console.log('Response body:', text);
    }
  } catch (err) {
    console.error('Error submitting to IndexNow:', err);
  }
}

submitIndexNow();
