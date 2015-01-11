console.log("---------------------------- THE MAGIC ARGUMENTS -------------------------");
/* Some weird shit happens in JavaScript with arguments huh?
First of all, you can pass whatever you want to a function, it'll all be stored
on a array-like structure named "arguments", avaliable in every function...

But hey, this means that JS don't have functions signatures? Yes Sir, this is
exactly what it means.
And how Overload and shit works? oh, it's kinda ugly, but you canr check the
number of arguments passed (or check the named argument with undefined) to do
one thing or another. Not the prettiest solution, but works just fine.
Remember, functions are objects in JacaScript, they have properties and shit, like
the length property, that is the number of arguments that one function expects.

The arguments[] can be pretty handy some times, below I'm gonna do a function
takes whatever numbers you and to add, and returns the sum of those numbers.
*/

var sum = function(x, y){
	return x + y;
};

console.log(sum.length);
console.log(sum(1, 2, 3));

var sum = function(){
	var res = 0;
	for(var i = 0, size = arguments.length; i < size; ++i){
		process.stdout.write(arguments[i] + ((i === size - 1) ? " = " : " + "));
		res += arguments[i];
	}
	return res;
}

console.log(sum(1, 2, 3));
console.log(sum(2334, 4545, 5656));

