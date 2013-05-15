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

	var curry, toList, classes, addClass, removeClass, undef;

	curry = require('./lib/fn').curry;
	toList = require('./lib/list').from;
	classes = require('./lib/classes');
	addClass = classes.add;
	removeClass = classes.remove;

	return {
		mapf: mapf,
		map: map,
		toggle: toggle,
		range: range,
		cardinality: cardinality,
		lift: lift,
		lift2: lift2
	};

	function mapf(f) {
		return curry(function(value, s) {
			var pair = f(value);
			return [value, addClass(pair[0], removeClass(pair[1], s))];
		});
	}

	function map(hash) {
		var all = Object.keys(hash).join(' ');
		hash = pivotHash(hash);

		return mapf(function(value) {
			return [hash[value], all];
		});
	}

	function toggle(name) {
		return mapf(function(value) {
			return value ? [name, ''] : ['', name];
		});
	}

	function cardinality(prefix) {
		var none, one, many, all;

		none = prefix + '-none';
		one = prefix + '-one';
		many = prefix + '-many';
		all = none + ' ' + one + ' ' + many;

		return mapf(function(value) {
			return [(value < 1 ? none : value > 1 ? many : one), all];
		});
	}

	function range(ranges) {
		var keys, all;

		keys = Object.keys(ranges);
		all = keys.join(' ');

		return mapf(function(value) {
			var index;

			keys.some(function(name, i) {
				if(ranges[name] > value) {
					return true;
				} else {
					index = i;
					return false;
				}
			});

			return index !== undef ? [keys[index], all] : [];
		});
	}

	function lift(transform) {
		return curry(function(node) {
			var result = transform(node.className);
			node.className = result[1];
			return [result[0], node];
		});
	}

	function lift2(transform) {
		return curry(function(value, node) {
			var result = transform(value, node.className);
			node.className = result[1];
			return [result[0], node];
		});
	}

//--------------------------------------------------------------------
// Helpers

	function pivotHash(hash) {
		return Object.keys(hash).reduce(function(pivoted, k) {
			pivoted[hash[k]] = k;
			return pivoted;
		}, {});
	}


});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
