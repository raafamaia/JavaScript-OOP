/*
So... can I use the defineProperty() in the constructor? Yes Sir.
Getters and Setters time!
*/

function Person(name){
	Object.defineProperty(this, "name", {
		get: function(){
			console.log("Reading name...");
			return name;
		},

		set: function(varName){
			console.log("Setting name... Done!")
			name = varName;
		},
		enumerable: true,
		configurable: true
	})

	this.sayName = function(){
		console.log(this.name);
	}
}

var person1 = new Person("Bob");
person1.sayName();


/*
Now, the other way, that I found damn pretty, but without the
flexibility of defining enumerable and shit...

In fact, I don't know if it's possible to use it... I don't know
Gonna try:
*/

// function Person(name){
// 	_name: name,
// 	get name(){
// 		console.log("Reading name...");
// 		return this._name;
// 	},

// 	set name(value){
// 		console.log("Setting name to &s", value);
// 		this._name = value;
// 	}
// };

// var person1 = new Person("Dollar");

/*
Nope, not possible, now I get the differences between data
and accessors... I guess...

In the right example, name is a accessor property that uses the name
parameter to store the actual name.

DONT FORGET THE FUCKIN "NEW", JEEZ

Note: An error occurs if you call the Person constructor in strict mode without
using new.

See? Constructors  dude <3
They allow you to configure object instances with the same properties, but
constructors alone don't eliminate code redundancy.
In the example code thus far, each instance has had its own sayName() method
even though sayName() doen't change. That means if you have 100 instances of an
object, then there are 100 copies of a function that do the exact same thing,
just with different data.
it would be much more efficient if all of the instances shared one method, and
then that method could use this.name to retrieve appropriate data. SOOOOO...

PROTOTYPES!
*/










