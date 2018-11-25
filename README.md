# Pupeteer + Cheerio Node Web Scraping

## Cheerio Basic Usage

```js
const cheerio = require('cheerio');
const $ = cheerio.load('<h2 class="title">Hello world</h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

console.log($.html());
```

## Advanced Usage

```js
// Passing options into the load function to control parsing
const $ = cheerio.load('<html>...</html>', {
  withDomLvl1: true,
  normalizeWhitespace: false,
  xmlMode: false,
  decodeEntities: true
});

// Passing the root into a query
$('ul', '<html>...</html>');

// Passing context of id "fruits" and the root
$('ul', '#fruits' '<html>...</html>');
```

## With Puppeteer

```js
const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.reddit.com';

puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    $('h2', html).each(function() {
      console.log($(this).text());
    });
  })
  .catch(function(err) {
    //handle error
  });
```

## Methods

### \$('<selector>')

Returns a 'selection' object.

```js
$('<selector>'); //=>
```

### .is()

```js
$('body').is(); //=> true
$('.obscure-classname').is(); //=> false
```

### .attr()

```js
$('ul').attr('id');
//=> fruits

$('.apple')
  .attr('id', 'favorite')
  .html();
//=> <li class="apple" id="favorite">Apple</li>

$('.pear')
  .removeAttr('class')
  .html();
//=> <li>Pear</li>
```

### .prop()

```js
$('input[type="checkbox"]').prop('checked');
//=> false

$('input[type="checkbox"]')
  .prop('checked', true)
  .val();
//=> ok
```

### .data()

```js
$('<div data-apple-color="red"></div>').data();
//=> { appleColor: 'red' }

$('<div data-apple-color="red"></div>').data('apple-color');
//=> 'red'

const apple = $('.apple').data('kind', 'mac');
apple.data('kind');
//=> 'mac'
```

### .val()

```js
$('input[type="text"]').val();
//=> input_text

$('input[type="text"]')
  .val('test')
  .html();
//=> <input type="text" value="test"/>
```

### .hasClass(), .addClass(), .removeClass()

```js
$('.pear').hasClass('pear');
//=> true

$('apple').hasClass('fruit');
//=> false

$('li').hasClass('pear');
//=> true

$('.pear')
  .addClass('fruit')
  .html();
//=> <li class="pear fruit">Pear</li>

$('.apple')
  .addClass('fruit red')
  .html();
//=> <li class="apple fruit red">Apple</li>

$('.pear')
  .removeClass('pear')
  .html();
//=> <li class="">Pear</li>

$('.apple')
  .addClass('red')
  .removeClass()
  .html();
//=> <li class="">Apple</li>

$('.apple.green')
  .toggleClass('fruit green red')
  .html();
//=> <li class="apple fruit red">Apple</li>

$('.apple.green')
  .toggleClass('fruit green red', true)
  .html();
//=> <li class="apple green fruit red">Apple</li>
```

### serialize()

```js
$(
  '<form><input name="foo" value="bar" checked /><input name="foo" value="qux" checked /></form>'
).serialize();
//=> foo=bar&foo=qux
```

find()
closest()

parent()
parents()
parentsUntil()

next()
nextAll()
nextUntil()

prev()
prevAll()
prevUntil()

slice()
siblings()
children()
contents()

each()
map()
filter()

not()
has()
first()
last()
eq(i)
get()
index()
end()
add()
addBack()

append()
appendTo()
prepend()
prependTo()
