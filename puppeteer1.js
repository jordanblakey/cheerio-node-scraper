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

const getRepos = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/jordanblakey?tab=repositories', {
    waitUntil: 'networkidle2'
  });
  await page.waitForSelector('#user-repositories-list li');

  var tmp = await page.evaluate(() => {
    var repos = document.querySelectorAll('#user-repositories-list li h3 a');
    return Array.from(repos).map(repo => {
      return repo.href;
    });
  });

  console.log(tmp);
  await browser.close();
};

getRepos();
