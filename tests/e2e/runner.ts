/**
 * Master E2E Test Suite Runner
 * Next Farm Bio Sciences Aquaculture E-Commerce Platform
 * Requirements-Driven Opaque-Box Acceptance Test Suite (Tiers 1 - 4)
 */

import { runSuites, resetRegistry, type TestReport } from './framework.ts';
import { registerTier1Tests } from './tier1-features.test.ts';
import { registerTier2Tests } from './tier2-boundaries.test.ts';
import { registerTier3Tests } from './tier3-pairwise.test.ts';
import { registerTier4Tests } from './tier4-scenarios.test.ts';
import { registerTier5Tests } from './tier5-adversarial.test.ts';

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const tierArg = args.find(a => a.startsWith('--tier='));
  const targetTier = tierArg ? tierArg.split('=')[1] : null;

  console.log(`\n\x1b[1m\x1b[32m========================================================================================\x1b[0m`);
  console.log(`\x1b[1m\x1b[33m 🔬 NEXT FARM BIO SCIENCES - REQUIREMENTS-DRIVEN E2E TEST SUITE RUNNER\x1b[0m`);
  console.log(`\x1b[1m\x1b[36m Environment: Node.js ${process.version} | Architecture: Cloudflare Pages Edge Runtime\x1b[0m`);
  console.log(`\x1b[1m\x1b[32m========================================================================================\x1b[0m\n`);

  resetRegistry();

  if (!targetTier || targetTier === '1') {
    registerTier1Tests();
  }
  if (!targetTier || targetTier === '2') {
    registerTier2Tests();
  }
  if (!targetTier || targetTier === '3') {
    registerTier3Tests();
  }
  if (!targetTier || targetTier === '4') {
    registerTier4Tests();
  }
  if (!targetTier || targetTier === '5') {
    registerTier5Tests();
  }

  const report: TestReport = await runSuites();

  console.log(`\n\x1b[1m\x1b[34m========================================================================================\x1b[0m`);
  console.log(`\x1b[1m\x1b[37m 📊 E2E TEST SUITE EXECUTION SUMMARY REPORT\x1b[0m`);
  console.log(`\x1b[1m\x1b[34m========================================================================================\x1b[0m`);
  console.log(`  \x1b[1mTotal Tests Executed:\x1b[0m  ${report.total}`);
  console.log(`  \x1b[1m\x1b[32mPassed Tests:\x1b[0m          ${report.passed}`);
  console.log(`  \x1b[1m\x1b[31mFailed Tests:\x1b[0m          ${report.failed}`);
  console.log(`  \x1b[1mExecution Duration:\x1b[0m    ${report.durationMs}ms`);
  console.log(`\x1b[1m\x1b[34m========================================================================================\x1b[0m`);

  if (report.failed > 0) {
    console.log(`\n\x1b[1m\x1b[31m🚨 FAILURES ENCOUNTERED (${report.failed}):\x1b[0m`);
    for (const [idx, failure] of report.failures.entries()) {
      console.log(`\n  ${idx + 1}) \x1b[1m${failure.suitePath} > ${failure.testTitle}\x1b[0m`);
      console.log(`     \x1b[31m${failure.errorMessage}\x1b[0m`);
      if (failure.stack) {
        console.log(`     \x1b[90m${failure.stack.split('\n').slice(1, 3).join('\n     ')}\x1b[0m`);
      }
    }
    console.log(`\n\x1b[1m\x1b[31m❌ TEST SUITE FAILED\x1b[0m\n`);
    process.exit(1);
  } else {
    console.log(`\n\x1b[1m\x1b[32m✅ ALL ${report.total} E2E TESTS PASSED WITH 100% SUCCESS RATE!\x1b[0m\n`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error('\x1b[31mFatal test runner exception:\x1b[0m', err);
  process.exit(1);
});
