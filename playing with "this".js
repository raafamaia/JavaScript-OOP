/*
The ability to use and manipulate this value of functions is key to good
object-oriented programmingin JavaScript. Functions can be used in many
different contexts, and thet need to be able to work in each situation.
Even though "this" is typically assigned automatically, you can change its value
to achieve different goals. There are three function methods that allow you to
change the value of this. (FUNCTIONS ARE OBJECTS, AND OBJECTS CAN HAVE METHODS AND SHIT)
*/

console.log("\n---------------------------THE CALL METHOD------------------------------------\n");

/* The call() method executes the function with a particular "this" value and
with specific parameters.

The first paraeter of call() is the value to which "this" should be equal when
the functions is executed. (pretty much the object that would call the function)
*/

function sayName(who){
	console.log(who + " -> " + this.name);
}

var person1 = {
	name: "Maia"
};

var person2 = {
	name: "John"
};


//Not sure why the this global object didn't get the name property, something
//with running on node I guess, the this global object in convencional JavaScript
//should be the tab browser or something like that...

// var name = "God"; -> outputs "undefined"

//This way works fine, yeah man, I don't know
this.name = "God";

sayName.call(this, "Hey, I'm person1 object, my name?");
sayName.call(person1, "Hey, I'm person1 object, my name?");
sayName.call(person2, "Hey, I'm person1 object, my name?");

console.log("\n---------------------------THE APPLY METHOD------------------------------------\n");


/* The apply() method works exactly the same as the call() method, except that
it accepts only two parameters: the "this" value and an array like object of
parameters, like the arguments[] one. This way you can pass multiple parameters
without instead of individually naming each parameters using call()
*/

function sayMyName(who){
	//yup, I love ternary bitchies
	console.log((this.name === "Heisenberg") ? "I'm the one who knocks!" : "My name is " + who);
}

var MrWhite = {
	name: "Heisenberg"
};

var randomPerson = {
	name: "Gus"
}

// var name = "God"; -> outputs "undefined"

//This way works fine, yeah man, I don't know
this.name = "God";

sayMyName.apply(MrWhite, ["MrWhite"]);
sayMyName.apply(randomPerson, [randomPerson.name]);

console.log("\n---------------------------THE BIND METHOD------------------------------------\n");



