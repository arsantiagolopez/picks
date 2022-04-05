import puppeteer from "puppeteer";

// Scrape reddit comments from the r/sportsbook tennis threads
const scrapeReddit = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  } catch (err) {
    console.log(err);
  }
};

export { scrapeReddit };
