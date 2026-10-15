async function checkUrl(url: string) {
  console.log(`\nFetching: ${url}`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    });
    console.log(`HTTP Status: ${res.status}`);
    const text = await res.text();
    const hasValidFrom = text.includes('validFrom');
    const hasCertId = text.includes('certificationIdentification');
    const hasCertRating = text.includes('certificationRating');
    console.log(`- validFrom: ${hasValidFrom}`);
    console.log(`- certificationIdentification: ${hasCertId}`);
    console.log(`- certificationRating: ${hasCertRating}`);
    return { status: res.status, hasValidFrom, hasCertId, hasCertRating };
  } catch (err) {
    console.error(`Error fetching ${url}:`, err);
    return null;
  }
}

async function main() {
  const urls = [
    'https://b8dcc324.next-farm-website.pages.dev/products/next-min',
    'https://b8dcc324.next-farm-website.pages.dev/products/next-pro',
    'https://nextfarmbiosciences.app/products/next-min',
    'https://nextfarmbiosciences.app/products/next-pro'
  ];

  for (const url of urls) {
    await checkUrl(url);
  }
}

main();
