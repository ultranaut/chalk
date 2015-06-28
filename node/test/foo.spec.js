'use strict';

var expect = require('chai').expect;
var foo = require('../src/foo');

describe('foo', function () {
  it('should be a function', function () {
    expect(foo).to.be.a('function');
  });
  it('should return what was passed to it', function () {
    var bar = 'bar';
    var baz = { baz: 'qux' };
    expect(foo(bar)).to.equal(bar);
    expect(foo(baz)).to.deep.equal(baz);
  });
});
