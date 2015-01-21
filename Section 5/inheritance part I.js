console.log("----------------------- INHERITANCE -----------------------");

/*
The best part dude, Inheritance, a beautiful concept.
In traditional object-oriented languages, classes inherit properties from other
classes.
In JS, however, inheritance can occur between objects with no classlike structure
defining the relationship. The mechanism for this inheritance is one with which
you are already familiar: prototypes.

YEAH, LEZ GO TO PTOTOTYPE CHAINING AND OBJECT.PROTOTYPE

In Javascript, there's an approach for inheritance called prototype chaining or
prototypal inheritance.
As we learned, prototype properties are automatically available on objects instances,
which is a form of inheritance. The object instances inherit properties from the
prototype. Because the prorotype is also an object, it has its own prototype and
inherits properties from that. This is the prototype chain:
An object inherits from its prototype, while that prototype in turn inherits from
its prototype, and so on.

All objects, including those you define yourself, automatically inherit from Object
unless you specify otherwise (Later on).
More specifically, all objects inherit form Object.prototype. Any object defined
via an object literal has its [[Prototype]] set to Object.prototype, meaning that
it inherits properties from Object.prototype, just like book in this example:
*/

var book = {
	title: "The Principles of Object-Oriented JavaScript"
};

var prototype = Object.getPrototypeOf(book);

console.log(prototype === Object.prototype); // -> true

/*
With the example we could see that the object book has the same prototype as
object. No additional code was necessary to make this happen, as this is the
default behavior when new objects are created. This relationship means that
book automatically receives methods from Object.prototype
*/

/*
Methods Inherited from Object.prototype

So, what comes with Object.prototype?

hasOwnProperty() Determines whether an own property with the given name exists

propertyIsEnumerable() Determines whether an own property is enumerable

isPrototypeOf() Determines whether the object is the prototype of another

valueOf() Returns the value representation of the object

toString() Returns a string representation of the object

These five guys appear on all objects through inheritance.
The last two are important when you need to make objects work consistently in
JavaScript, and sometimes you might want to define them yourself.
*/

console.log("\n\t• valueOf():\n");

/*
The valueOf() method gets called whenever an operator is used on an object.
By default, valueof() simply returns the object instance.
The primitive wrapper typer override valueOf() so that it returns a string for
String, a boolean for Boolean, and a number for Number. Likewise, the Date object's
valueOf() method returns the epoch time in milliseconds (just as Date.prototype.getTime() does).
This is what allows you to write code that compares dates such as:
*/

var now = new Date();
var earlier = new Date(2010, 1, 1);

console.log(now > earlier); // -> true

/*
In this example, now is a Date representing the current time, and earlier
is a fixed date in the past.
You can even subtract one date from another and get the difference in epoch
time because of valueOf()
*/

console.log(earlier - now); // -156790614675
var d = new Date(0);
d.setUTCSeconds(now - earlier);
console.log(d); // -> Wed Jul 02 6938 07:39:24 GMT-0300 (BRT) I don't know, just messing around

/*
You can always define your own valueOf() method if your objects are intended to be
used with operators. If you define a valueOf() method, keep in mind that you're
not changing how the operator works, only what value is used with the operato's
default behavior.
*/

console.log("\n\t• toString()\n");

/*
The toString() method is called as a fallback whenever valueOf() return a
reference value instead of a primitive value.
It is also implocitly calle don primitive values whenever JavaScript is expecting
a string.
For example, when a string is used as one operand for the plus operator, the
other operand is automatically converted to a string. If the other operand is
a primitive value, it is converted into a string representation (true -> "true"),
but if it's a reference value, then valueOf() is called.
If valueOf() return a reference value, toString() is called and returned value is used.
Like:
*/
var book = {
	title: "The Principles of Object-Oriented JavaScript"
};

var message = "Book = " + book;
console.log(message); // -> Book = [object Object]

/*
Since book is an object, its toString() method is called. That method is inherited
from Object.prototype and return the default value of "[object Object]" in most
JavaScript engines.
If you're happy with this lame value, go on my nigga... BUT, I'm not.
Let's define our own toString to book.
*/

var book = {
	title: "The Principles of Object-Oriented Javascript",
	toString: function(){
		return "[Book " + this.title + "]";
	}
};

var message = "Book = " + book;

console.log(message) // -> Book = [Book The Principles of Object-Oriented Javascript]

/*
Much better.
But you usually don't need to worry about making your own toString(), but it's cool
to know that YOU CAN.
*/

console.log("\n\t• Modifying Object.prototype\n");

/*
All objects inherit from Object.prototype by default, so changes to Object.prototype
affect all object. That`s a very dangerous situation. I already told you nigga
Take a look at this fucked up shit:
*/

Object.prototype.add = function(value){
	return this + value;
};

var book = {
	title: "The Principles of Object-Oriented JavaScript"
};

//in a web browser
//You can't compile this shit here, I`m gonna leave this commented
//console.log(document.add(true));// -> "[object HTMLDocument]true"
//console.log(window.add(5)); // -> "[object Window]true"
/*
Adding  Object.prototype.add() causes all objects to have an add() method,
whether or not this makes fucking sense.

Another aspect of this problem involver adding enumarable properties to
Object.prototype. In the previous example, Object.prototype.add() is an enumerable
property, which means it will show up when you use a for-in loop, such as:
*/

var empty = {};

for(var property in empty){
	console.log(property); // -> add
}

/*
Here, an empty object will still output "add" as a property because it exists on
the rpototype and is enumerable. Given how often the for-in construct is used
in JavaScript, moidfying Object.prototype with enumerable properties has the
potential to affect a lot of code.
For this reason, Douglas Crockford recommends using hasOwnProperty() in for-in
loops all the time, like:
*/

var empty = {};

for(var property in empty){
	if(empty.hasOwnProperty(property)){
		console.log(property); // Nothing.
	}
}

/*
While this approach is effective against possible unwanted prototype properties,
it also limits the use of for-in to only own properties, which may or may not
be what you want. Your best bet for the most flexibility is to not modiify
Object.prototype, never.
*/


