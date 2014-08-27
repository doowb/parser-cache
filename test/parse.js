/*!
 * parser-cache <https://github.com/jonschlinkert/parser-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var Parsers = require('..');
var parsers = new Parsers();
var utils = require('parser-utils');
var _ = require('lodash');

describe('default parsers', function () {
  before(function () {
    parsers.init();
  });


  describe('when the default parser is used:', function () {
    it('should return a normalized `file` object.', function (done) {
      parsers.parse('str', function (err, file) {
        if (err) {
          console.log(err);
        }

        file.should.be.an.object;
        file.should.have.property('path');
        file.should.have.property('data');
        file.should.have.property('content');
        file.should.have.property('orig');
      });

      done();
    });

    it('should return content unmodified:', function (done) {
      var noop = parsers.get('*');

      parsers.parse('str', noop, function (err, file) {
        if (err) {console.log(err); }
        file.content.should.eql('str');
      });
      done();
    });
  });

  describe('when a file extension is passed on an object:', function () {
    it('should match the extension to a parser stack.', function (done) {
      parsers.register('md', function(file, next) {
        next('abc-' + file.content);
      });

      parsers.parse({ext: 'md', content: 'xyz'}, function (err, file) {
        if (err) {console.log(err); }
        file.content.should.eql('abc-xyz');
      });
      done();
    });
  });


  it('should parse content with the given parser.', function (done) {
    var matter = parsers.get('md');

    var fixture = '---\ntitle: Front Matter\n---\nThis is content.';
    parsers.parse(fixture, matter, function (err, file) {
      if (err) {
        console.log(err);
      }

      file.should.be.an.object;
      file.should.have.property('path');
      file.should.have.property('data');
      file.should.have.property('content');
      file.should.have.property('orig');

      file.data.should.eql({title: 'Front Matter'});
      file.content.should.eql('\nThis is content.');
    });

    done();
  });

  it('should retain the original `orig.content` value.', function (done) {

    var file = {
      path: 'a/b/c.md',
      content: 'Hooray!',
      blah: 'bbb',
      data: {
        title: 'FLFLFLF'
      }
    };

    var a = utils.extendFile(file, {title: 'ABC'});
    parsers.parse(a, function (err, file) {
      if (err)  console.log(err);
      file.orig.content.should.eql('Hooray!');
    });

    a.orig.content = 'fosososoos';

    parsers.parse(a, function (err, file) {
      if (err)  console.log(err);
      file.orig.content.should.eql('Hooray!');
    });

    done();
  });

});