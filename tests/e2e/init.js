/* global jasmine, jest, beforeAll, afterAll, beforeEach, device */

const detox = require('detox');
const config = require('../../package.json').detox;
const adapter = require('detox/runners/jest/adapter');
const specReporter = require('detox/runners/jest/specReporter');
const assignReporter = require('detox/runners/jest/assignReporter');

jasmine.getEnv().addReporter(adapter);

// This takes care of generating status logs on a per-spec basis. By default, jest only reports at file-level.
// This is strictly optional.
jasmine.getEnv().addReporter(specReporter);

// This will post which device has assigned to run a suite, which can be useful in a multiple-worker tests run.
// This is strictly optional.
jasmine.getEnv().addReporter(assignReporter);

// Set the default timeout
jest.setTimeout(600000); // 10 min

beforeAll(async () => {
  await detox.init(config, { launchApp: false });
}, 600000);

beforeEach(async () => {
  await device.launchApp({ newInstance: true, delete: true });
  await sleep(2000);
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
