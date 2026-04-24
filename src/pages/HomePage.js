const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class HomePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.headerLogo = By.css("a[href='/'], img[alt*='Woodland']");
    this.heroSection = By.css("main");
    this.featuredBootsLink = By.css("a[href='/collections/men/boots']");
  }

  async navigate() {
    await this.open("/");
    await this.assertNotBlocked();
    await this.dismissMarketingPopupIfPresent();
    await this.acceptCookiesIfPresent();
    await this.find(this.heroSection);
  }

  async isLoaded() {
    return this.isDisplayed(this.headerLogo);
  }

  async openBootsCollection() {
    const link = await this.find(this.featuredBootsLink);
    await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", link);
    await this.driver.executeScript("arguments[0].click();", link);
  }
}

module.exports = HomePage;
