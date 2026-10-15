import dns from 'dns';
const { Resolver } = dns.promises;

async function testWithPublicDns() {
  const resolver = new Resolver();
  resolver.setServers(['8.8.8.8', '1.1.1.1']);

  console.log('Testing with Public DNS (8.8.8.8 / 1.1.1.1):');
  for (const host of ['nextfarmbiosciences.app', 'www.nextfarmbiosciences.app']) {
    try {
      const a = await resolver.resolve4(host);
      console.log(`[A Record] ${host} ->`, a);
    } catch (e: any) {
      console.log(`[A Record ERROR] ${host} ->`, e.message);
    }

    try {
      const aaaa = await resolver.resolve6(host);
      console.log(`[AAAA Record] ${host} ->`, aaaa);
    } catch (e: any) {
      console.log(`[AAAA Record ERROR] ${host} ->`, e.message);
    }
  }
}

testWithPublicDns();
