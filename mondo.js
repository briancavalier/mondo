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

	var fn, curry;

	fn = require('./lib/fn');
	curry = fn.curry;

	return {
		of: of,
		empty: empty,
		append: curry(append),
		map: curry(map),
		chain: curry(chain),
		fold: curry(fold),
		apply: curry(apply)
	};

	function of(a, x) {
		return a.of(x);
	}

	function empty(a) {
		return typeof a.empty === 'function' ? a.empty :
			   a.constructor === Function ? new a() : new a.constructor();
	}

	function append(a, b) {
		if(typeof a.concat === 'function') {
			return a.concat(b);
		}

		return a + b;
	}

	function map(f, functor) {
		if(typeof functor.map === 'function') {
			return functor.map(f);
		} else if(typeof functor === 'function') {
			return fn.compose(f, functor);
		} else {
			return f(functor);
		}
	}

	function fold(f, initial, foldable) {
		return foldable.reduce(f, initial);
	}

	function chain(f, m) {
		if(typeof m.chain === 'function') {
			return m.chain(f);
		}

		return flatten(map(f, m));
	}

	function flatten(m) {
		if(typeof m.flatten === 'function') {
			return m.flatten();
		}

		return fold(append, empty(m), m);
	}

	function apply(functor, applicative) {
		if(typeof applicative.ap === 'function') {
			return applicative.ap(functor);
		}

		return map(function(f) {
			return map(f, functor);
		}, applicative);
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
