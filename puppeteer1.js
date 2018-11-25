const puppeteer = require('puppeteer');

const getScreenshot = async (url, path) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: path });
  await browser.close();
};

getScreenshot('https://example.com', 'screenshot.png');

const getPDF = async (url, path = 'scraped_page.pdf', format = 'A4') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.pdf({ path: path, format: format });
  await browser.close();
};

getPDF('https://example.com');
