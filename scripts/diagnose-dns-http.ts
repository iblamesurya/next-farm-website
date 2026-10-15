import dns from 'dns/promises';

async function testDnsAndHttp() {
  console.log('=== 1. DNS RESOLUTION TEST ===');
  for (const host of ['nextfarmbiosciences.app', 'www.nextfarmbiosciences.app']) {
    try {
      const a = await dns.resolve4(host);
      console.log(`[A Record] ${host} -> ${JSON.stringify(a)}`);
    } catch (e: any) {
      console.error(`[A Record FAIL] ${host} -> ${e.code || e.message}`);
    }

    try {
      const aaaa = await dns.resolve6(host);
      console.log(`[AAAA Record] ${host} -> ${JSON.stringify(aaaa)}`);
    } catch (e: any) {
      console.error(`[AAAA Record FAIL] ${host} -> ${e.code || e.message}`);
    }
  }

  console.log('\n=== 2. HTTP HEADER & REDIRECT TEST ===');
  const urls = [
    'https://nextfarmbiosciences.app/',
    'https://nextfarmbiosciences.app/robots.txt',
    'https://www.nextfarmbiosciences.app/'
  ];

  for (const u of urls) {
    try {
      console.log(`\nFetching HEAD for: ${u}`);
      const res = await fetch(u, {
        method: 'HEAD',
        redirect: 'manual',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      console.log(`Status: ${res.status} ${res.statusText}`);
      console.log(`Location: ${res.headers.get('location')}`);
      console.log(`Server: ${res.headers.get('server')}`);
      console.log(`CF-Ray: ${res.headers.get('cf-ray')}`);
    } catch (e: any) {
      console.error(`HTTP fetch failed for ${u}:`, e.message);
    }
  }
}

testDnsAndHttp();
