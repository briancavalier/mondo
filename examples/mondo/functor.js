var mondo = require('../../mondo');
var when = require('when');

function f(x) {
	return x+1;
}

console.log(f(2));

[2].map(f).map(console.log);

function map(f, x) {
	return x.map(f);
}

function Maybe(x) {
	this.value = x;
}

Maybe.prototype = {
	map: function(f) {
		return new Maybe(this.value === undefined ? this.value : f(this.value));
	},
	ap: function(functor) {
		return this.value === undefined ? new Maybe() : new Maybe(mondo.map(this.value, functor));
	},
	flatMap: function(f) {
		return this.value === undefined ? new Maybe() : f(this.value);
	}
};

var m1 = new Maybe();
var m2 = new Maybe(2);

m1.map(console.log);
m2.map(console.log);
console.log(map(f, m1));
console.log(map(f, m2));

[2].map(f).map(f).map(f).map(console.log);
m1.map(f).map(f).map(f).map(console.log);
m2.map(f).map(function(x) {}).map(f).map(console.log);

var promiseFor2 = when.promise(function(r) {
	setTimeout(r.bind(null, 2), 1000);
})

promiseFor2.map = promiseFor2.then;

promiseFor2.then(console.log);
promiseFor2.map(console.log);
map(console.log, promiseFor2);
