# terrier

`terrier` is a light-weight DOM template loader and element plucker. It creates a DOM node from a string of HTML and plucks any elements with the attribute `data-pluck`, returning them in a dictionary.

`terrier` should work in all browsers that support `querySelectorAll()`.

It turns this:

```html
<div id='root'>
  <ul class='people' data-pluck='list'>
    <li data-pluck='people[]'>Jason</li>
    <li data-pluck='people[]'>Jim</li>
    <li data-pluck='people[]'>John</li>
  </ul>
  <input type='text' data-pluck='input'>
  <input type='button' data-pluck='submit'>
</div>
```

Into this (wherein `#<...>` denotes a real DOM element):

```
{
  root: #<div#root>,
  list: #<ul.people>,
  people: [
    #<li>,
    #<li>,
    #<li>
  ],
  input: #<input[type=text]>,
  submit: #<input[type=button]>
}
```

## Installation

### Browserify

Get it:

```shell
$ npm install terrier
```

Require it:

```javascript
var terrier = require('terrier');
```

### UMD

Copy and paste either `build/terrier.js` or `build/terrier.min.js` into your project.

## API

#### `terrier(html, [options])`

Converts `html` into a DOM node and plucks all nested elements with the `data-pluck` attribute, inserting them into a dictionary keyed by said value of `[data-pluck]`.

`[data-pluck]` may contain a list of whitespace separated values; in this case a key for each distinct value will be created in the output dictionary. Where a key is suffixed with `[]`, e.g. `people[]`, multiple plucked elements sharing the same key will be collected into an array.

Returns the dictionary of plucked elements, including an additional `root` entry for the root element.

Supported `options`:

  * `attribute`: name of attribute used to denote elements to be plucked into the returned structure. Defaults to `data-pluck`.
  * `mapNode`: a callback that may be used to map each plucked element. Defaults to the identity.

#### `terrier.compile(html, [options])`

As above, but compiles `html` into an efficient, reusable template. Returns a template object; call `instance()` on this to create any number of template instances, each with its own unique DOM hierarchy.

## Copyright &amp; License

&copy; 2014 Jason Frame [ [@jaz303](http://twitter.com/jaz303) / [jason@onehackoranother.com](mailto:jason@onehackoranother.com) ]

Released under the ISC license.