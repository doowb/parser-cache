# parser-cache [![NPM version](https://badge.fury.io/js/parser-cache.svg)](http://badge.fury.io/js/parser-cache)

> Cache and load parsers, similiar to consolidate.js engines.

## Install
#### Install with [npm](npmjs.org)

```bash
npm i parser-cache --save
```

## Usage

```js
var parsers = require('parser-cache');
```

## API
### [Parsers](index.js#L18)

* `options` **{Object}**: Default options to use.    

```js
var Parsers = require('parser-cache');
var parsers = new Parsers();
```

### [.register](index.js#L65)

Register the given parser callback `fn` as `ext`. If `ext` is not given, the parser `fn` will be pushed into the default parser stack.

* `ext` **{String}**    
* `fn` **{Function|Object}**: or `options`    
* `returns` **{Object}** `parsers`: to enable chaining.  

```js
// Default stack
parsers.register(require('parser-front-matter'));

// Associated with `.hbs` file extension
parsers.register('hbs', require('parser-front-matter'));
```

### [.parse](index.js#L151)

Run a stack of **async** parsers for the given `file`. If `file` is an object with an `ext` property, then `ext` is used to get the parser stack. If `ext` doesn't have a stack, the default `noop` parser will be used.

* `file` **{Object|String}**: Either a string or an object.    
* `stack` **{Array}**: Optionally pass an array of functions to use as parsers.    
* `options` **{Object}**    
* `returns` **{Object}**: Normalize `file` object.  

```js
var str = fs.readFileSync('some-file.md', 'utf8');
template.parse({ext: '.md', content: str}, function (err, file) {
  console.log(file);
});
```

Or, explicitly pass an array of parser functions as a section argument.

```js
template.parse(file, [a, b, c], function (err, file) {
  console.log(file);
});
```

### [.parseSync](index.js#L186)

Run a stack of **async** parsers for the given `file`. If `file` is an object with an `ext` property, then `ext` is used to get the parser stack. If `ext` doesn't have a stack, the default `noop` parser will be used.

* `file` **{Object|String}**: Either a string or an object.    
* `stack` **{Array}**: Optionally pass an array of functions to use as parsers.    
* `options` **{Object}**    
* `returns` **{Object}**: Normalize `file` object.  

```js
var str = fs.readFileSync('some-file.md', 'utf8');
template.parseSync({ext: '.md', content: str});
```

Or, explicitly pass an array of parser functions as a section argument.

```js
template.parseSync(file, [a, b, c]);
```

### [.get](index.js#L214)

Return the parser stored by `ext`. If no `ext` is passed, the entire parsers is returned.

* `ext` **{String}**: The parser to get.    
* `returns` **{Object}**: The specified parser.  

```js
parser.set('md', function() {});
parser.get('md')
// => [function]
```

### [.reset](index.js#L243)

Remove the parser stack for the given `ext`, or if no value is specified the entire parsers object is reset.

* `ext` **{String}**: The stack to remove.    

**Example:**

```js
parsers.reset()
```

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 30, 2014._