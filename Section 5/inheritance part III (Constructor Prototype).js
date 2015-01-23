console.log("--------------------------- Constructor Inheritance ---------------------------");

/*
Object inheritance in JS is also the basis of constructor inheritance. Recall from
Chapter 4 that almost every function hasa prototype property that can be modified
or replaced. That prototype property is automatically assigned to be a new generic
object that inherits rom Object.prototype and has a single own property called
constructor. In effect, JS engine does this:
*/

//you write this
function YourConstructor(){
	//initialization
}

//JS engine does this for you behind the scenes
YourConstructor.prototype = Object.create(Object.prototype, {
	constructor: {
		configurable: true,
		enumerable: true,
		value: YourConstructor,
		writable: true
	}
});

/*
So without doing anything extra, this code sets the constructor's prototype
property to an object that inherits from Object.prototype, which means any
instances of YourConstructor also inherit from Object.prototype. YourConstructor
is a subtype of Object, and Object is a sypertype of YourConstructor.

Because the prototype property is writable, you can change the prototype chain by
overwriting it. COnsider the following:
*/

function Rectangle(length, width){
	this.length = length;
	this.width = width;
}

Rectangle.prototype.getArea = function(){
	return this.length * this.width;
};

Rectangle.prototype.toString = function(){
	return "[Rectangle " + this.length + "x" + this.width + "]";
};

function Square(size){
	this.length = size;
	this.width = size;
}

Square.prototype = new Rectangle();
Square.prototype.constructor = Square;

Square.prototype.toString = function(){
	return "[Square " + this.length + "x" + this.width + "]";
};

var rect = new Rectangle(5, 10);
var square = new Square(6);

console.log(rect.getArea()); // -> 50
console.log(square.getArea()); // -> 36

console.log(rect.toString()); // ->[Rectangle 5x10]
console.log(square.toString()); // -> [Square 6x6]

console.log(rect instanceof Rectangle); // -> true
console.log(rect instanceof Object); // -> true

console.log(square instanceof Square); // -> true
console.log(square instanceof Rectangle); // -> true
console.log(square instanceof Object); // -> true

/*
In this code, there are two constructors: Rectangle and Square.
The Square constructor has its prototype property overwritten with an instance of
Rectangle. No arguments are passed into Rectangle at this point because they don't
need to be used, and if they were, all instances of Square would share the same
dimensions. To change the prototype chain this way, you always need to make sure
that the constructor won't throw an error if the arguments are't supplied (many
constructors contain initialization logic that may require the arguments) and that
constructor isn't altering any sort of global state, such as keeping track of how
many instances have been created. The constructor property is restored on
Square.prototype after the original is overwritten.
After that, rect is created as an instance of Rectangle, and square is created
as a instance of Square. Both objects have the getArea() method because it is
inherited from Rectangle.prototype. The square variable is considered an instance
os Square as well as Rectangle and Object because instanceof uses the prototype
chain to determine the object type.
*/

/*
Square.prototype doesn't actually need to be overwritten with a Rectangle object,
though; the Rectangle constuctor isn't doing anything that is necessary for Square.
In fact, the only relevant part is that Square.prototype need to somehow link to
Rectangle.prototype in order for inheritance to happen. That means you can simplify
this example by using Object.create() once again.
*/

function Square(size){
	this.length = size;
	this.width = size;
}

Square.prototype = Object.create(Rectangle.prototype, {
	constructor: {
		consfigurable: true,
		enumerable: true,
		value: Square,
		writable: true
	}
});

Square.prototype.toString = function(){
	return "[Square " + this.length + "x" + this.width + "]";
};

/*
In this version of the code, Square.prototype is overwritten with a new object
that inherits from Rectangle.prototype, and the Rectangle constructor is never
called. That means you don't need to worry about causing an error by calling
the constructor without arguments anymore.
Otherwise, this code behaves exactly the same as the previous code. The prototype
chain remains intact, so all instances of Square inherit from Rectangle.prototype
and the constructor is restored in the same step

Note: Always make sure that you overwrite the prototype before adding propertoes
to it, or you will lose the added methods when the overwrite happens
*/

console.log("\n\t• Constructor Stealing");

/*
Because inheritance is accomplished through prototype chains in JS, you don't
need to call an object's supertype constructor. If you do want to call the
supertype constructor from the subtype constructor, then you need to take advantage
of how JavaScript work.
We already learned about the call() and apply() methods, which allow functions
to be called with a different this value. That's exactly how constructor stealing
works. You simply call the supertype constructor from the subtype constructor using
either call() or apply() to pass in the newly created object. In effect, you're
stealing the supertype constructor for your own object, as in this example:
*/

function Rectangle(length, width){
	this.length = length;
	this.width = width;
}

Rectangle.prototype.getArea = function(){
	return this.length * this.width;
};

Rectangle.prototype.toString = function(){
	return "[Rectangle " + this.length + "x" + this.width + "]";
};

//inherits from rectangle
function Square(size){
	Rectangle.call(this, size, size);

	//optional: add new properties or override existing ones here
}

Square.prototype = Object.create(Rectangle.prototype, {
	constructor: {
		configurable: true,
		enumerable: true,
		value: Square,
		writable: true
	}
});

Square.prototype.toString = function(){
	return "[Square " + this.length + "x" + this.width + "]";
};

var square = new Square(6);

console.log(square.length); // -> 6
console.log(square.width); // -> 6
console.log(square.getArea()) // -> 36

/*
See what happpened here? the Square constructor calls the Rectangle constructor
passes in this as well as size two times.
Doing so creates the lenght and width properties on the new object and makes each
equal to size. This is the way to avoid redefining properties from a constructor
from which you want to inherit.
You can add new or change existing properties after calling the super type constructor.

This two-step process is useful then you need to accomplish inheritance between
custom types. You'll always need to call the supertype constructor from within
the subtype constructor. Generally, you'll modify the prototype for method
inheritance  and use constructor stealing for properties. This approach is
typically referred to as pseudoclassical inheritance because it mimics classical
inheritnce from class-based languages.
*/

console.log("\n\t• Accessing Supertype Methods");


/*
In the previous example, the Square type has its own toString() method that
shadows toString() on the prototype. It is fairly common to ovoerride supertype
methods with new functionality in the subtype, but what if you still want to
access the supertype method? In other languages, you might be able to say
super.toString(), but JavaScript doen't have anything similar.
Instead, you can directly access the method on the supertype's prototype
and use either call() or apply() to execute the method on the subtype object.
*/

function Rectangle(length, width){
	this.length = length;
	this.width = width;
}

Rectangle.prototype.getArea = function(){
	return this.length * this.width;
};

Rectangle.prototype.toString = function(){
	return "[Rectangle " + this.length + "x" + this.width + "]";
};

function Square(size){
	Rectangle.call(this, size, size);
}

Square.prototype = Object.create(Rectangle.prototype, {
	constructor: {
		configurable: true,
		enumerable: true,
		value: true,
		writable: true
	}
});

//call the supertype method
Square.prototype.toString = function(){
	var text = Rectangle.prototype.toString.call(this);
	return text.replace("Rectangle", "Square");
};

console.log(square.length); // -> 6
console.log(square.width); // -> 6
console.log(square.getArea()) // -> 36
console.log(square.toString()) // -> [Square 6x6]

//Done.


