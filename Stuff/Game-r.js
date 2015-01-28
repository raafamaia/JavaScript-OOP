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
	}
};

var defaultWeapon = new Weapon("Sword", 5, 15);
var defaultShield = new Shield("Shield", 5, 5);

function Player(){
	Character.apply(this, arguments);
}
Player.prototype = subclassOf(Character);

function Ogre(){
	Character.apply(this, arguments);
}
Ogre.prototype = subclassOf(Character);

var ogre = new Ogre("bob", 200);
var player = new Player("Jab", 200, defaultWeapon, defaultShield);

//console.log(player.toString());
//console.log(ogre.toString());


player.attack(ogre);
console.log(ogre.hp)
