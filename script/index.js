const START_HP = 20;
const START_SP = 10;
const DEFAULT_ATK = 5;
const DEFAULT_DEF = 5;
const DEFAULT_TEK = 5;
let playerTurn = false;
let logging = false;
const P0NAME = "Crash";
const P1NAME = "crashr";
const P1CHARA = "saml";
const P0CHARA = "sam"
class Fighter {
  constructor(name, charaName) {
    //'contructor' is in all JS classes
    // It gets run immediately when a new object is created from a class

    // Set all of our deafult values for this new fighter here
    this.name = name;
    this.hp = START_HP;
    this.sp = START_SP;
    this.atk = DEFAULT_ATK;
    this.def = DEFAULT_DEF;
    this.tek = DEFAULT_TEK;
    this.charaName = charaName;
  }
  attack(target) {
    console.log(this.name + " attacked " + target.name)
  }
  single(target) {
    this.attack(target);
  }
  double(target) {
    this.attack(target);
    this.attack(target);
  }
  recover() {
    console.log("Recovered!")
  }
}


let Player0;
let Player1;

function startup() {
  Player0 = new Fighter(P0NAME, P1NAME);
  Player1 = new Fighter(P0CHARA, P1CHARA);
document.getElementById('graphicsbox').innerHTML = '<img src="img/' + P0CHARA +'_idle.png">'
  console.log("My name is " + Player0.name + " and my ATK is " + Player0.atk)
  console.log("My name is " + Player1.name + " and my ATK is " + Player1.atk)
}








/*
MHW = 'delicious'
MHWoutput > MHWinput
*/
