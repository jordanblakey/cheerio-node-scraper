const puppeteer = require('puppeteer')
const $ = require('cheerio')
const url = 'https://aws.amazon.com'
const fs = require('fs')
let obj_out = {}
let output = ''
let that

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
    $('.lb-trigger span', html).each(function() {
      // Create Section Object
      let section_obj = {}
      that = $(this).text()
      section_obj[that] = {}

      // Get target elements
      let id = $(this)
        .parent()
        .parent()
        .attr('id')
        .split('-')
      let target_id = 'lb-item-expander-content-' + id[id.length - 1]
      id = id.join('-')

      // Get Sub Items
      $('#' + target_id + ' .lb-content-item', html).each(function() {
        let h = $(this).html()
        title = $.load(h)
        title('span').remove()
        section_obj[that][strip(title.text())] = strip($('span', h).text())
      })

      // Add to section object
      obj_out = Object.assign(section_obj, obj_out)
    })

    // Write the file
    fs.writeFile('scraped.json', JSON.stringify(obj_out, null, 2), function(err) {
      if (err) return console.log(err)
      console.log('Written to file!')
    })
    console.log(obj_out)
  })
  .catch(function(err) {
    //handle error
  })
