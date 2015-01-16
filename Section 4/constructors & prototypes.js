/*
Sure, you can do shit without knowing about constructors and prototypes, but
where's the fun?

Because JavaScript lacks classes, it turns to constructors and prototypes to bring
a similar order to objects. But just cuz some of the patterns resemble classes
doens't mean they behave the same way.
*/

console.log("---------------------------- Constructors MOTHERFUCKEEEEER ----------------------------");

/*
A constructor is simply a function that is used with new to create an object.
That's it, you've seen it already, you used this shit, Array, Object, Function...

The advantage of constructors is that objects created with the same constructor
contain the same properties and methods. If you want to create multiple similar
objects, you can create your own constructors and therefore your own reference
types.

Constructors are just a function, same deal, you define it the same way...
The only difference is that constructor names should begin with a capital letter,
to dintinguish them from other functions.
*/

function Person(){
	//Yup, I'm not a idiot, this is intentionally empty.
}

/*
This is a constructor, see? Capital letter.
Now, let's make some people
*/

var person1 = new Person();
var person2 = new Person();

/*
I didn't know that, if you have no parameters to pass to the constructor,
fuck the parantheses my nigga
*/

var person1 = new Person;
var person2 = new Person;

/*
Even though the Person constructor doen't explicitly return anything,
both person1 and person2 are considered instances of the new Person type.

The new operator automatically creates an object of the given type and returns
it.

That also means you can use the instanceof operator to deduce an object's type
*/

console.log(person1 instanceof Person); // -> true
console.log(person2 instanceof Person); // -> true

/*
See? Little People

You can check the type of an instance using the constructor property. Every
object instance is automatically created with a constructor property that contains
a reference to the constructor function that created it.
For generic object, constructor is set to Object.
*/

console.log(person1.constructor); //[Function: Person]
console.log(person1.constructor === Person); // -> true

/*

You're still advised to use instanceof to check the type of an instance. Cuz
constructor property can be overwritten and therefore may not be accurate.

Now lt's make a real person, not a useless empty constructor
*/

function Person(name){
	this.name = name;
	this.sayName = function(){
		console.log(this.name);
	};
}

/*
Not quite good, but better, this version accepts a name, it will have the
property name and a method called sayName().

Some deep shit, the "this" object is created automatically by "new" when you call
the constructor, and it's an instance of the constructor's type. No need to return value,
the "new" do this shit for us.
*/

var person1 = new Person("Greg");
var person2 = new Person("Cris");

console.log(person1); // -> { name: 'Greg', sayName: [Function] }
console.log(person2); // -> { name: 'Cris', sayName: [Function] }

person1.sayName(); // -> Greg
person2.sayName(); // -> Cris

/*
Note:
You can also explicitly call return inside of a constructor. If the returned
value is an object, it will be returned instead of the newly created object
instance. If the returned value is a primitive, the newly created object is
used and the returned value is ignored.
*/












