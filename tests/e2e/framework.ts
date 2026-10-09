/**
 * Next Farm Bio Sciences - E2E Test Suite Framework
 * Lightweight, zero-dependency, type-safe test runner for Node 24 Edge / TypeScript.
 */

export interface TestCase {
  title: string;
  fn: () => void | Promise<void>;
  status: 'pending' | 'passed' | 'failed' | 'skipped';
  error?: Error;
  durationMs?: number;
}

export interface TestSuite {
  title: string;
  tests: TestCase[];
  suites: TestSuite[];
  beforeAllFns: Array<() => void | Promise<void>>;
  afterAllFns: Array<() => void | Promise<void>>;
  beforeEachFns: Array<() => void | Promise<void>>;
  afterEachFns: Array<() => void | Promise<void>>;
}

export interface TestReport {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  durationMs: number;
  failures: Array<{
    suitePath: string;
    testTitle: string;
    errorMessage: string;
    stack?: string;
  }>;
}

// Global registry for suites
const rootSuite: TestSuite = {
  title: 'Root',
  tests: [],
  suites: [],
  beforeAllFns: [],
  afterAllFns: [],
  beforeEachFns: [],
  afterEachFns: []
};

let currentSuite: TestSuite = rootSuite;

export function describe(title: string, fn: () => void): void {
  const parent = currentSuite;
  const suite: TestSuite = {
    title,
    tests: [],
    suites: [],
    beforeAllFns: [],
    afterAllFns: [],
    beforeEachFns: [],
    afterEachFns: []
  };
  parent.suites.push(suite);
  currentSuite = suite;
  try {
    fn();
  } finally {
    currentSuite = parent;
  }
}

export function it(title: string, fn: () => void | Promise<void>): void {
  currentSuite.tests.push({
    title,
    fn,
    status: 'pending'
  });
}

export const test = it;

export function beforeAll(fn: () => void | Promise<void>): void {
  currentSuite.beforeAllFns.push(fn);
}

export function afterAll(fn: () => void | Promise<void>): void {
  currentSuite.afterAllFns.push(fn);
}

export function beforeEach(fn: () => void | Promise<void>): void {
  currentSuite.beforeEachFns.push(fn);
}

export function afterEach(fn: () => void | Promise<void>): void {
  currentSuite.afterEachFns.push(fn);
}

// Assertion Matchers
export class AssertionError extends Error {
  actual?: any;
  expected?: any;

  constructor(message: string, actual?: any, expected?: any) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

class Expectation<T = any> {
  actual: T;
  isNot: boolean;

  constructor(actual: T, isNot: boolean = false) {
    this.actual = actual;
    this.isNot = isNot;
  }

  get not(): Expectation<T> {
    return new Expectation(this.actual, !this.isNot);
  }

  private fail(message: string, expected?: any): void {
    throw new AssertionError(message, this.actual, expected);
  }

  toBe(expected: any): void {
    const pass = Object.is(this.actual, expected);
    if (this.isNot ? pass : !pass) {
      this.fail(
        this.isNot
          ? `Expected value NOT to be ${JSON.stringify(expected)}`
          : `Expected ${JSON.stringify(this.actual)} to be ${JSON.stringify(expected)}`,
        expected
      );
    }
  }

  toEqual(expected: any): void {
    const deepEqual = (a: any, b: any): boolean => {
      if (Object.is(a, b)) return true;
      if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      for (const key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
      }
      return true;
    };

    const pass = deepEqual(this.actual, expected);
    if (this.isNot ? pass : !pass) {
      this.fail(
        this.isNot
          ? `Expected value NOT to deep-equal ${JSON.stringify(expected)}`
          : `Expected ${JSON.stringify(this.actual)} to deep-equal ${JSON.stringify(expected)}`,
        expected
      );
    }
  }

  toBeTruthy(): void {
    const pass = Boolean(this.actual);
    if (this.isNot ? pass : !pass) {
      this.fail(`Expected ${JSON.stringify(this.actual)} ${this.isNot ? 'NOT ' : ''}to be truthy`);
    }
  }

