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
*/




