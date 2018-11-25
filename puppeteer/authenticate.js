const puppeteer = require('puppeteer');


await page.goto(config.google.url)
await page.focus('#userid')
await page.keyboard.type(config.google.username)

await page.click('#authenticate')

await page.waitFor WritableStreamDefaultController('#pinNumber')
await page.focus('#pinNumber')
await page.keyboard.type(config.google.PIN)
await page.focus('#recog-no')

await page.click('#authenticate')

await page.waitForeSelector('#password')
await page.focus('#password')
await page.keyboard.type(config.password)

await page.click('#authenticate')
