const rp = require('request-promise');
const $ = require('cheerio');

const potusParse = function(url) {
  return rp(url)
    .then(function(h) {
      return {
        name: $('.firstHeading', h).text(),
        birthday: $('.bday', h).text()
      };
    })
    .catch(e => {
      console.error(e);
    });
};

module.exports = potusParse;

// potusParse('https://en.wikipedia.org/wiki/George_Washington').then(res => {
//   console.log(res);
// });

// rp('https://en.wikipedia.org/wiki/George_Washington').then(h => {
//   // console.log(h);
//   console.log($('.firstHeading', h).text());
//   console.log($('.bday', h).text());
// });
// Adding a note.