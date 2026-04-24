const { expect } = require("chai");
const CollectionPage = require("../../src/pages/CollectionPage");

require("../hooks/testHooks");

describe("Woodland smoke suite", function smokeSuite() {
  it("loads the boots collection page successfully", async function testCollectionPage() {
    const collectionPage = new CollectionPage(this.driver);

    await collectionPage.navigateToBootsCollection();
    await collectionPage.waitForCollection();

    expect((await collectionPage.getHeadingText()).toLowerCase()).to.include("boots");
  });

  it("opens the boots collection and displays products", async function testCollection() {
    const collectionPage = new CollectionPage(this.driver);

    await collectionPage.navigateToBootsCollection();
    await collectionPage.waitForCollection();

    expect((await collectionPage.getHeadingText()).toLowerCase()).to.include("boots");
    expect(await collectionPage.getResultCount()).to.be.greaterThan(0);
  });
});
