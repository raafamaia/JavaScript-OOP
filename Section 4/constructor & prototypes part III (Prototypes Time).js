console.log("------------------------ PROTOTYPES ------------------------");

/*
You can think of a prototype as a recipe for an object. Almost
every function (with the exception of some built-in functions) has a
prototype property that is used during the creation of new instances.
That prototype is shared among all of the object instances, and those
istances can access properties of the prototype.
For example, the hasOwnProperty() method is defined on the generic Object
prototype, but it can be accessed from any object as if it were an own property,
lemme show:
*/

var book = {
	title: "The Principle of Object-Oriented JavaScript"
};

console.log("title" in book); // ->  true
console.log(book.hasOwnProperty("title")); // -> true
console.log("hasOwnProperty" in book); // -> true
console.log(book.hasOwnProperty("hasOwnProperty")); // -> false
console.log(Object.prototype.hasOwnProperty("hasOwnProperty")); // -> true

/*
See? Even though there is no definition for hasOwnProperty() on book,
that method can still be accessed as book.hasOwnProperty() cuz the definition
does exist on Object.prototype. Remember that the in operator return true for
both prototype properties and own properties.
*/

/*
So.. how can you determine whether a property is on the prototype?
Making a function to do that, lez go bitchies
*/

function hasPrototypeProperty(object, name){
	return name in object && !object.hasOwnProperty(name);
}

/* If the property is in an object but hasOwnProperty() returns false, then
the property is on the prototype.*/

console.log(hasPrototypeProperty(book, "title"));
console.log(hasPrototypeProperty(book, "hasOwnProperty"));

/*
The [[Prototype]] Property

An instance keeps track of its prototype through an internal property
called [[Prototype]]. This property is a pointer back to the prototype
object that the instance is using. When you create a new object using "new",
the constructor's prototype property is assigned to the [[Prototype]] property
of that new object

I can't paste the image, but you know what I'm talking about, it's a pointer,
you know this stuff, just to be sure:

person1.prototype -> Person.prototype
person2.prototype -> Person.prototype

Yeah, I can't do better than this...
You can read the value of the [[Prototype]] property by using the
Object.getPrototypeOf() method on an object.
*/

var object = {};
var prototype = Object.getPrototypeOf(object);

console.log(prototype === Object.prototype); // -> true

/*
Note:

Some JavaScript engines also support a property called __proto__ on all objects.
This property allows you to both read from and write to the [[Prototype]] property.
Firefox, Safari, Chrome, and Node.js all support this property, and __proto__ is
on the path for standardization in ECMAScript 6.
*/

/*
There's a method called isPrototypeOf(), you can test to see if one object is a
prototype for another.
*/

var object = {};
console.log(Object.prototype.isPrototypeOf(object)); // -> true

/*
See? Our object is just a generic object, its prototype should be Object.prototype,
meaning isPrototypeOf() should return true.

This is how the JS engine works, first looks for an own property with the name.
If the engige finds a correctly named own property, it returns that value.
If no own property with that name exists on the target object, it goes search the
property in the [[Prototype]] object. If it find nothing, undefined is returned.
Considerer this:
*/

//Creating an object without any own properties
var object = {};

console.log(object.toString()); // -> [object Object]

object.toString = function(){
	return "[object Custom]";
}

console.log(object.toString()); // -> [object Custom]

delete object.toString;

console.log(object.toString()); // -> [object Object]

//no effect - delete only works on own properties

delete object.toString;
console.log(object.toString()); // -> [object Object]

/*
I'm pretty sure that you follow this example, I'm kinda lazy today...

Lets move foward...













