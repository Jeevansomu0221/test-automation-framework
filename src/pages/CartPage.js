const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class CartPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.cartDrawer = By.xpath("//*[contains(text(), 'Shopping Cart') or contains(text(), 'items in cart')]");
    this.checkoutButton = By.xpath("//button[contains(., 'Checkout')]");
  }

  async isCartDrawerVisible() {
    return this.isDisplayed(this.cartDrawer, 15000);
  }

  async canProceedToCheckout() {
    return this.isDisplayed(this.checkoutButton, 10000);
  }
}

module.exports = CartPage;
