class Fighter {
  constructor(name, charaname) {
     this.name = name;
     this.hp = 40;
     this.sp = 20;
     this.atk = 10;
     this.def = 10;
     this.tek = 10;
     this.charaname = charaname;
  }
  attack(target) {
    console.log(this.name + "Attacked!" + target.name);
  }
  single(target) {
    this.attack(target);
  }
  double(target) {
    this.attack(target);
    this.attack(target);
  }
  recover() {
    console.log("Recovered!");
  }
}
let Player0;
let Player1;
function startup() {
let Player0 = new Fighter("Crash", "crashr");
let Player1 = new Fighter("Sam", "saml");

  console.log("My name is " + Player0.name + " and my ATK is " + Player0.atk);
    console.log("My name is " + Player1.name + " and my ATK is " + Player1.atk);
}
