require("dotenv").config();

function toBoolean(value, fallback) {
  if (value === undefined) {
    return fallback;
  }

  return String(value).toLowerCase() === "true";
}

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

module.exports = {
  baseUrl: process.env.BASE_URL || "https://www.woodlandworldwide.com/",
  browser: process.env.BROWSER || "chrome",
  headless: toBoolean(process.env.HEADLESS, false),
  implicitWait: toNumber(process.env.IMPLICIT_WAIT, 5000)
};
