console.log("\n---------------------- Object Patterns ---------------------\n");

/*
Ok, so we learn tons of shits, now lets see how to use it all

JavaScript has many patterns for creating objects, and there's usually more than
one way to accomplish the same thing. You can define your own custom types or
your own generic objects whenever you want.
You can use inheritance to share behavior between objects, or you can employ other
techniques, such as mixins. You can also take advantage of advanced JavaScript
featuresto prevent an object's structure from being modified. The patterns
discussed in this chapter give you powerfull way of managing and creating
objects, all based on your use cases.
*/

console.log("\t• Private and Privileged Members\n");

/*
All object properties in JavaScript are public, and there's no explicit way
to indicate that a property shouldn't be accessed from outside a particular
object. At some point, however, you might not want data to be public.
For example, when an object uses a value to determine some sort of state,
modifying that data without the object's knowledge throew the state management
process into chaos. One way to avoid this is by using naming conventions. For
example, it's quite common to prefix properties with an underscore (such as
this._name) when they ar not intended to be public. However, there ate way of
hiding data that don't rely on convention and therefore more "bulletproof" in
preventing the modification of private information.
*/

console.log("\t\t- The Module Pattern\n");

/*
The module pattern is an object-creation pattern design to create singleton
objects with private data. The basic approach is to use an immediately invoked
fuction expression (IIFE) that returns an object. An IIFE is a function
expression that is defined and then called immediately to produce a result.
That function expression can contain any number of local variables that aren't
accessible from outside that function. Because the returned object is defined
within that function, the object's methods have access to the data (All objects
defined whithin the IIFE have access to the same local variables.) Methods that
access private data in this way are called privileged methods. Here's
the basic format for the module pattern:
*/

var yourObject = (function(){
	//private data variables

	return {
		//public methods and properties
	};
}());

/*
In this pattern, an anonymous functions is created and executed immediately.
(Note the extra parentheses at the end of the function. You can execute
anonymous functtions immediately using this syntax.) That means the function
exists for just a moment, is executed, and then is destroyed.
IIFE are a very popular pattern in JavaScript, partially for their use in module
pattern.

The module pattern allows you to use tegular variables as de facto object
properties that aren't exposed publicly. You accomplish this by creating
closure functions as objects methods. CLosures are simply functions that access
data outside their own scope. For example, whenever you access a global object
in a function, such as window in a web browser, that function is accessing a
variable outside its own scope. The fifference with the module function is that
the variables are declared within the IIFE, and a function that is also declared
inside the IIFE accesses those variables.
Take a look:
*/
var person = (function(){
	var age = 25;
	var name = "Nicholas";

	return {
		getAge: function(){
			return age;
		},

		growOlder: function(){
			age++;
		},

		getName: function(){
			return name;
		},

		setName: function(n){
			name = n;
		}
	};
}());

console.log(person.getName()); // -> Nicholas
console.log(person.getAge()); // -> 25

person.age = 100;
person.name = "Another Name";

console.log(person.getName()); // -> Nicholas
console.log(person.getAge()); // -> 25

person.growOlder();
console.log(person.getAge()); // -> 26

person.setName("Another Name");
console.log(person.getName()); // -> Another Name

/*
This code creates the person object using the module pattern. The ahe variable
acts like a private property for the object. It can't be accessed directly from
outside the object, but it can be used by the object methods.
There are two privileged methods on the object: getAge(), which reads the value
of the age variable, and growOlder(), which increments age.
Both os these methods can access the variable age directly because it is defined
in the outer function in which they are defined.

There is a variation of the module pattern called the "revealing module pattern",
which arranges all variables and methods at the top of the IIFE and simply assigns
them to the returned object. You can write the previous example using the revealing
pattern as follows:
*/

var person = (function(){
	var age = 25;
	var name = "Nicholas";

	function getAge(){
		return age;
	}

	function growOlder(){
		age++;
	}

	function getName(){
		return name;
	}

	function setName(n){
		name = n;
	}

	return {
		getAge: getAge,
		growOlder: growOlder,
		getName: getName,
		setName: setName
	};
}());

console.log(person.getName()); // -> Nicholas
console.log(person.getAge()); // -> 25

person.age = 100;
person.name = "Another Name";

console.log(person.getName()); // -> Nicholas
console.log(person.getAge()); // -> 25

person.growOlder();
console.log(person.getAge()); // -> 26

person.setName("Another Name");
console.log(person.getName()); // -> Another Name

/*
In the revealing module pattern, age, getAge(), and growOlder() are all defined
as local to the IIFE. The getAge() and growOlder() functions are then assigned
to the returned object, effectively "revealing" them outside the IIFE. This code
is essentially the same as the earlier example using the traditional module
pattern; however, some prefer this pattern because it keeps all variable and
function declarations together.
*/

console.log("\n\t\t- Private Members for Constructors\n");

/*
The module pattern is great for defining individual objects that have private
properties, but what about custom types that also require their own private
properties? You can use a par=ttern that's similar to the module pattern
inside the constructor to create instance-specific private data.
*/

function Person(name){
	// define a variable only accessible inside of the Person constructor
	var age = 25;

	this.name = name;

	this.getAge = function(){
		return age;
	};

	this.growOlder = function(){
		age++;
	};
}

var person = new Person("Nicholas");

console.log(person.name); // -> Nicholas
console.log(person.getAge()) // -> 25

person.age = 100;
console.log(person.getAge()) // -> 25

person.growOlder();
console.log(person.getAge()) // -> 26

/*
In this code, the Person constructor has a local variable, age. That variable
is used as part of the getAge() and growOlder() methods. When you create an instance
of Person, that instance receives its own age variable, getAge() method, and
growOlder() method. In many ways, this is similar to the module pattern, where
the constructor creates a local scope and returns the this object.
As discussed in Chapter 4, placing methods on an object instance is less efficient
than doing so on the prototype, but this is the only approach possible when you
want private, instance-specific data.
If you want private data to be shared across all instance (as if it were on the
prototype), you can use a hybrid approach that looks like the module pattern
but uses a constructor:
*/

var Person = (function(){
	// everyone shares the same age
	var age = 25;

	function InnerPerson(name){
		this.name = name;
	}

	InnerPerson.prototype.getAge = function(){
		return age;
	};

	InnerPerson.prototype.growOlder = function(){
		age++;
	};

	return InnerPerson;
}());

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

console.log(person1.name); // -> Nicholas
console.log(person1.getAge()); // -> 25

console.log(person2.name) // -> Greg
console.log(person2.getAge()); // -> 25

person1.growOlder();
console.log(person1.getAge()); // -> 26
console.log(person2.getAge()); // -> 26


/*
In this code, the InnerPerson constructor is defined inside an IIFE.
The variable age is defined outside the constructor but is used for two prorotype
methods. The InnerPerson constructor is then returned and becomes the Person
constructor in the global scope. All instances of Person end up sharing the age
variable, so changing the value with one instance automatically affects the
other instance.
*/