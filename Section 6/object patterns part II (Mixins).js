console.log("\n\t• Mixins\n");

/*
Although pseudoclassical inheritance and prototypal inheritance are used frequently
in JS, there is also a type of pseudoinheritance accomplished through mixins
Mixins occur when one object acquires the properties of another without modifying
the prototype chain. The first object (a receiver) actually receiver the properties
of the second object (the supplier) by copying those properties directly.
Traditionally, you create mixinx using a function such as this:
*/

function mixin(receiver, supplier){
	for(var property in supplier){
		if(supplier.hasOwnProperty(property)){
			receiver[property] = supplier[property];
		}
	}

	return receiver;
}

/*
The mixin() function accepts two arguments:
The receiver and the suplier.
The goal of the function is to copy all enumerable properties from the supplier
onto the receiver. You accomplish this using a for-in loop that iterates over
the properties in supplier and then assigns the value of that property to a
property of the same name on receiver. Keep in mind that this is a shallow
copy, so if a property contain an object, then both the supplier and the
receiver will be pointing to the same object.
This pattern is used frequently for adding new behaviors to JavaScript objects
that already exist on other object.

For example, you can add event support to an object through a mixin rather than
inheritance. First, suppose you've already defined a custom type for using events:
*/

function EventTarget(){
}
EventTarget.prototype = {
	constructor: EventTarget,
	addListener: function(type, listener){
           // create an array if it doesn't exist
           if (!this.hasOwnProperty("_listeners")) {
           	this._listeners = [];
           }
           if (typeof this._listeners[type] == "undefined"){
           	this._listeners[type] = [];
           }
           this._listeners[type].push(listener);
         },
  fire: function(event){
         	if (!event.target){
         		event.target = this;
         	}
           if (!event.type){  // falsy
           	throw new Error("Event object missing 'type' property.");
           }
           if (this._listeners && this._listeners[event.type] instanceof Array){ var listeners = this._listeners[event.type];
           	for (var i=0, len=listeners.length; i < len; i++){
           		listeners[i].call(this, event);
           	}
           } },
  removeListener: function(type, listener){
           	if (this._listeners && this._listeners[type] instanceof Array){
           		var listeners = this._listeners[type];
           		for (var i=0, len=listeners.length; i < len; i++){
           			if (listeners[i] === listener){
           				listeners.splice(i, 1);
           				break;
           			} }
           		} }
           	};

/*
The EventTarget type provides basic event handling for any object.
You can add and remove listeners as well as fire events directly on the object.
The event listeners are stored on a _listeners property that is created only
when addListener() is called for the first time (this makes it easier to mix in).
You can use instances of EventTarget like this:
*/

var target = new EventTarget();
target.addListener("message", function(event){
	console.log("Message is " + event.data);
})

target.fire({
	type: 'message',
	data: 'Hello World'
}); // -> Message is Hello World

/*
Support for events is useful for objects in JavaScript. If you want to have a
different type of object that also supports events, you have a few options.
First, you can create a new instance of EventTarget and then add on the properties that
you want:
*/

var person = new EventTarget();

person.name = "Nicholas";
person.sayName = function(){
	console.log(this.name);
	this.fire({type: 'namesaid', name: this.name});
};

person.sayName(); // -> Nicholas

/*
In this code, a new variable called person is created as an instance of EventTarget
,and then the person-related properties are added. Unfortunately, this means that
person is actually an instance of EventTarget instead of object or a custom type.
You also incur the overhead of needing to add a bunch of new properties by hand.
It woyld be better to have a more organized way of doing this.

A second way of solve this problem is to use pseudoclassical inheritance:
*/

function Person(name){
	this.name = name;
}

Person.prototype = Object.create(EventTarget.prototype);
Person.prototype.constructor = Person;

Person.prototype.sayName = function(){
	console.log(this.name);
	this.fire({type: "namesaid", name: name});
};

var person = new Person("Nicholas");

console.log(person instanceof Person); // -> true
console.log(person instanceof EventTarget) // -> true


/*
In this case, there is a new Person type that inherits from EventTarget.
You can add any further methods you need to Person's prototype afterward. However,
this isn't as succinct as it could be, and you could argue that the relationship
doen't make sense: A persons is a type of event target? By using a mixin instead,
you can reduce the amount of code necessary to assign those new properties to the
prototype:
*/

function Person(name){
  this.name = name;
}

mixin(Person.prototype, new EventTarget());
mixin(Person.prototype, {
  constructor: Person,

  sayName: function(){
    console.log(this.name);
    this.fire({type: "namesaid", name: name});
  }
});

var person = new Person("Nicholas");

console.log(person instanceof Person); // -> true
console.log(person instanceof EventTarget); // false supposebly (it's returning true)

/*
Here, Person.prototype is mixed in with a new instance of EventTarget to get
thet event behavor. Them, Person.prototype is mixed in with constructor and
sayName() to complete the composition of the prototype. Instances of Person are
not instances of EventTarget in this example because there is no inheritance. (supposebly)

Of course, you might decide that while you do want to use an object's properties,
you don't want a constructor os pseudoclassical inheritance at all.
In that case, you can use a mixin directly when you create your new object:
*/

var person = mixin(new EventTarget(), {
  name: "Nicholas",
  sayName: function(){
    console.log(this.name);
    this.fire({type: "namesaid", name: name});
  }
});

