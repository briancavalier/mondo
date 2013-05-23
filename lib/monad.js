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
	 * Creates a monad from an applicative
	 * @param {{ map:function, flatten:function }} functor also having
	 *  a flatten method.
	 * @returns {{ chain: function, map:function, flatten:function }}
	 */
	return function makeMonad(functor) {
		return Object.create(functor, {
			chain: { value: chain }
		});
	};

	function chain(f) {
		return this.map(f).flatten();
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
