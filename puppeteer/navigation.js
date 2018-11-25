const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.reddit.com';

// puppeteer
//   .launch()
//   .then(browser => {
//     return browser.newPage();
//   })
//   .then(page => {
//     return page.goto(url).then(function() {
//       return page.content();
//     });
//   })
//   .then(html => {
//     $('h2', html).each(function() {
//       console.log($(this).text());
//     });
//   })
//   .catch(err => {
//     //handle error
//   });

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();
  await page.goto(url);
  const html = await page.content();
  $('h2', html).each(function() {
    console.log($(this).text());
  });

  await navigationPromise;

  await browser.close();
})();

// const puppeteer = require('puppeteer');
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   const navigationPromise = page.waitForNavigation();

//   await page.waitForSelector(
//     '.container > .TableObject > .TableObject-item > .d-flex > .org-name'
//   );
//   await page.click(
//     '.container > .TableObject > .TableObject-item > .d-flex > .org-name'
//   );

//   await page.waitForSelector(
//     '.org-repos > ul > .col-12:nth-child(1) > .d-inline-block > h3'
//   );
//   await page.click(
//     '.org-repos > ul > .col-12:nth-child(1) > .d-inline-block > h3'
//   );

//   await page.waitForSelector(
//     'ul > .col-12:nth-child(1) > .d-inline-block > h3 > a'
//   );
//   await page.click('ul > .col-12:nth-child(1) > .d-inline-block > h3 > a');

//   await navigationPromise;

//   await page.waitForSelector('.repository-content > div > .f4 > span > a');
//   await page.click('.repository-content > div > .f4 > span > a');

//   await navigationPromise;

//   await page.waitForSelector(
//     '.devsite-footer-promos > .devsite-full-site-width > .devsite-footer-promos-list > .devsite-footer-promo:nth-child(1) > .devsite-footer-promo-title'
//   );
//   await page.click(
//     '.devsite-footer-promos > .devsite-full-site-width > .devsite-footer-promos-list > .devsite-footer-promo:nth-child(1) > .devsite-footer-promo-title'
//   );

//   await browser.close();
// })();
