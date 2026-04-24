const { expect } = require("chai");
const CollectionPage = require("../../src/pages/CollectionPage");
const ProductPage = require("../../src/pages/ProductPage");
const CartPage = require("../../src/pages/CartPage");

require("../hooks/testHooks");

describe("Woodland regression suite", function regressionSuite() {
  it("opens a product from the boots collection and validates product details", async function testProductDetails() {
    const collectionPage = new CollectionPage(this.driver);
    const productPage = new ProductPage(this.driver);

    await collectionPage.navigateToBootsCollection();
    await collectionPage.waitForCollection();

    const firstProduct = await collectionPage.getFirstProductSummary();
    expect(firstProduct).to.not.equal(null);

    await collectionPage.openFirstProduct();
    await productPage.waitForProductPage();

    const details = await productPage.getProductDetails();
    expect(details.name).to.not.equal("");
    expect(details.price).to.not.equal("");
  });

  it("adds a product to cart from the product details page", async function testAddToCartFlow() {
    const productPage = new ProductPage(this.driver);
    const cartPage = new CartPage(this.driver);

    await productPage.navigateToFeaturedProduct();

    expect(await productPage.hasSelectedSize()).to.equal(true);

    await productPage.addToCart();
    expect(await productPage.hasCartConfirmation()).to.equal(true);
    expect(await cartPage.isCartDrawerVisible()).to.equal(true);
    expect(await cartPage.canProceedToCheckout()).to.equal(true);
  });
});
