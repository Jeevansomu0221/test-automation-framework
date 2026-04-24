const { after, afterEach, before, beforeEach } = require("mocha");
const { createDriver } = require("../../src/utils/driverFactory");
const { captureScreenshot } = require("../../src/utils/screenshotHelper");

before(async function beforeSuite() {
  global.__sharedDriver = await createDriver();
});

beforeEach(async function beforeScenario() {
  this.driver = global.__sharedDriver;
});

afterEach(async function afterScenario() {
  if (this.currentTest.state === "failed" && this.driver) {
    await captureScreenshot(this.driver, this.currentTest.title.replace(/\s+/g, "-").toLowerCase());
  }
});

after(async function afterSuite() {
  if (global.__sharedDriver) {
    await global.__sharedDriver.quit();
    global.__sharedDriver = null;
  }
});