  toBeFalsy(): void {
    const pass = !Boolean(this.actual);
    if (this.isNot ? pass : !pass) {
      this.fail(`Expected ${JSON.stringify(this.actual)} ${this.isNot ? 'NOT ' : ''}to be falsy`);
    }
  }

  toBeDefined(): void {
    const pass = this.actual !== undefined;
    if (this.isNot ? pass : !pass) {
      this.fail(`Expected value ${this.isNot ? 'NOT ' : ''}to be defined`);
    }
  }

  toBeNull(): void {
    const pass = this.actual === null;
    if (this.isNot ? pass : !pass) {
      this.fail(`Expected ${JSON.stringify(this.actual)} ${this.isNot ? 'NOT ' : ''}to be null`);
    }
  }

  toBeGreaterThan(expected: number): void {
    const pass = typeof this.actual === 'number' && this.actual > expected;
    if (this.isNot ? pass : !pass) {
      this.fail(`Expected ${this.actual} ${this.isNot ? 'NOT ' : ''}to be > ${expected}`, expected);
    }
  }

  toBeGreaterThanOrEqual(expected: number): void {
    const pass = typeof this.actual === 'number' && this.actual >= expected;
    if (this.isNot ? pass : !pass) {
      this.fail(`Expected ${this.actual} ${this.isNot ? 'NOT ' : ''}to be >= ${expected}`, expected);
    }
  }

  toBeLessThan(expected: number): void {
    const pass = typeof this.actual === 'number' && this.actual < expected;
    if (this.isNot ? pass : !pass) {
      this.fail(`Expected ${this.actual} ${this.isNot ? 'NOT ' : ''}to be < ${expected}`, expected);
    }
  }

  toBeLessThanOrEqual(expected: number): void {
    const pass = typeof this.actual === 'number' && this.actual <= expected;
    if (this.isNot ? pass : !pass) {
      this.fail(`Expected ${this.actual} ${this.isNot ? 'NOT ' : ''}to be <= ${expected}`, expected);
    }
  }

  toBeCloseTo(expected: number, numDigits: number = 2): void {
    const diff = Math.abs((this.actual as unknown as number) - expected);
    const tolerance = Math.pow(10, -numDigits) / 2;
    const pass = diff < tolerance;
    if (this.isNot ? pass : !pass) {
      this.fail(
        `Expected ${this.actual} ${this.isNot ? 'NOT ' : ''}to be close to ${expected} (precision: ${numDigits})`,
        expected
      );
    }
  }

  toContain(item: any): void {
    let pass = false;
    if (typeof this.actual === 'string' && typeof item === 'string') {
      pass = this.actual.includes(item);
    } else if (Array.isArray(this.actual)) {
      pass = this.actual.includes(item) || this.actual.some(x => JSON.stringify(x) === JSON.stringify(item));
    }
    if (this.isNot ? pass : !pass) {
      this.fail(`Expected collection ${this.isNot ? 'NOT ' : ''}to contain ${JSON.stringify(item)}`, item);
    }
  }

  toMatch(regex: RegExp | string): void {
    const re = typeof regex === 'string' ? new RegExp(regex) : regex;
    const pass = typeof this.actual === 'string' && re.test(this.actual);
    if (this.isNot ? pass : !pass) {
      this.fail(`Expected ${JSON.stringify(this.actual)} ${this.isNot ? 'NOT ' : ''}to match ${re}`);
    }
  }

  toHaveLength(length: number): void {
    const actualLen = (this.actual as any)?.length;
    const pass = actualLen === length;
    if (this.isNot ? pass : !pass) {
      this.fail(
        `Expected length ${this.isNot ? 'NOT ' : ''}to be ${length}, but got ${actualLen}`,
        length
      );
    }
  }

