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

	var curry, fold, undef;

	curry = require('./lib/fn').curry;
	fold = require('./lib/list').fold;

	state.of = State.of = of;
	state.get = get;
	state.put = put;
	state.modify = modify;
	state.gets = gets;
	state.sequence = sequence;
	state.run = curry(runState);
	state.eval = curry(evalState);
	state.exec = curry(execState);

	function State(stateTransform) {
		this.runState = stateTransform;
	}

	State.prototype = {
		constructor: State,

		map: function(f) {
			var runState = this.runState;
			return new State(function(state) {
				var result = runState(state);
				return [f(result[0]), result[1]];
			});
		},

		join: function() {
			var runState = this.runState;
			return new State(function(state) {
				var result, joined;

				result = runState(state);
				joined = result[0].runState(result[1]);

				return joined;
			});
		},

		chain: function(f) {
			return this.map(f).join();
		}
	};

	return state;

	function state(runState) {
		return new State(runState);
	}

	function of(v) {
		return new State(function(state) {
			return [v, state];
		});
	}

	function get() {
		return new State(function(state) {
			return [state, state];
		});
	}

	function put(newState) {
		return new State(function() {
			return [undef, newState];
		});
	}

	function modify(f) {
		return get().chain(function(state) {
			var newState = f(state);
			return put(newState);
		});
	}

	function gets(f) {
		return get().chain(function(state) {
			var valFromState = f(state);
			return of(valFromState);
		});
	}

	function sequence() {
		return fold(function(s, next) {
			return s.chain(function() {
				return next;
			});
		}, arguments);
	}

	function runState(m, state) {
		return m.runState(state);
	}

	function evalState(m, state) {
		return m.runState(state)[0];
	}

	function execState(m, state) {
		return m.runState(state)[1];
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
