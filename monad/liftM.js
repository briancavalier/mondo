/** @license MIT License (c) copyright 2010-2013 original author or authors */

/**
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author: Brian Cavalier
 * @author: John Hann
 */

(function(define) { 'use strict';
define(function() {

	return function liftM(f) {
		return function(m) {
			return m.chain(function(x) {
				return m.constructor.of(f(x));
			});
		};
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));