  toThrow(expectedMessage?: string | RegExp): void {
    if (typeof this.actual !== 'function') {
      this.fail(`Expected function to throw, but received ${typeof this.actual}`);
    }
    let threw = false;
    let thrownError: any = null;
    try {
      this.actual();
    } catch (err) {
      threw = true;
      thrownError = err;
    }

    let pass = threw;
    if (threw && expectedMessage) {
      const msg = thrownError?.message || String(thrownError);
      if (typeof expectedMessage === 'string') {
        pass = msg.includes(expectedMessage);
      } else {
        pass = expectedMessage.test(msg);
      }
    }

    if (this.isNot ? pass : !pass) {
      if (this.isNot) {
        this.fail(`Expected function NOT to throw, but it threw: ${thrownError?.message || thrownError}`);
      } else {
        this.fail(
          `Expected function to throw${expectedMessage ? ` matching ${expectedMessage}` : ''}, but ${
            threw ? `got message "${thrownError?.message}"` : 'it did not throw'
          }`
        );
      }
    }
  }
}

export function expect<T = any>(actual: T): Expectation<T> {
  return new Expectation(actual);
}

// Suite Runner Execution
export async function runSuites(targetSuite: TestSuite = rootSuite, pathPrefix: string = ''): Promise<TestReport> {
  const report: TestReport = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    durationMs: 0,
    failures: []
  };

  const startTime = Date.now();

  async function executeSuite(suite: TestSuite, currentPath: string): Promise<void> {
    const fullPath = currentPath ? `${currentPath} > ${suite.title}` : suite.title;

    // Run beforeAll hooks
    for (const beforeAllFn of suite.beforeAllFns) {
      await beforeAllFn();
    }

    // Run tests in current suite
    for (const testCase of suite.tests) {
      report.total++;
      const testStart = Date.now();

      try {
        // Run beforeEach hooks
        for (const beforeEachFn of suite.beforeEachFns) {
          await beforeEachFn();
        }

        await testCase.fn();
        testCase.status = 'passed';
        testCase.durationMs = Date.now() - testStart;
        report.passed++;
        console.log(`    \x1b[32m✔\x1b[0m ${testCase.title} \x1b[90m(${testCase.durationMs}ms)\x1b[0m`);

        // Run afterEach hooks
        for (const afterEachFn of suite.afterEachFns) {
          await afterEachFn();
        }
      } catch (err: any) {
        testCase.status = 'failed';
        testCase.error = err;
        testCase.durationMs = Date.now() - testStart;
        report.failed++;
        console.log(`    \x1b[31m✖\x1b[0m ${testCase.title} \x1b[90m(${testCase.durationMs}ms)\x1b[0m`);
        console.log(`      \x1b[31mError: ${err.message}\x1b[0m`);

        report.failures.push({
          suitePath: fullPath,
          testTitle: testCase.title,
          errorMessage: err.message,
          stack: err.stack
        });
      }
    }

    // Recursively execute child suites
    for (const childSuite of suite.suites) {
      console.log(`\n  \x1b[1m\x1b[36m📁 ${childSuite.title}\x1b[0m`);
      await executeSuite(childSuite, fullPath);
    }

    // Run afterAll hooks
    for (const afterAllFn of suite.afterAllFns) {
      await afterAllFn();
    }
  }

  // Execute from root
  for (const topSuite of targetSuite.suites) {
    console.log(`\n\x1b[1m\x1b[34m======================================================================\x1b[0m`);
    console.log(`\x1b[1m\x1b[33m🚀 SUITE: ${topSuite.title}\x1b[0m`);
    console.log(`\x1b[1m\x1b[34m======================================================================\x1b[0m`);
    await executeSuite(topSuite, '');
  }

  report.durationMs = Date.now() - startTime;
  return report;
}

export function resetRegistry(): void {
  rootSuite.suites = [];
  rootSuite.tests = [];
  rootSuite.beforeAllFns = [];
  rootSuite.afterAllFns = [];
  rootSuite.beforeEachFns = [];
  rootSuite.afterEachFns = [];
  currentSuite = rootSuite;
}
