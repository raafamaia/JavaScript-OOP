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

function subclassOf(base) {
    _subclassOf.prototype = base.prototype;
    return new _subclassOf();
}
function _subclassOf() {};

//------------------------------------------------------------------------------

function Equipment(name, resistance){
	this.name = name;
	this.resistance = resistance;
}

function Weapon(name, resistance, attack){
	Equipment.call(this, name, resistance);
	this.attack = attack;
}
Weapon.prototype = subclassOf(Equipment);

function Shield(name, resistance, defense){
	Equipment.call(this, name, resistance);
	this.defense = defense;
}
Shield.prototype = subclassOf(Equipment);

//------------------------------------------------------------------------------

function Character(name, hp, weapon, shield, strength, defense){
	this.name = name;
	this.hp = hp;
	this.weapon = weapon;
	this.shield = shield;
	this.strength = (strength === undefined) ? 10 : strength;
	this.defense = (defense === undefined) ? 10 : defense;
}

Character.prototype = {
	constructor: Character,

	lostHP: function(dmg){
		this.hp -= dmg;
		return dmg;
	},

	attack: function(target){
		if(target instanceof Character){
			var dmg = (this.strength
			+ ((this.weapon === undefined) ? 0 : this.weapon.attack))
			- (target.defense
			+ ((target.shield === undefined) ? 0 : target.shield.defense));

			target.lostHP(dmg);
			return target.name + " received " + dmg + " damage";
		}
	},

	toString: function(){
		var message = "Hey, I'm the brave " + this.name + "\nYou better fear me fool...\n"
		+ "Why? Huh, just take a look:\n";

		for (property in this){
			if (this.hasOwnProperty(property)){
				message += "\n" + property + ": ";
				if (this[property] instanceof Equipment){
					for(prop in this[property]){
						message += prop + " - " + this[property][prop] + "\n\t\t\t\t";
					}
				} else {
					message += this[property];
				}
			}
		}
		return message;
	},
	stats: function(){
		var message = this.name + " stats: \nhp - " + this.hp;
		return message;
	}
};


function Player(){
	Character.apply(this, arguments);
}
Player.prototype = subclassOf(Character);

function Ogre(){
	Character.apply(this, arguments);
}
Ogre.prototype = subclassOf(Character);


//------------------------------------------------------------------------------

var defaultWeapon = new Weapon("Sword", 5, 15);
var defaultShield = new Shield("Shield", 5, 5);
var ogre = new Ogre("Ogre", 200);
var player = new Player("You", 200, defaultWeapon, defaultShield);

//------------------------------------------------------------------------------

function Main(){
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt("1 - Attack \n2 - Play Cards\n");
rl.prompt();
rl.on('line', function(line) {
    switch(line){
	  	case "1":
	  		console.log(player.attack(ogre));
	  		console.log(player.stats());
	  		console.log(ogre.stats());
	  		break;
	  	// case "2":
	  	// 	codeninja.playCards([Math.floor(Math.random() * packCards.values.length)]);
	  	// 	rl.close();
	  	// 	break;
	  	default:
	  		console.log("Opção Inválida");
	  }

}).on('close',function(){
    process.exit(0);
});
}

Main();

//console.log(player.toString());
//console.log(ogre.toString());


// console.log(player.attack(ogre));
// console.log(ogre.hp)
