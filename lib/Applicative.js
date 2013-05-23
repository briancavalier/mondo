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

	var mondo = require('../mondo');

	/**
	 * Create an applicative from a functor
	 * @param {{ map: function(f:function) }|function(f:function)} functor
	 * @return {{ apply: function, map: function }} applicative
	 */
	return function makeApplicative(functor) {
		return Object.create(functor, {
			apply: { value: apply }
		});
	};

	function apply(functor) {
		return this.map(function(f) {
			return mondo.map(f, functor);
		});
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
