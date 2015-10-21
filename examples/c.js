'use strict';

var B = require('./b');
var define = require('define-property');

function C(options) {
  B.call(this);
  this.options = options || {};
}
B.extend(C);
define(C, 'metadata', {
  name: 'C',
  repository: 'foo/c'
});

C.prototype.set = function(key, value) {
  this[key] = value;
  return this;
};
C.prototype.get = function(key) {
  return this[key];
};
C.prototype.del = function(key) {
  delete this[key];
};
Object.defineProperty(C.prototype, 'count', {
  get: function () {
    return Object.keys(this).length;
  },
  set: function () {
  }
});

module.exports = C;