/*
In this example, a new instance of EventTarget is mixed in with some new properties
to create the person object without affecting person's prototype chain.
One thing to keep in mind about using mixinx in this way is that accessor
properties on the supplier become data properties on the receiver, which means
you can overwrite them if you're not careful. That's because the receiver properties
are being created by assignment tather than by Object.defineProperty(), meaning the
current value of the supplier property is read and then assigned to a property
of the same name on the receiver. For example:
*/

var person = mixin(new EventTarget(), {
  get name(){
    return "Nicholas"
  },

  sayName: function(){
    console.log(this.name);
    this.fire({type: "namesaid", name: name});
  }
});

console.log(person.name); // -> Nicholas

person.name = "Greg";
console.log(person.name); // -> Greg

/*
In this code, name is defined as an accessor property with only a getter.
That means assigning a value to the property should have no effect. However,
because the accessor property becomes a data property on the person object, it's
possible to overwrite name with a new value.
During the call to mixin(), the value of name is read from the supplier and
assigned to the property called name on the receiver. At no point during this
process is a new accessor defined, making the name property on the receiver a data
property.
If you want accessor properties to be copied over as accessor properties, you need
a different mixin() function, such as:
*/

function mixin(receiver, supplier){
  Object.keys(supplier).forEach(function(property){
    var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
    Object.defineProperty(receiver, property, descriptor);
  });

  return receiver;
}

var person = mixin(new EventTarget(), {
  get name(){
    return "Nicholas"
  },

  sayName: function(){
    console.log(this.name);
    this.fire({type: "namesaid", name: name});
  }
});

console.log(person.name); // -> Nicholas

person.name = "Greg";
console.log(person.name); // -> Nicholas

/*
This version of mixin() uses Object.keys() to get an array of all enumerable
own peoperties on supplier. The forEach() method is used to iterate over those
properties. The property descriptor for each property on supplier is retrieved
and then added to receiver vir Object.defineProperty(). This ensures that all of
the relevant property information is transferred to receiver, not just the value.
That means the person object has an accessor property called name, so it cannot be
overwritten.

Of course, this version of mixin() works only in ECMAScript 5 JS engines. If your
code needs to work for older engines, you should combine the two mixin() approaches
in to a single function:
*/

function mixin(receiver, supplier){
  if(Object.getOwnPropertyDescriptor){

    Object.keys(supplier).forEach(function(property){
      var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
      Object.defineProperty(receiver, property, descriptor);
    });
  } else {

    for(var property in supplier){
      if(supplier.hasOwnProperty(property)){
        receiver[property] = supplier[property];
      }
    }

  }
  return receiver;
}

/*
Here, mixin() checks whether Object.getOwnPropertyDescript() exists to determine
whether the JavaScript engine supports ECMAScript 5. If so, it goes on to use
the ECMAScript 5 version. Otherwise, the ECMAScript 3 version is used. This
function is safe to use in both modern and legacy JavaScript engines, as they will
apply the most appropriate mixin strategy.

Note:
Keep in mind that Object.keys() return only enumerable properties. If you want to
also copy ever nonenumerable properties, use Object.getOwnPropetyNames() instead.
*/


console.log("\n\t• Scope-Safe Constructors\n");

/*
Because all constructors are just functions, you can call them without using the
new operator and therefore affect the value of this. Doing so can yield unexpected
results, as this ends up coerced to the global object in nonstrict mode, or the
constructor throws as error in strict mode. In Chapter 4, you encountered this
example:
*/

function Person(name){
  this.name = name;
}

Person.prototype.sayName = function(){
  console.log(this.name);
};

var person1 = Person("Nicholas");

console.log(person1 instanceof Person); // -> false
console.log(typeof person1);  // -> undefined
//console.log(name); // -> Nicholas

/*
In this case, name os created as a global variable because the Person constructor
is called without the "new". Keep in mind that this code is running in nonstrict
mode, as leaving out new would throw an error in strict mode.
The fact that the constructor begins with a capital letter usually indicates that
it should be proceded by new, but what if you want to allow this use case and have
a function work without the new? Many build-in constructors, such as Array and
RegExp, also work without the new because they are written to be scope safe.
A scope-safe constructor can be called with ot without new and returns the same
type of object in either case.
When new is called with a function, the newly created object represented by this
is already an instance of the custom type represented by the constructor. So you
can use instanceof to determine whether new was used in the function call:
*/

function Person(name){
  if(this instanceof Person){
    //called with "new"
  } else {
    //called without new
  }
}

/*
Using a pattern like this lets you control what a function does based on whether
it's called with new or without. You may want to treat each circumstance differently,
but you'll ofter want the function to behave the same way (frequently, to protect
against accidental omission of new). A scope-safe version of Person looks like this:
*/

function Person(name){
  if(this instanceof Person){
    this.name = name;
  } else {
    return new Person(name);
  }
}

/*
For this constructor, the name property is assigned as always when new is used.
If new isn't used, the constructor is called recursively via new to create a
proper instance of the object. In this way, the following are equivalent:
*/

var person1 = new Person("Nicholas");
var person2 = Person("Nicholas");

console.log(person1 instanceof Person) // true
console.log(person2 instanceof Person) // true

/*
Creating new objects without using the new operator is becoming more common as
an effort to curb errors caused by omitting new. JavaScript itself has several
reference types with scope-safe constructors, such as Object, Array, RegExp,
and Error.
*/


