var mondo = require('../../mondo');
var fn = require('../../lib/fn');
var state = require('../../monad/state');
var Maybe = require('../../monad/Maybe');
var r;
var applicative = [
	function(x) {
		return x + 1;
	},
	function(x) {
		return x + 2;
	}];

r = mondo.apply(applicative, [1,2,3]);

console.log(r);

r = mondo.apply(applicative, state.get());
console.log(mondo.apply(r.map(function(s) { return state.run(s); }), 1));

var m1 = new Maybe(3);
var m2 = new Maybe(6);

m1.map(console.log);
m1.chain(function(x) { return; }).map(console.log);
m1.chain(function(x) { return Maybe.nothing; }).map(console.log);
m1.chain(function(x) { return m2; }).map(console.log);
