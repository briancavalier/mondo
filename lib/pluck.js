/** @license MIT License (c) copyright 2010-2013 original author or authors */

/**
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author: Brian Cavalier
 * @author: John Hann
 */

(function(define) { 'use strict';
define(function(require) {

	var curry = require('./fn').curry;

	return curry(function pluck(prop, obj) {
		return obj[prop];
	});

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
