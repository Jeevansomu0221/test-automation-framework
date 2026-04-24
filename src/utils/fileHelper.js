const fs = require("fs");
const path = require("path");

function ensureDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function buildReportPath(fileName) {
  const reportsDir = path.join(process.cwd(), "reports", "screenshots");
  ensureDirectory(reportsDir);
  return path.join(reportsDir, fileName);
}

module.exports = { ensureDirectory, buildReportPath };
