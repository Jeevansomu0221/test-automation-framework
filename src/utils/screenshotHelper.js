const fs = require("fs");
const { buildReportPath } = require("./fileHelper");

async function captureScreenshot(driver, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = buildReportPath(`${name}-${timestamp}.png`);
  const image = await driver.takeScreenshot();
  fs.writeFileSync(filePath, image, "base64");
  return filePath;
}

module.exports = { captureScreenshot };
