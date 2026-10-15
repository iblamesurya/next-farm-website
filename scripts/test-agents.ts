const agents = [
  { name: 'Default Fetch / Node', ua: 'undici' },
  { name: 'Googlebot', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
  { name: 'GPTBot', ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)' },
  { name: 'ClaudeBot', ua: 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)' },
  { name: 'Python Requests', ua: 'python-requests/2.31.0' },
  { name: 'Generic Web Reader / Headless', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 HeadlessChrome' }
];

async function testAgents() {
  for (const a of agents) {
    try {
      const res = await fetch('https://nextfarmbiosciences.app/', {
        headers: { 'User-Agent': a.ua }
      });
      console.log(`[${a.name}] HTTP ${res.status} (${res.headers.get('content-type')})`);
    } catch (e: any) {
      console.log(`[${a.name}] ERROR: ${e.message}`);
    }
  }
}

testAgents();
