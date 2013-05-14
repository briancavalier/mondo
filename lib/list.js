/** @license MIT License (c) copyright 2010-2013 original author or authors */

/**
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author: Brian Cavalier
 * @author: John Hann
 */
(function(define) {
define(function(require) {
	/*global StopIteration: true*/

	var fn, curryable, flip, uncurryThis, curry,
	ap, apSlice, apForEach, apMap, apReduce, apReduceRight,
	apFilter, apSome, apEvery, apConcat, apJoin, apReverse,
	stopIteration;

	fn = require('./fn');

	stopIteration = typeof StopIteration != 'undefined' ? StopIteration : {};

	uncurryThis = fn.uncurryThis;
	curry = fn.curry;
	flip = fn.flip;

	// Borrow a bunch of stuff from Array
	ap = Array.prototype;
	apSlice = uncurryThis(ap.slice);
	apForEach = uncurryThis(ap.slice);
	apMap = uncurryThis(ap.map);
	apReduce = uncurryThis(ap.reduce);
	apReduceRight = uncurryThis(ap.reduceRight);
	apFilter = uncurryThis(ap.filter);
	apSome = uncurryThis(ap.some);
	apEvery = uncurryThis(ap.every);
	apConcat = uncurryThis(ap.concat);
	apJoin = uncurryThis(ap.join);
	apReverse = uncurryThis(ap.reverse);

	createList.from = from;
	createList.len = length;
	createList.reverse = apReverse;

	curryable = {
		head: head,
		tail: tail,
		initial: initial,
		last: last,

		indexOf: indexOf,
		lastIndexOf: lastIndexOf,
		findFirst: findFirst,
		findLast: findLast,

		concat: concat,
		join: flip(apJoin),
		flatten: flatten,
		flattenDeep: flattenDeep,

		map: flip(apMap),
		flatMap: flatMap,
		filter: flip(apFilter),
		some: flip(apSome),
		every: flip(apEvery),
		forEach: apForEach,

		reduce: fold,
		reduceRight: foldr,
		fold: fold,
		fold1: fold1,
		foldr: foldr,
		foldr1: foldr1,
		unfold: unfold
	};

	Object.keys(curryable).forEach(function(name) {
		createList[name] = fn.curry(curryable[name]);
	});

	return createList;

	// List operations

	/**
	 * Create a list from the supplied items
	 * @param  {*} item1 first item
	 * @return {Array} list of supplied items
	 */
	function createList(item1 /*, item2... */) {
		return apSlice(arguments);
	}

	/**
	 * Return a list containing the same elements as the
	 * provided array-like.
	 * @param {*} arrayLike any array-like object
	 * @returns {Array} list containing same elements as arrayLike
	 */
	function from(arrayLike) {
		return apSlice(arrayLike);
	}

	/**
	 *
	 * @param {Array} list
	 * @returns {Number} number of elements in list
	 */
	function length(list) {
		return list && list.length;
	}

	/**
	 * Concatenates the two lists into one new list
	 * @param  {Array} head
	 * @param  {Array} tail
	 * @return {Array} concatenated list
	 */
	function concat(head, tail) {
		return apConcat(head, tail);
	}

	/**
	 * Flatten a shallow list of lists
	 * @param {Array} list of lists
	 * @returns {Array} flattened list
	 */
	function flatten(list) {
		return apReduce(list, concat, []);
	}

	/**
	 * Recursively flatten a deep list of lists
	 * @param {Array} list of lists
	 * @returns {Array} flattened list
	 */
	function flattenDeep(list) {
		function flattenRecursive(result, x) {
			if (Array.isArray(x)) {
				result = concat(result, flattenDeep(x));
			} else {
				result.push(x);
			}

			return result;
		}

		return apReduce(list, flattenRecursive, []);
	}

	/**
	 * Map the supplied list elements using f, also flattening any
	 * returned lists into the result.
	 * @param {function} f mapping function
	 * @param {Array} list list to map
	 * @returns {Array} mapped list
	 */
	function flatMap(f, list) {
		return apReduce(list, function(result, x) {
			return concat(result, f(x));
		}, []);
	}

	/**
	 * Standard fold
	 * @param reducer {function} reducer function to apply to each item
	 * @param {*} initialValue initial value for fold
	 * @param list {Array} list of items
	 * @return {*} fold result
	 */
	function fold(reducer, initialValue, list) {
		return apReduce(list, reducer, initialValue);
	}

	/**
	 * Standard fold without an initial value
	 * @param reducer {function} reducer function to apply to each item
	 * @param list {Array} list of items
	 * @return {*} fold result
	 */
	function fold1(reducer, list) {
		return apReduce(list, reducer);
	}

	/**
	 * Standard fold from the right
	 * @param reducer {function} reducer function to apply to each item
	 * @param {*} initialValue initial value for foldr
	 * @param list {Array} list of items
	 * @return {*} fold result
	 */
	function foldr(reducer, initialValue, list) {
		return apReduceRight(list, reducer, initialValue);
	}

	/**
	 * Standard fold from the right without an initial value
	 * @param reducer {function} reducer function to apply to each item
	 * @param list {Array} list of items
	 * @return {*} fold result
	 */
	function foldr1(reducer, list) {
		return apReduceRight(list, reducer);
	}

	function unfold(unspool, donePredicate, seed) {
		var list, result;

		list = [];

		while(!donePredicate(seed)) {
			result = unspool(seed);

			list.push(result[0]);
			seed = result[1];
		}

		// TODO: Not clear if this is correct or not, need to figure it out!
		// list.push(seed);

		return list;
	}

	/**
	 * Returns the first element in the list
	 * @param  {Array} list
	 * @return {*} first element or undefined
	 */
	function head(list) {
		return list[0];
	}

	/**
	 * Returns a list of all elements except the first
	 * @param  {Array} list
	 * @return {Array} list of all items except the first, or empty list.
	 */
	function tail(list) {
		return apSlice(list, 1);
	}

	/**
	 * Returns a list of all elements except the last
	 * @param  {Array} list
	 * @return {Array} list of all items except the lsat, or empty list
	 */
	function initial(list) {
		return apSlice(list, 0, list.length - 1);
	}

	/**
	 * Returns the last element in the list
	 * @param  {Array} list
	 * @return {*} last element or undefined
	 */
	function last(list) {
		return list[list.length - 1];
	}

	/**
	 * Returns the first item in list for which predicate evaluates to true
	 * @param predicate {function} predicate to evaluate for each item
	 * @param list {Array} items to scan
	 * @return {*} first item for which predicate evaluated to true or
	 * undefined if none.
	 */
	function findFirst(predicate, list) {
		return list[indexOf(predicate, list)];
	}

	/**
	 * Returns the last item in list for which predicate evaluates to true
	 * @param predicate {function} predicate to evaluate for each item
	 * @param list {Array} items to scan
	 * @return {*} last item for which predicate evaluated to true or
	 * undefined if none.
	 */
	function findLast(predicate, list) {
		return list[lastIndexOf(predicate, list)];
	}

	/**
	 * Returns the index of the first item in list for which predicate
	 * evaluates to true.
	 * @param  {function} predicate predicate to evaluate for each item
	 * @param  {Array} list items to scan
	 * @return {number} index of first item for which predicate evaluates
	 *  to true, or -1 if none.
	 */
	function indexOf(predicate, list) {
		var index = -1;
		apSome(list, function(item, i) {
			if(predicate(item)) {
				index = i;
				return true;
			}

			return false;
		});

		return index;
	}

	/**
	 * Returns the index of the last item in list for which predicate
	 * evaluates to true.
	 * @param  {function} predicate predicate to evaluate for each item
	 * @param  {Array} list items to scan
	 * @return {number} index of last item for which predicate evaluates
	 *  to true, or -1 if none.
	 */
	function lastIndexOf(predicate, list) {
		var index = -1;

		try {
			apReduceRight(list, function(unused, item, i) {
				if(predicate(item)) {
					index = i;
					throw stopIteration;
				}
			}, void 0);
		} catch(e) {
			if(e !== stopIteration) {
				throw e;
			}
		}

		return index;
	}

});
}(typeof define === 'function' ? define : function(factory) { module.exports = factory(require); }));

