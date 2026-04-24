const { By, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class ProductPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.defaultProductPath = "/product/grey-black-boot-for-men";
    this.productTitle = By.css("h1.font-semibold");
    this.productPrice = By.xpath("//*[contains(text(), '₹')]");
    this.selectedSizeLabel = By.xpath("//*[contains(text(), 'Size:')]");
    this.addToBagButton = By.xpath("//button[contains(., 'Add to Cart')]");
    this.cartDrawer = By.xpath("//*[contains(text(), 'items in cart') or contains(text(), 'Shopping Cart')]");
  }

  async waitForProductPage() {
    await this.find(this.productTitle);
  }

  async navigateToFeaturedProduct() {
    await this.open(this.defaultProductPath);
    await this.assertNotBlocked();
    await this.dismissMarketingPopupIfPresent();
    await this.waitForProductPage();
  }

  async getProductDetails() {
    return {
      name: await this.getText(this.productTitle),
      price: await this.getText(this.productPrice)
    };
  }

  async hasSelectedSize() {
    return this.isDisplayed(this.selectedSizeLabel, 10000);
  }

  async addToCart() {
    const button = await this.find(this.addToBagButton);
    await this.driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", button);
    await this.driver.executeScript("arguments[0].click();", button);
    await this.driver.wait(until.elementLocated(this.cartDrawer), 20000);
  }

  async hasCartConfirmation() {
    return this.isDisplayed(this.cartDrawer, 15000);
  }
}

module.exports = ProductPage;
