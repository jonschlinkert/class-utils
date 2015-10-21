'use strict';

var A = require('./a');
var define = require('define-property');

function B(options) {
  A.call(this);
  this.options = options || {};
}

define(B, 'metadata', {
  name: 'B',
  repository: 'foo/b'
});
A.extend(B);

B.prototype.set = function(key, value) {
  this[key] = value;
  return this;
};
B.prototype.get = function(key) {
  return this[key];
};
B.prototype.del = function(key) {
  delete this[key];
};
Object.defineProperty(B.prototype, 'count', {
  get: function () {
    return Object.keys(this).length;
  },
  set: function () {
  }
});

define(B, 'metadata', {
  name: 'B',
  repository: 'foo/b'
});
module.exports = B;
