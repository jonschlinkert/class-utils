'use strict';

var App = require('./app');
var define = require('define-property');

function A(options) {
  App.call(this);
  this.options = options || {};
}

define(A, 'metadata', {
  name: 'A',
  repository: 'foo/a'
});
App.extend(A);

A.prototype.set = function(key, value) {
  this[key] = value;
  return this;
};
A.prototype.get = function(key) {
  return this[key];
};
A.prototype.del = function(key) {
  delete this[key];
};
Object.defineProperty(A.prototype, 'count', {
  get: function () {
    return Object.keys(this).length;
  },
  set: function () {
  }
});
module.exports = A;
