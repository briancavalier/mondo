// Fun with functors and applicatives that are just functions
var fn = require('../../lib/fn');

function addOne(x) {
	return x+1;
}
function log(x) {
	console.log(x);
	return x;
}

function constant(x) {
	return function() {
		return x;
	};
}

var functor = fn.curry(function(x, f) {
	return functor(f(x));
});

var f1 = functor(1);
var f2 = f1(addOne);
var f3 = f2(addOne);
f3(log);

var listFunctor = fn.curry(function(list, f) {
	return listFunctor(list.map(f));
});

f1 = listFunctor([1,2,3]);
f2 = f1(addOne);
f3 = f2(addOne);
f3(log);

var apply = fn.curry(function(f, functor) {
	return functor(f);
});

var a1 = apply(addOne);
var a2 = a1(listFunctor([1,2,3]));
a2(log);

// Hmmm, this is not right.  The inner and outer
// "loops" are inverted.  The list.map should be on
// the outside, but it's not clear how to make that
// work correctly, since this function must return
// at least a functor, and not an array.
var listApply = fn.curry(function(list, functor) {
	return functor(function(x) {
		return list.map(function(f) {
			return f(x);
		});
	});
});

a1 = listApply([addOne, addOne]);
a2 = a1(listFunctor([1,2,3]));
a2(log);
