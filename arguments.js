var func = function(x, y){
	return x + y;
};

console.log(func.length);
console.log(func(1, 2, 3));

var func = function(){
	var res = 0;
	for(var i = 0, size = arguments.length; i < size; ++i){
		process.stdout.write(arguments[i] + ((i === size - 1) ? " = " : " + "));
		res += arguments[i];
	}
	return res;
}

console.log(func(1, 2, 3));
console.log(func(2334, 4545, 5656));