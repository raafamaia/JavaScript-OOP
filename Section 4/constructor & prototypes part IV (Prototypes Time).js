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






