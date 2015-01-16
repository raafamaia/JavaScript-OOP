//'use strict';

/* Hey, section 3 starts here

Even  though there are a number of built-in reference types in JavaScript, you
want to create your own objects, right? As you do, keep in mind that objects in
JavaScript are dynamic, shit can change at any point during code execution...

Yep, JavaScript objects have no such restrictions like class-based languages
that you have a class definition.
*/

console.log("\n----------------------- DEFINING PROPERTIES -----------------------\n");

//Just creating some objects, using the Object constructor and using the literal form

//Literal Form
var person1 = {
	name : "Nicholas"
};

//Calling the Object constructor
var person2 = new Object();

//And now I can mess with the properties, add, update and shit
person2.name = "Nicholas";


person1.age = 20;
person2.age = 30;

person1.name = "Manfred";
person2.name = "Alfred";

console.log(person1);
console.log(person2);

/*
Objects that we create are always wide open for modification, unless we specify
otherwise

Now some behind the scenes shit:

When a property is first added to an object, JavaScript uses an internal method
called [[Put]] on the object. The [[Put]] method creats a spot in the object to
store the property. Just like adding a key to a hash table, with the key name and
a value.
The result of calling [[Put]] is the creation of an "own property" on the object.
An "own property" simply indicates that the specific instance of the object owns
that property

---- ONW PROPERTIES ARE DISTINCT FROM PROTOTYPE PROPERTIES -----
				(not sure what this means, but keep it in mind)

When a new value is assigned to an existing property, a separate operation called
[[Set]] takes place. This operation replaces the current value of the property
with the new one.
*/

console.log("\n----------------------- DETECTING PROPERTIES -----------------------\n");

/* 
Properties come and go, sometimes it's necessary to check whether a property even
exists in the object.
*/

//This is how noobs detect whether a property exists:

if (person1.age){
	/*yeah, the person1 has the property age, we can do our shit,
	no problem */
	person1.age = 0;
}

console.log(person1);

/*
Hey, fuck you man, it worked fine, why this is the noob way?
Calm your tits down little boy, I'm gonna tell ya!

The problem with this pattern is how JavaScript's type coercion affects
the outcome. The if confition evaluates to true if the value is truthy
(an object, a nonempty string, a nonzero number, or true) and evaluates to false
if the value is falsy (null, undefined, 0, false, NaN, or an empty string).

Got it? Because an object property can contain one of these falsy values this 
shit could go wrong.

If you're kinda slow, lemme show you:
*/

if(person1.age){
	console.log("Hey, it still works, dumbass");
}else{
	console.log("Nope! Something went wrong this time");
}

/*
See? The first time, Manfred's age was 20, but I changed to 0 inside the
if statement, but I didn't remove the property or some shit, I just changed,
it still exists.
*/

/* Now lemme show you something boy

The "in" operator looks for a property with a given name in a specific object
and returns true if it finds it.
*/

console.log("name" in person1); // -> true
console.log("age" in person1); // -> true
console.log("poop" in person1); // -> false
//See, how it works?
//You can check for methods too

person1.sayName = function(){
	console.log(this.name);
}

console.log("sayName" in person1); // -> true

/* Most of the time, the in operator works just fine.
The in operator have the benefit of not evaluating the value of the property.

But sometimes you want to check the existence of a property only if it is an own
property. The in operator checks for both, own and prototype properties, so
you'll need to take a different approach.

That's why the hasOwnProperty() method exists in every object. It returns true
if a given property name exists and is an own property.
*/

console.log("name" in person1); // -> true
console.log(person1.hasOwnProperty("name"));// -> true

console.log("toString" in person1); // -> true
//The toString() method is a prototype property, so...
console.log(person1.hasOwnProperty("toString")); // -> false

/*
Oh, I get it the prototype property
Every object has the toString method, so it's a prototype property...
hasOwnProperty() must be too, lemme see
*/

console.log("hasOwnProperty" in person1); // -> true
console.log(person1.hasOwnProperty("hasOwnProperty"))// -> false

//Yup

console.log("\n----------------------- REMOVING PROPERTIES -----------------------\n");

