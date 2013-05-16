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
		id: id,
		qs: curry(qs),
		qsa: curry(qsa),
		append: curry(append),
		remove: curry(remove)//,
//		insert: curry(insert)
	};

	function qs(selector, root) {
		return root.querySelector(selector);
	}

	function qsa(selector, root) {
		return root.querySelectorAll(selector);
	}

	function id(htmlId) {
		return document.getElementById(htmlId);
	}

	function append(parent, node) {
		parent.appendChild(node);
		return node;
	}

	function remove(node) {
		if(node.parentNode) {
			node.parentNode.removeChild(node);
		}

		return node;

		// TODO: Should it conditionally remove?
//		if(parent && parent === node.parentNode) {
//			node.parentNode.removeChild(node);
//		}
//
//		return [node, parent];
	}

	function insertBefore(refNode, node) {
		var parent = refNode.parentNode;
		if(parent) {
			parent.insertBefore(refNode, node);
		}

		return node;
	}

	function insertAfter(refNode, node) {
		var parent = refNode.parent;
		if(parent) {
			if(refNode === parent.lastChild) {
				parent.appendChild(node);
			} else {
				parent.insertBefore(refNode.nextSibling, node);
			}
		}

		return node;
	}

	function replace(refNode, node) {
		insertBefore(refNode, node);
		remove(refNode);
	}

	function setAttribute(name, value, node) {
		node.setAttribute(name, value);
		return node;
	}

	function getAttribute(name, node) {
		return node.getAttribute(name);
	}
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
