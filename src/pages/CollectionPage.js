const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class CollectionPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.bootsCollectionPath = "/collections/men/boots";
    this.productLinks = By.css("a[href*='/product/']");
    this.productName = By.css("h3");
    this.priceLabel = By.xpath(".//*[contains(text(), '₹')]");
  }

  async navigateToBootsCollection() {
    await this.open(this.bootsCollectionPath);
    await this.assertNotBlocked();
    await this.dismissMarketingPopupIfPresent();
  }

  async waitForCollection() {
    await this.find(this.productLinks);
  }

  async getHeadingText() {
    return this.getPageTitle();
  }

  async getResultCount() {
    const products = await this.driver.findElements(this.productLinks);
    return products.length;
  }

  async getFirstProductSummary() {
    const products = await this.driver.findElements(this.productLinks);
    if (products.length === 0) {
      return null;
    }

    const first = products[0];
    const name = await first.findElement(this.productName).getText().catch(() => "");
    const price = await first.findElement(this.priceLabel).getText().catch(() => "");
    return { name, price };
  }

  async openFirstProduct() {
    const products = await this.driver.findElements(this.productLinks);
    if (products.length === 0) {
      throw new Error("No products were displayed in the collection page.");
    }

    await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", products[0]);
    await this.driver.executeScript("arguments[0].click();", products[0]);
  }
}

module.exports = CollectionPage;
