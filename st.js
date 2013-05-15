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

	var toList, curry;

	curry = require('./lib/fn').curry;
	toList = require('./lib/list').from;

	return {
		sequence: sequence
	};

	function sequence() {
		var fs = toList(arguments);
		return  curry(function (v, initial) {
			return fs.reduce(function (state, f) {
				return f(state[0], state[1]);
			}, [v, initial]);
		});
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
