import fs from 'fs';
import path from 'path';
import os from 'os';

async function main() {
  const tomlPath = path.join(os.homedir(), '.wrangler/config/default.toml');
  const content = fs.readFileSync(tomlPath, 'utf8');
  const match = content.match(/oauth_token\s*=\s*"([^"]+)"/);
  if (!match) {
    console.error('No token');
    return;
  }
  const token = match[1];
  const zoneId = '7ae4cec03565221cafd30ab1597f5c1d';

  const endpoints = [
    `/zones/${zoneId}/settings`,
    `/zones/${zoneId}/rulesets`,
    `/zones/${zoneId}/firewall/rules`,
    `/zones/${zoneId}/bot_management`
  ];

  for (const ep of endpoints) {
    try {
      console.log(`\nQuerying ${ep}...`);
      const res = await fetch(`https://api.cloudflare.com/client/v4${ep}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      console.log(`Status ${res.status}: success=${data.success}`);
      if (data.errors && data.errors.length > 0) {
        console.log('Errors:', data.errors);
      }
      if (data.result) {
        console.log('Result sample:', JSON.stringify(data.result).substring(0, 300));
      }
    } catch (e: any) {
      console.log('Fetch error:', e.message);
    }
  }
}

main();
