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

	var curry = require('./lib/fn').curry;

	return {
		qs: curry(qs),
		qsa: curry(qsa)
	};

	function qs(selector, root) {
		return root.querySelector(selector);
	}

	function qsa(selector, root) {
		return root.querySelectorAll(selector);
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
