var mondo = require('../../mondo');
var fn = require('../../lib/fn');
var Maybe = require('../../monad/Maybe');
var when = require('when');

function addOne(x) {
	return x+1;
}

function log(x) {
	console.log(x);
	return x;
}

console.log(addOne(2));

[2].map(addOne).map(console.log);

function map(f, x) {
	return x.map(f);
}

var m1 = new Maybe();
var m2 = new Maybe(2);
var m3 = new Maybe(addOne);

console.log(m3.apply(m1));
console.log(m3.apply(m2));

m1.map(console.log);
m2.map(console.log);
console.log(map(addOne, m1));
console.log(map(addOne, m2));

[2].map(addOne).map(addOne).map(addOne).map(console.log);
m1.map(addOne).map(addOne).map(addOne).map(console.log);
m2.map(addOne).map(function(x) {}).map(addOne).map(console.log);

var promiseFor2 = when.promise(function(r) {
	setTimeout(r.bind(null, 2), 1000);
})

promiseFor2.map = promiseFor2.then;

promiseFor2.then(console.log);
promiseFor2.map(console.log);
map(console.log, promiseFor2);

