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















