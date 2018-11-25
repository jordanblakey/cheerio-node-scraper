const rp = require('request-promise');
const $ = require('cheerio');

////////////////////////////////////////////////////////////////////////////////
// chq(
//   'big > a',
//   'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States'
// );
//
// function chq(query, url) {
//   rp(url)
//     .then(function(html) {
//       const elmList = [];
//       let len = $(query, html).length;
//       for (let i = 0; i < len; i++) {
//         elmList.push($(query, html)[i].attribs.href);
//       }
//       // console.log($(query, html).length);
//       // console.log($(query, html));
//       console.log(elmList);
//     })
//     .catch(function(err) {
//       //handle error
//     });
// }

////////////////////////////////////////////////////////////////////////////////
// request('http://rationaloptimist.com/blog', (err, res, html) => {
//   if (!err && res.statusCode == 200) {
//     const $ = cheerio.load(html);

//     // let h1 = $('h1');
//     // let body = $('body div').attr('class');
//     // let body = $('body div').prop('class');
//     // console.log(h1.text());
//     // console.log(body.text());
//     // console.log(body);
//     // let output = body.find('h2').text();
//     let output = $('h2').html();
//     console.log(output);
//     // let selection = $(
//     //   'title',
//     //   'html',
//     //   '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body></body></html>'
//     // );
//     // console.log(typeof selection);
//     // console.log(selection);
//   }
// });

rp('https://en.wikipedia.org/wiki/George_Washington').then(h => {
  // console.log(h);
  console.log($('.firstHeading', h).text());
  console.log($('.bday', h).text());
});