person1["I Don't Need This Property"] = "But I'm here";
console.log(person1["I Don't Need This Property"]);
/*
Oh, I hate this property, it's useless and the name, ugh... How can
I remove it?
Oh, I can put it equals to "null", YEAH! NAILED IT
*/

person1["I Don't Need This Property"] = null;
console.log("I Don't Need This Property" in person1); // -> true

/*
Freaking noobs man, this is not deleting a property.
You're just calling the method [[Set]] with the null value.
You need to use the "delete" operator to completely remove a property
from an object.

The "delete" object works on a single object property and calls an internal
operation named [[Delete]]. You can think of this operation as removing a key/value
pair from a hash table. When the delete operator is successful, it returns true.
(Some properties can't be removed, we'll talk about it later on)
*/

delete person1["I Don't Need This Property"];
console.log("I Don't Need This Property" in person1); // -> false
console.log(person1["I Don't Need This Property"]); // -> undefined

// Now it's gone.

console.log("\n----------------------- ENUMERATION -----------------------\n");

/*
By default, all properties that you add to an object are enumerable, which means
that you can itaerate over them using a for-in loop.
(I Really didn't know 'bout this)

The for-in loop (pretty much the same old foreach) enumerates all enumerable
properties on an object, assigning the property name to a variable.

Lemme show you:
*/

var property;

var object = {
	name: "Book",
	type: "Entertainment"
}

/*The "for(var property in object){" works fine, you don't need to create the
property before, probably some performance best practice */
for(property in object){
	console.log("Name: " + property);
	console.log("Value: " + object[property]);
}

/*
--------------------------------Reflection Time--------------------------------
Not sure why I can't access the property with the dot notation, I had
to use brackets

console.log("Value: " + object.property); -> Don't work, prints undefined, am I
Missing something?

Oh, I'm just dumb, sure you need to use the [] notation, the brackets notation
accepts an string, you can pass any variable with an string to call the property
Trying to use the dot notation here is something like:

var varNname = "name";
console.log(object.varName);

Kinda dumb huh? Sorry, but didn't take me long to figure it out, I swear.
-------------------------------------------------------------------------------
*/

/*
Just an overview:
We're going through the for-in loop and the property variable
is filled with the next enumarable property on the object until all properties have
been used.

Now, if you need a list of object's orpperties to use later in your program,
ECMAScript5 (Gonna read about this in a minute) introduced the Objects.keys() method
to retrieve an array of enumerable property names, as shown here:
*/

var properties = Object.keys(object);
console.log(properties); // -> [ 'name', 'type' ]

// Now I'm gonna mimic the for-in behavior

var i , len;
console.log("\nMimic Time!\n");
for(i = 0, len = properties.length; i < len; ++i){
	console.log("Name: " + properties[i]);
	console.log("Value: " + object[properties[i]]);
}

/*
Typically, you would use Object.keys() in situations where you want to operate
on an array of property names and for-in when you don’t need an array.

----> BEHIND THE SCENES <----

There's a difference between the enumerable properties returned in a for-in loop
and the ones returned by Object.keys(). The for-in loop also enumerates prototype
properties, while Object.keys() returns only own properties.

But keep in mind, that not all properties are enumerable. In fact, most of the
native methods on objects have their [[Enumerable]] attribute set to false. You
can check whether a property is enumerable by using the propertyIsEnumerable()
method (Those guys aced naming methods huh), which is present on every object:
*/

var person1 = {
	name: "Nicholas"
};

console.log("name" in person1); // -> true
console.log(person1.propertyIsEnumerable("name")); //-> true

var properties = Object.keys(person1);

console.log("length" in properties); // -> true
console.log(properties.propertyIsEnumerable("length")); // -> false

/*
See? Typically just custom properties are enumerable.
The length are a build-in property on Array.prototype.
*/

console.log("\n----------------------- PROPERTY ATTRIBUTES -----------------------\n");

