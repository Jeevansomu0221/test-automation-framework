const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const env = require("../config/env");

async function buildChrome() {
  const options = new chrome.Options();

  if (env.headless) {
    options.addArguments("--headless=new");
  }

  options.addArguments("--start-maximized");
  options.excludeSwitches("enable-automation");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  await driver.manage().setTimeouts({
    implicit: env.implicitWait,
    pageLoad: 60000,
    script: 60000
  });

  return driver;
}

async function buildFirefox() {
  const options = new firefox.Options();

  if (env.headless) {
    options.addArguments("-headless");
  }

  const driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();

  await driver.manage().setTimeouts({
    implicit: env.implicitWait,
    pageLoad: 60000,
    script: 60000
  });

  return driver;
}

async function createDriver() {
  if (env.browser.toLowerCase() === "firefox") {
    return buildFirefox();
  }

  return buildChrome();
}

module.exports = { createDriver };
