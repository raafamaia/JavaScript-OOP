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

function Equipment(){

}

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
	}
};

function Player(name, hp){
	Character.call(this, name, hp);
}
Player.prototype = subclassOf(Character);

function Ogre(name, hp){
	Character.call(this, name, hp)
}
Ogre.prototype = subclassOf(Character);

var ogre = new Ogre("bob", 200);
var player = new Player("Jab", 200);

player.attack(ogre);
console.log(ogre.hp);