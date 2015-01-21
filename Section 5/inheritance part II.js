console.log('\n------------------- Object Inheritance -------------------\n');

/*
The simplest type of inheritance is between objects. All you have to do is
specify what object should be the new object`s [[prototype]]. Object literals
have Object.prototype set as their [[Prototype]] implicitly, but you can also
explicitly specify [[Prototype]] with the Object.create() method.

The Object.create() method accepts two arguments. The first arguments is the object
use for [[Prototype]] in the new object. The optional second argument is an object
of property descriptors in the same format used by Object.defineProperties
Consider this:
*/

var book = {
	title = "The principles of Object-Oriented JavaScript"
};

//is the same as

var book = object.create(Object.prototype, {
	title: {
		configurable: true,
		enumerable: true,
		value: "The Principles of Object-Oriented JavaScript",
		writable: true
	}
});

/*
The two declarations in this code are effectively the same. The forst
declaration uses an object literal to define an object with a single property
called title
*/