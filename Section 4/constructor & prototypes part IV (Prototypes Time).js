/*
USING PROTOTYPES WITH CONSTRUCTORS

The shared nature of prototypes makes them ideal for defining methods once for
all objects of a given type. Because methods tend to do the same thing for all instances,
there's no reason each instance needs its own set of methods.
It's much more efficient to put the methods on the prototype and then use "this"
to access the current instance.
For example, the Person constructor 2.0:
*/

function Person(name){
	this.name = name;
}

Person.prototype.sayName = function(){
	console.log(this.name);
};

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

console.log(person1.name); // -> Nicholas
console.log(person2.name); // -> Greg

person1.sayName(); // -> Nicholas
person2.sayName(); // -> Greg

/*
Now, the sayName() is defined on the prototype, so, instead of each object carry
your own sayName() method, all the objects points to the same method, on the
prototype.

You can also define data properties on the prototype, but be careful when using reference
values.
Because these values are shared across the instances, you might not expect one instance
to be able to change values that another instance will access.
*/

function Person(name){
	this.name = name;
}

Person.prototype.sayName = function(){
	console.log(this.name);
};

Person.prototype.favorites = [];

var person1 = new Person("Bob");
var person2 = new Person("Greg");

person1.favorites.push("pizza");
person2.favorites.push("quinoa");

console.log(person1.favorites); // -> [ 'pizza', 'quinoa' ]
console.log(person2.favorites); // -> [ 'pizza', 'quinoa' ]

/*
In this example, the favorites property is definedon the prototype, which means
that all objects.favorites points to the same array.
This may not be the behavior that you want...

Even though you can add properties to the prototype one by one, many developers
use a more succenct pattern that involver replacing the prototype with an object
literal:
*/

function Person(name){
	this.name = name;
}

Person.prototype = {
	sayName: function(){
		console.log(this.name);
	},

	toString: function(){
		return "[Person " + this.name + "]";
	}
};

/*
Damn, so sexy...
BUT, there's one side effect to be aware of:
*/

var person1 = new Person("Nicholas");

console.log(person1 instanceof Person); // -> true
console.log(person1.constructor === Person); // -> false
console.log(person1.constructor === Object); // -> true

/*
Some crazy shit happened here
Using the object literal notation to overwrite the prototype changed the constructor
property so that it now points to Object instead of Person.
This happened ~take a breath~ cuz the constructor property exists on the prototype,
not on the object instance. When a function is created, its prototype property
is created with a constructor equal to the function.
This pattern completely overwrites the prototype object, which means that constructor
will come from the newly created (generic) object that was assigned to Person.prototype.
Ok, I get it.
To avoid this, restore the constructor property to a proper value when overwriting
the prototype:
*/

function Person(name){
	this.name = name;
}

Person.prototype = {
	// HERE
	constructor: Person,

	sayName: function(){
		console.log(this.name);
	},

	toString: function(){
		return "[Person " + this.name + "]";
	}
};

var person1 = new Person("Nicholas");

console.log(person1 instanceof Person); // -> true
console.log(person1.constructor === Person); // -> true
console.log(person1.constructor === Object); // -> false

/*
Not the sexiest shit, but... ok enough
Make sure to assign the constructor property in the first property, or you'll
forget it (trust me)

Perhaps, the most interesting aspect of the relationships among constructors
prototypes, and instances is that there is no direct link between the instance
and the constructor. There is, however, a direct link beween the instance and
the prototype, and between the prototype and the constructor...

This mean that any disruptionn between the instance and the prototype will also
create a disruption between the instance and the constructor.
*/

/*
Changing prototypes, rá

Because prototype is shared among all the instances of a particular reference,
you can augment all of those objects together at any time by manipulating the
prototype.
Remember, the [[Prototype]] property just contains a pointer to the prototype,
and any changed to the prototype are immediately available on any instance
referencing it. That means you can literally add new members to a prototype at
any poitn and have those changes reflected on existing instances
*/

function Person(name){
	this.name = name;
}

Person.prototype = {
	constructor: Person,

	sayName: function(){
		console.log(this.name);
	},

	toString: function(){
		return "[ Person " + this.name + " ]";
	}
};

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

console.log("sayHi" in person1); // -> false
console.log("sayHi" in person2); // -> false

//add a new method
Person.prototype.sayHi = function(){
	console.log("Hi");
}

console.log("sayHi" in person1); // -> true
console.log("sayHi" in person2); // -> true

person1.sayHi();
person2.sayHi();

/*
In this case, at first Person had only two methods, then I create a third
method, sayHi(), adding it to the prototype. After this, all instances of
Person had the sayHi() method.

The ability to modify the prototype at any time has some interesting repercussions
for sealed and frozen objects. When you use Object.seal() or Object.freeze() on an
object, you are acting solely on the object instance and the own properties.
You can't add new own properties or change existing own properties on frozen objects
but you can still add it to the prototype and continue extending those objects.
*/

var person1 = new Person("Greg");
var person2 = new Person("Nicholas");

Object.freeze(person1);

Person.prototype.sayHey = function(){
	console.log("Hey");
};

person1.sayHey(); // -> Hey

/*
Dope shit

BUT

Note: In practice, you probably won't use prototypes this way very often when
developing in JavaScript. However, it's important to understand the relationships
that exist between objects and their prototype, and strange shit like this help
to illuminate the concepts.
*/

/*
Build-in Object Prototypes

At this point, you might wonder if prototypes also allow you to modify the
build-in objects that come standard in the JavaScript engine. (I didn't wonder)
The answer is yes. All build in objects have constructors, and therefore, they have
prototypes that you can change.
For instance, adding a new method for use on all arrays is as simple as modifying
Array.prototype.
*/

Array.prototype.sum = function(){
	return this.reduce(function(previous, current){
		return previous + current;
	});
};

var numbers = [1, 2, 3, 4, 5, 6, 7];
var res = numbers.sum();

console.log(res); // -> 28

var letters = ['a', 'b', 'c'];
var res = letters.sum();

console.log(res); // -> abc

/*
See? We create a sum() method to all arrays, sheeeet
And did you notice? the "this" points to an array, so you can use arrays methods
like reduce.

You may recall that strings, numbers and Booleans all have build-in primitive
wrapper types that are used to access primitive values as if they were objects...
You can modify the primitive wrapper type prototype as in the following, you can
actually add more functionality to those primitive values:
*/

String.prototype.capitalize = function(){
	return this.charAt(0).toUpperCase() + this.substring(1);
};

var message = "hello";
console.log(message.capitalize()); // -> Hello

/*
This code creates a new method called capitaliza() for strings. The String type
is the primitive wrapper for string, and modifying its prototype means  that all
string automatically get those changes.

Note:
Pretty fuckin fun modify build-in objects, but nigga, this is kinda dangerous, don't
do it. The build-in objects are supposed to behave in a certain way, we developers
expect that, if we start to modifying those bitchies, it will be all chaos.
*/




