import fs from 'fs';
import path from 'path';
import os from 'os';

const wranglerDir = path.join(os.homedir(), '.wrangler');
console.log('Checking directory:', wranglerDir);

function findToml(dir: string): string | null {
  if (!fs.existsSync(dir)) return null;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const res = findToml(full);
      if (res) return res;
    } else if (entry.name.endsWith('.toml')) {
      return full;
    }
  }
  return null;
}

const tomlPath = findToml(wranglerDir);
console.log('Found toml:', tomlPath);

if (tomlPath) {
  const content = fs.readFileSync(tomlPath, 'utf8');
  const match = content.match(/oauth_token\s*=\s*"([^"]+)"/);
  if (match) {
    console.log('Found OAuth token (prefix):', match[1].substring(0, 10) + '...');
    // Query Cloudflare API for zones
    fetch('https://api.cloudflare.com/client/v4/zones?name=nextfarmbiosciences.app', {
      headers: {
        'Authorization': `Bearer ${match[1]}`
      }
    })
    .then(r => r.json())
    .then(data => {
      console.log('Zones result:', JSON.stringify(data, null, 2));
      if (data.result && data.result.length > 0) {
        const zoneId = data.result[0].id;
        console.log('Zone ID:', zoneId);
        // Check bot management / settings
        return fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/settings/security_level`, {
          headers: { 'Authorization': `Bearer ${match[1]}` }
        })
        .then(r => r.json())
        .then(sec => console.log('Security Level:', sec));
      }
    })
    .catch(err => console.error('API Error:', err));
  } else {
    console.log('No oauth_token found in toml');
  }
}
