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

	var formBase, curry;

	formBase = require('./base');
	curry = require('../lib/fn').curry;

	return curry(updateForm);

	function updateForm(values, form) {
		formBase.setValues(form, values);
		return values;
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