/*
Prior to ECMAScript5... HOLD ON

--> Straight Outta Wiki <--

ECMAScript is the scripting language standardized by Ecma International in the
ECMA-262 specification and ISO/IEC 16262. The language is widely used for
client-side scripting on the web, in the form of several well-known
implementations such as JavaScript, JScript and ActionScript.

Now, back to business.

Prior to ECMAScript5, there was no way specify whether a property should be enumerable.
In fact, there was no way to access the internal attributes of a property at all.
ECMAScript 5 changed this by introducing several ways of interacting with property
attributes directly, as well as introducing new attributes to support additional
functionality. It's now possible to create properties that behave the same way
as built-in JavaScript properties.

Okay okay, so attributes have properties and methods as well, like [[Set]],
[[Enumerable]] and shit.

	• Common Attributes

	There are two property attributes shared between data and accessor properties.
	One is [[Enumerable]], which determines whether you can iterate over the property.
	The other is [[Configurable]], wich determines whether the property can be changed.

	You can remove a configurable property using delete and can change it's attributes
	at any time. (This also means configurable properties can be changed from data
	to accessor properties and vice versa).

	If you want to change property attributes, you can use the Object.defineProperty()
	method. This method accepts three arguments: the object that owns the property, the
	property name, and a property descriptor object containing the attributes to set.
	The descriptor has properties with the same name as the internal attributes, but without
	the square brackets.
	*/

var person1 = {
	name: "Nicholas"
};

var properties = Object.keys(person1);
console.log(properties); // -> [ 'name' ]

Object.defineProperty(person1, "name", {
	enumerable: false
});

console.log("name" in person1);
console.log(person1.propertyIsEnumerable("name"));
//The Objects.keys() method can't get the properties that the [[Enumerable]] is
//set to false
var properties = Object.keys(person1);
console.log(properties);

//Now, gonna mess with the [[Configurable]] property

Object.defineProperty(person1, "name", {
	configurable: false
});

//Now try to delete the property, I dare you, I double dare you motherfucker

var worked = delete person1.name;
console.log(worked); //-> false

console.log("\nObject.defineProperty(person1, 'name', {\n" +
	"\tconfigurable: true\n" +
"}); // -> ERROR!")

/* Yes sir, if you do "configurable: false", there's no turning back, the
property is officialy locked down as a property on person1

Note: When JavaScript is running in strict mode, attempting to delete a
nonconfigurable property results in an error. In nonstrict mode, the operation
silently fails.*/

/*
Now, lets talk about Data Property Attributes.

So, Data Properties posses two additional attirbutes that accessors do not.
The first one is the [[Value]], which holds the property value, even if the
value is a function.
The second one is called [[Writable]], which is a Boolean value indicating
whether the property can be written to. By default, all orpperties are writable
unless you specify otherwise.
With these two bad boys, you can fully define data property using
Object.defineProperty() even if the property doesn's already exist.
Look this shit:
*/

var person1 = {};

Object.defineProperty(person1, "name",{
	value: "Nicholas",
	enumerable: true,
	configurable: true,
	writable: true
});

console.log(person1.name); // -> Nicholas

/*
See? When Object.defineProperty() is called, it will check to see if the property
even exists, if not, a new one is added with the attributes specified in the
descriptos, just like that, bang.

Now, something important.
I said something about default values right? It doesn't apply to properties that are
create with Objects.defineProperty(). The default behavior of the
Objects.defineProperty() is the following: Boolean attributes will automatically
be set to false.
For example, the following code creates a name property that is nonenumerable,
nonconfigurable and nonwritable because it doesn't explicitly make any of those
attributes true. (Yeah, you must keep that in mind)
*/

var person1 = {};

Object.defineProperty(person1, "name", {
	value: "I'm fucked up"
});

console.log("name" in person1); // -> true
console.log(person1.propertyIsEnumerable("name")); // -> false

var result = delete person1.name;
console.log(result); // -> false

person1.name = "Bill";
console.log(person1.name); // -> I'm fucked up

/*
See? I can't do shit

Note: Nonwriteble properties throw an error in strict mode when you try to change
the value.
*/

