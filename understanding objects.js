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



