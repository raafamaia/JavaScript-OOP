/* The sort function accepts another function as the first argument, that need
to return a negative value if the first argument is bigger then the second, a
positive value if the second argument is bigger, and zero if they are equal

Cool huh? If you don't do this shit, the default behavior of the sort() method
is to transform everything in String and then order as strings...
*/

//------------------------------------------------------------------------------
var numbers = [1, 3, 5, 7, 9, 2, 4, 6, 8, 0, 10, 20, 30, 33, 22, 11];
numbers.sort(function(first, second){
	return first - second;
});
//nice print with my function that takes 2 arguments, to compare one to another
console.log(numbers);
//------------------------------------------------------------------------------
numbers.sort();
//shitty print
console.log(numbers);
//------------------------------------------------------------------------------