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

	var applicative, monad, _nothing, undef;

	applicative = require('../lib/applicative');
	monad = require('../lib/monad');

	function Maybe(x) {
		this.value = x;
		if(x === undef) {
			this.map = this.flatten = nothing;
		}
	}

	Maybe.prototype = monad(applicative({
		map: function mapJust(f) {
			return new Maybe(f(this.value));
		},
		flatten: function flattenJust() {
			return new Maybe(this.value.value);
		}
	}));

	Maybe.of = function(x) {
		return new Maybe(x);
	}

	_nothing = Maybe.nothing = new Maybe(undef);

	function nothing() {
		return _nothing;
	}

	return Maybe;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
