const userAgents = [
  { name: 'ChatGPT-User (Browsing)', ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChatGPT-User/1.0; +https://openai.com/bot)' },
  { name: 'GPTBot (Indexer)', ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)' },
  { name: 'OAI-SearchBot (SearchGPT)', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)' },
  { name: 'OpenAI Crawler', ua: 'Mozilla/5.0 (compatible; OpenAI/1.0)' },
  { name: 'Curl default', ua: 'curl/8.4.0' }
];

async function checkHeaders() {
  for (const item of userAgents) {
    try {
      const res = await fetch('https://nextfarmbiosciences.app/', {
        headers: {
          'User-Agent': item.ua,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5'
        }
      });
      console.log(`\n--- [${item.name}] ---`);
      console.log(`HTTP Status: ${res.status} ${res.statusText}`);
      console.log(`cf-ray: ${res.headers.get('cf-ray')}`);
      console.log(`cf-cache-status: ${res.headers.get('cf-cache-status')}`);
      console.log(`server: ${res.headers.get('server')}`);
      console.log(`content-type: ${res.headers.get('content-type')}`);
      const body = await res.text();
      console.log(`Body Length: ${body.length}`);
      if (body.includes('Attention Required! | Cloudflare') || body.includes('Just a moment...') || body.includes('cf-browser-verification')) {
        console.log(`⚠️ CLOUDFLARE CHALLENGE / BOT FIGHT MODE DETECTED!`);
      } else if (res.status === 403) {
        console.log(`⚠️ 403 FORBIDDEN (WAF BLOCK)`);
      } else {
        console.log(`✅ Clean page delivered (${body.substring(0, 100).replace(/\n/g, ' ')}...)`);
      }
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
    }
  }
}

checkHeaders();
