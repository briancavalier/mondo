var mondo = require('../../mondo');
var state = require('../../monad/state');
var r;
var applicative = [
	function(x) {
		return x + 1;
	},
	function(x) {
		return x + 2;
	}];

r = mondo.apply([1,2,3], applicative);

console.log(r);

r = mondo.apply(state.get(), applicative);
console.log(mondo.apply(1, r.map(function(s) { return state.run(s); })));