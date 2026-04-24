const { By, until } = require("selenium-webdriver");
const env = require("../config/env");

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async open(path = "") {
    await this.driver.get(new URL(path, env.baseUrl).toString());
  }

  async find(locator, timeout = 20000) {
    await this.driver.wait(until.elementLocated(locator), timeout);
    const element = await this.driver.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return element;
  }

  async click(locator) {
    const element = await this.find(locator);
    await this.driver.wait(until.elementIsEnabled(element), 10000);
    await element.click();
  }

  async type(locator, value) {
    const element = await this.find(locator);
    await element.clear();
    await element.sendKeys(value);
  }

  async getText(locator) {
    const element = await this.find(locator);
    return element.getText();
  }

  async isDisplayed(locator, timeout = 10000) {
    try {
      const element = await this.find(locator, timeout);
      return element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async waitForTitleIncludes(titleText, timeout = 20000) {
    await this.driver.wait(until.titleContains(titleText), timeout);
  }

  async getPageTitle() {
    return this.driver.getTitle();
  }

  async getPageSource() {
    return this.driver.getPageSource();
  }

  async assertNotBlocked() {
    const title = (await this.getPageTitle()).toLowerCase();
    const source = (await this.getPageSource()).toLowerCase();

    if (
      title.includes("access denied") ||
      source.includes("access denied") ||
      title.includes("pardon our interruption") ||
      source.includes("pardon our interruption")
    ) {
      throw new Error(
        "The live website blocked the automated session. This environment is being filtered by the site."
      );
    }
  }

  async dismissMarketingPopupIfPresent() {
    const selectors = [
      By.xpath("//button[contains(., 'No thanks')]"),
      By.xpath("//button[contains(., 'Not now')]"),
      By.xpath("//button[contains(., 'Maybe later')]"),
      By.css("button[aria-label='Close']"),
      By.css("[id*='close']"),
      By.css("[class*='close']")
    ];

    for (const selector of selectors) {
      try {
        const buttons = await this.driver.findElements(selector);
        for (const button of buttons) {
          if (await button.isDisplayed()) {
            await this.driver.executeScript("arguments[0].click();", button);
            return true;
          }
        }
      } catch (error) {
        // Ignore optional marketing prompt.
      }
    }

    return false;
  }

  async acceptCookiesIfPresent() {
    const selectors = [
      By.css("button[aria-label*='accept' i]"),
      By.css("button[title*='accept' i]"),
      By.xpath("//button[contains(translate(., 'ACEIPT', 'aceipt'), 'accept')]")
    ];

    for (const selector of selectors) {
      try {
        const button = await this.driver.findElement(selector);
        if (await button.isDisplayed()) {
          await button.click();
          return true;
        }
      } catch (error) {
        // Ignore optional cookie prompt.
      }
    }

    return false;
  }
}

module.exports = BasePage;
