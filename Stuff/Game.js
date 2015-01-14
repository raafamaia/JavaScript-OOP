 // U3.W7: Design your own Code Combat Mission

// This is a solo challenge

// Your mission description:
// Overall mission: Make the ogre give up!
// Goals: Make the ogre give up!
// Characters: CodeNinja and Ogre
// Objects: CodeNinja, Ogre, Sword, Shield and Pack of Cards.
// Functions: run, attack, playcards

// Pseudocode
// Create object codeninja with title, hp, sword, shield and pack of cards.
// Create object ogre with title, hp, sword and shield.
// Create object sword with atk and resistance
// Create object shield with defense and resistance
// Create object pack of cards with cardValue

// Initial Code


function Character(cName, hp, sword, shield){
	this.cName = "";
	this.hp = hp;
	this.sword = sword;
	this.shield = shield;
	// attack = function(targetHit){
	// 	targetHit.hp = targetHit.hp - (this.sword.atk - targetHit.shield.defense);
	// };
}

Character.prototype.getHP = function(){
	return this.hp;
}

Character.prototype.attack = function(targetHit){
		targetHit.hp = targetHit.hp - (this.sword.atk - targetHit.shield.defense);
		console.log(targetHit.hp);
		dead(targetHit);
	};

function Player(cname, hp, sword, shield, packCards){
	Character.call(this, cname, hp, sword, shield);
	this.packCards = packCards;
}

Player.prototype = new Character;
Player.prototype.constructor = Player;

Player.prototype.playCards = function(cardValue){
	var randomValue = packCards.values[Math.floor(Math.random() * packCards.values.length)]
	if(cardValue == randomValue){
		console.log("You win! Game over!");
	} else {
		console.log("I win! Game over!");
	}
}

function Ogre(cname, hp, sword, shield){
	Character.call(this, cname, hp, sword, shield);
};

function dead(targetHit){
	if(targetHit.hp <= 0){
		console.log("DEAD! GAME OVER!");
	}
}


Ogre.prototype = new Character;

var sword = {
	atk: 10,
	resistance: 5
};

var shield = {
	defense: 5,
	resistance: 10
};

var packCards = {
	values: [1,2,3,4,5,6,8,9,10,"Q","J","K"]
};


var codeninja = new Player("Code Ninja", 10, sword, shield, packCards);
var ogre = new Ogre("Ogre", 20, sword, shield);


var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt("1 - Attack \n2 - Play Cards\n");
rl.prompt();
rl.on('line', function(line) {
    switch(line){
	  	case "1":
	  		codeninja.attack(ogre);
	  		console.log(codeninja.hp);
	  		break;
	  	case "2":
	  		codeninja.playCards([Math.floor(Math.random() * packCards.values.length)]);
	  		rl.close();
	  		break;
	  	default:
	  		console.log("Opção Inválida");
	  }

}).on('close',function(){
    process.exit(0);
});



// function attack






// Refactored Code






// Reflection
//
//
//
//
//
//
//
//