/*
Now, some of the good stuff, Accessor Property Attributes, finally!

Accessor properties also have two additional attributes, and I'm not talking about
the [[Writable]] and [[Value]] attibutes, Accessor Properties doen't need these,
there's no need to store values.
Accessor Properties have... Wait for it... [[GET]] & [[SET]] (YAY!)
That's right motherfuckers, something that you're kinda used to, getters and setters,
I just love those little guys!

The advantage of using acessor property attributes instead of object literal notation
to define acessor properties is that you can also define those properties on existing
objects. if you want to use object literal notation, you have to define accessor properties
when you create the object.

As with data properties, you can also specify whether accesor properties are
configurable or enumerable. Let's take a look:
*/

var person1 = {
	_name: "Nicholas",

	get name(){
		console.log("Reading name...");
		return this._name;
	},

	set name(value){
		console.log("Setting name to %s", value);
		this._name = value;
	}
};

console.log(person1.name); //-> Reading name \n Nicholas
person1.name = "Alfred"; // -> Setting name to Alfred

//DAMN

//This code can also be written as follows:

var person1 = {
	_name: "Nicholas"
};

Object.defineProperty(person1, "name", {
	get: function(){
		console.log("Reading name...");
		return this._name;
	},

	set: function(value){
		console.log("Setting name to %s", value);
		this._name = value;
	},

	enumerable: true,
	configurable: true
});

console.log(person1.name); //-> Reading name \n Nicholas
person1.name = "Alfred"; // -> Setting name to Alfred

//Hm, I still can access the property _name directly, no getter and setters validation
person1._name = "wow";
console.log(person1._name);


/*
Notice that the get and set keys on the object passed in the Object.defineProperty()
are data properties that contain a function. You can't use object literal accessor
format here.
Setting the other attributes ([[Enumerable]] and [[Configurable]]) allows you
to change how the accessor property works. For example, you can create a
nonconfigurable, nonenumerable, nonwritable property like this:
*/

var person1 = {
	_name: "Nicholas"
};

Object.defineProperty(person1, "name", {
	get: function(){
		console.log("Reading name");
		return this._name;
	}
});

console.log("name" in person1); // -> true
console.log(person1.propertyIsEnumerable("name")); // -> false

var res = delete person1.name;
console.log(res); // -> false;

person1.name = "Bob";
console.log(person1.name); // -> Reading name \n Nicholas

/*
See? in this code the name property is an acessor property with only a getter.
There is no setter or any other attributes to explicitly set to true, so the value
can be read but not changed.

Note: As with accessor properties defined via object literal notation, an
accessor property without a setter throws an error in strict mode when you try
to change the value. In nonstrict mode, the operation silently fails.
Attempting to read an accessor property that has only a setter defined always
returns undefined.
*/

/*
Now, if you wanna define multiple properties, don't worry, I got your back
You can use Object.defineProperties() instead of Object.defineProperty(). This
method accepts two arguments: the object to work on and as object containing all
of the property information. The keys of that second argument are property names,
and the values are descriptor objects defining the attributes for those properties.

Let's make two properties:
*/

var person1 = {};

Object.defineProperties(person1, {
	//data property store data
	_name: {
		value: "Nicholas",
		enumerable: true,
		configurable: true,
		writable: true
	},

	//accessor property
	name: {
		get: function(){
			console.log("Reading name...");
			return this._name;
		},
		set: function(value){
			console.log("Setting name to %s", value);
			this._name = value;
		},
		enumerable: true,
		configurable: true
	}
});

/*
This example defines _name as a data property to contain information and name
as accessor property. You can define any number of properties using Object.defineProperties();
you can even change existing properties and create new one at the same time.
The effect is the same as calling Object.defineProperty multiple times.
*/

/*
Now, let's retrieve some property attributes.

If you need to fetch property attributes, you can do so in JavaScript by using the
Object.getOwnPropertyDescriptor(). As the name suggests, this method works only
on own properties (duh!).
This method accepts two arguments: the object to work on and the property name to
retrieve. If the property exists, you should recieve a descriptor object with four
properties: Two commom properties [[Configurable]] and [[Enumerable]] and other two,
appropriate for the type of property.
Even if you didn't specifically set an attribute, you will still recieve an object
containing the appropriate value for that attribute.
Example time:
*/

var person1 = {
	name: "Nicholas"
};

var descriptor = Object.getOwnPropertyDescriptor(person1, "name");

