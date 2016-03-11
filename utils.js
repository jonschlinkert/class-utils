'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('define-property', 'define');
require('isobject', 'isObj');
require('static-extend');
require = fn;

/**
 * Expose `utils`
 */

module.exports = utils;
