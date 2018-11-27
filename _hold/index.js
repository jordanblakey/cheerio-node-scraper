const puppeteer = require('puppeteer')
const $ = require('cheerio')
const url = 'https://aws.amazon.com'
const fs = require('fs')
let output = ''

function strip(str) {
  return str.replace(/^\s+|\s+$/g, '')
}

puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage()
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content()
    })
  })
  .then(function(html) {
    $('.lb-content-item', html).each(function() {
      let h = $(this).html()
      title = $.load(h)
      title('span').remove()
      // console.log(title.text())
      // console.log($('span', h).text())
      output += strip(title.text()) + ': ' + strip($('span', h).text()) + '\n'
    })
    console.log(output)
    fs.appendFile('scraped.out', output, function(err) {
      if (err) return console.log(err)
      console.log('Written to file')
    })
  })
  .catch(function(err) {
    //handle error
  })
