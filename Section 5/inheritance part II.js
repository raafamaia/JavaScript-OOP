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
	title: "The principles of Object-Oriented JavaScript"
};

//is the same as

var book = Object.create(Object.prototype, {
	title: {
		configurable: true,
		enumerable: true,
		value: "The Principles of Object-Oriented JavaScript",
		writable: true
	}
});

/*
The two declarations in this code are effectively the same. The first
declaration uses an object literal to define an object with a single property
called title. That object automatically inherits from Object.prototype, and the
property is set to be configurable, enumerable, and writable bu default.
In the second declaration takes the same steps but does so explicitly using
Object.create(). The resulting book object from each declaration behaves exact
the same way. Buy you'll probably never write code that inherits from Object.prototype
directly, because you get that by default.
Inheriting from other objects is much more interesting:
*/

var person1 = {
	name : "Nicholas",
	sayName: function(){
		console.log(this.name);
	}
};

var person2 = Object.create(person1, {
	name: {
		configurable: true,
		enumerable: true,
		value: "Greg",
		writable: true
	}
});

person1.sayName() // -> Nicholas
person2.sayName() // -> Greg

console.log(person1.hasOwnProperty("sayName")) // -> true
console.log(person1.isPrototypeOf(person2)) // -> true
console.log(person2.hasOwnProperty("sayName")) // -> false

/*
I think you got the prototype chain
When a property is accessed on an object, tha JS engine goes through a search
proccess, first look for an own property, if it's not found, it goes to the [[Prototype]]
and continues the search there, andd it goes on and on.
Usually this search end in Object.prototype, whose [[Prototype]] is set to null.
You can also create objects with a null [[Prototype]] via Object.create()
*/

var nakedObject = Object.create(null);

console.log("toString" in nakedObject); // -> false
console.log("valueOf" in nakedObject); // -> false

/*
See, an object with no prototype chain
In effect, this object is a completely blank slate with no predefined properties,
which makes it perfect for creating a lookup hash without potential naming collisions
with inherited property names.
But you pretty much can't do shit with this object, if you try to use an operaror
in it, you'll just get an error like"Cannot convert object to primitive value", still
good to know.
*/








