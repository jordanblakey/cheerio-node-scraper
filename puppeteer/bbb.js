const puppeteer = require('puppeteer')
const $ = require('cheerio')
const url = 'https://www.bbb.org/'
const fs = require('fs')
let obj_out = {}
let output = ''
let that
let global_page

function strip(str) {
  return str.replace(/^\s+|\s+$/g, '')
}

puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage()
  })
  .then(function(page) {
    global_page = page
    return page.goto(url).then(function() {
      return page.content()
    })
  })
  .then(function(html) {
    let data = $('#root', html)
      .next()
      .html()
    data = JSON.parse(strip(data.replace(/window.__PRELOADED_STATE__ =/g, '')))
    console.log('BBB Rating: ' + data.businessProfile.businessData.rating.bbbRating)
    console.log('Reviews Total: ' + data.businessProfile.businessData.reviewsComplaints.reviewsTotal)
    console.log('Reviews URL: ' + data.businessProfile.urls.reviews)
    return global_page.goto(data.businessProfile.urls.reviews).then(function() {
      return global_page.content()
    })
  })
  .then(function(html) {
    $('.dtm-review', html).each(function() {
      $('div:nth-child(2)', $(this).html()).each(function() {
        console.log($(this).text())
      })
      $('span', $(this).html()).each(function() {
        console.log($(this).text())
      })
    })
  })
  .catch(function(err) {
    //handle error
  })