console.log(descriptor); /* ->
{ value: 'Nicholas',
  writable: true,
  enumerable: true,
  configurable: true } */

console.log("\n----------------------- PREVENTING OBJECT MODIFICATION -----------------------\n");

/*
Objects, just like properties, have internal attributes that govern their behavior.
One of these attributes is [[Extensible]], which is a Boolean value indicating
if the object itself can be modified. By default, all objects that you create are
extensible, meaning new properties can be added to the object at any time.

By Setting [[Extensible]] to false, you can prevent new properties from being add
to an object. There are three different ways to accomplish this.

Let's go people:

*/console.log("\nFirst Way - Preventing Extensions\n");/*

Object.preventExtensions(). This method accepts a single argument, which is the
object you want to make nonextensible. Once you use this method on an object, you'll
never be able to add any new properties again. You can check the value of [[Extensible]]
by using Object.isExtensible(). The following code shows examples of both methods at work.
*/

var person1 = {
	name: "Nicholas"
};

console.log(Object.isExtensible(person1)); // -> true;
Object.preventExtensions(person1);

console.log(Object.isExtensible(person1)); // -> false;

person1.sayName = function(){
	console.log(this.name);
};

console.log("sayName" in person1); // -> false

/* Sweet huh?

Note: Yeah, you probably already know, in strict mode addind something to a
nonextensible object will throw an error, keep it in mind
*/

/*
*/console.log("\nSecond Way - Sealing Objects\n");/*

The second way to create a nonextensible object is to "seal" the object. A sealed
onject is nonextensible, and all of its properties are nonconfigurable. That means
not only can you not add new properties, but also you can't remove properties or
change their type (from data to accessor), If an object is sealed, you can only read
or write to it's properties.
You can use the Object.seal() method, same deal here, it accepts the object and,
BANG, it's done.
Let's see this bad boy:
*/

var person1 = {
	name: "I'm tired of being Nicholas"
};

console.log(Object.isExtensible(person1)); // -> true
console.log(Object.isSealed(person1)); // -> false

Object.seal(person1);

console.log(Object.isExtensible(person1)); // -> false
console.log(Object.isSealed(person1)); // -> true

person1.sayName = function(){
	console.log(this.name);
};

console.log("sayName" in person1); // -> false

person1.name = "YES, FINALLY I'M GONNA GET A NEW NAME...";

console.log(person1.name); // -> YES, FINALLY I'M GONNA GET A NEW NAME...

var result = delete person1.name;
console.log(result); // -> false

console.log(Object.getOwnPropertyDescriptor(person1, "name").configurable); //-> false

/*
See? I sealed this bitch, I can still read or write, but I can't delete or add!
Pretty cool huh? This is the JavaScript's way of giving you the same measure
of control without classes.

Note: Be sure to use strict mode with sealed objects so yo'll get an error when
comeone tries to use the object incorrectly. (I don't even know how to to this
strict bullshit mode)
 */

console.log("\nLast Way - Freezing Objects\n");

/*

The last way to create a nonextensible object is to freeze those motherfucker.
If an object is frozen, it become a sealed read-only object. And you can't unfrozen an
object.

You can freeze an object with Object.freeze(), and you knwo the drill, only argument,
the object.

So:
*/

var person1 = {
	name : "Nicholas"
};

console.log(Object.isExtensible(person1)); // -> true
console.log(Object.isSealed(person1)); // -> false
console.log(Object.isFrozen(person1)); // -> false

Object.freeze(person1);

console.log(Object.isExtensible(person1)); // -> false
console.log(Object.isSealed(person1)); // -> true
console.log(Object.isFrozen(person1)); // -> true

person1.sayName = function(){
	console.log(this.name);
};

console.log("sayName" in person1); // -> false

person1.name = "Greg";
console.log(person1.name); // -> Nicholas

var res = delete person1.name;
console.log(res); // -> false

var descriptor = Object.getOwnPropertyDescriptor(person1, "name");
console.log(descriptor); /* ->
{ value: 'Nicholas',
  writable: false,
  enumerable: true,
  configurable: false }
*/

/*
Freeze! Halt or I`ll shoot!
*/






















