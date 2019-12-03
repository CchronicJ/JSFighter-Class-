const START_HP = 20;//declares START_HP as a constant
const START_SP = 10;//declares START_SP as a constant
const DEFAULT_ATK = 5;//declares DEFAULT_ATK as a constant
const DEFAULT_DEF = 5;//declares DEFAULT_DEF as a constant
const DEFAULT_TEK = 5;//declares DEFAULT_TEK as a constant

//sets constants names
const P0NAME = 'Crash'//Dcelares Player0's name
const P0CHARA = 'crashr'//Delares Player0's character
const P1NAME = 'Sam'//Declares player1's name
const P1CHARA = 'saml'//Declares player1's character

let playerTurn = false;//Determines player's turn
let logging = true;//declares log on

let Player0;//declares player
let Player1;//declares player

//varible for finding % of players HP used for the HealthBar
let player0PercentHP;//helps distinguish player0's health for the health bar
let player1PercentHP;//helps distinguish player1's health for the health bar
let player0PercentSP;//helps distinguish player 0's SP
let player1PercentSP;//helps distinguish player 1's SP

// declared variables for the boxes
let gameBox;//declares gameBox
let headerBox;//declares headerBox
let graphicsBox;//declares graphicsBox
let barsBox;//declares barsBox
let controlsBox;//declares controlsBox
let outputBox;//declares outputBox

class Fighter {//declares class
  constructor(name, charaName) {//It does the main stuff like construting their values
    //'contructor' is in all JS classes
    // It gets run immediately when a new object is created from a class

    // Set all of our default values for this new fighter here
    this.name = name;//sets the name
    this.hp = START_HP;//sets the hp
    this.sp = START_SP;//sets the sp
    this.atk = DEFAULT_ATK;//sets attack
    this.def = DEFAULT_DEF;//sets defense
    this.tek = DEFAULT_TEK;//sets their techinique
    this.charaName = charaName;//sets the charcaters name
  }

  //this logs who attacked who
  attack(target) {
    console.log(this.name + ' attacked ' + target.name); //logs attack
    let damage = (Math.round(Math.random() + 1) * this.atk) //Does the attack with a random chance to be double. this is done by getting random number between one and zero, converts it to just one or zero and adds one to it making it randomly one or two. then it takes the one or two times the damage to deal random double damage
    let reducedDamage = Math.round(damage / 4)//reduces damage done through a math function
    let dodge = Math.round(Math.random())//declares dodge
    if (dodge) {//Declares dodge again
      outputBox.innerHTML += '<br>' + target.name + ' dodged ' + this.name + '\'s attack and was hit only hit for ' + reducedDamage + ' damage'; // outputs to the outputbox
      damage = reducedDamage
      koCheck(target, damage); //runs ko check
    } else {//or
      outputBox.innerHTML += '<br>' + this.name + ' attacked ' + target.name + ' for ' + damage + ' damage!' // outputs to the outputbox
      koCheck(target, damage); //runs ko check
    }
  }

  single(target) {
    this.attack(target);
    endTurn();
  }

  double(target) {
    this.attack(target);
    this.attack(target);
    endTurn();
  }

  //this logs that they recovered
  recover() {
    console.log('Recovered!');

    //save old text
    let oldtext = outputBox.innerHTML
    //if they have enough Sp
    if (this.sp >=3) {
      //minus 3 sp from total sp
      this.sp = this.sp- 3;
      //calculate recovery
       let recovery = this.tek * 2;
       //heal player
       koCheck(this,-recovery);
       outputBox.innerHTML = this.name + ' Recovered ' + recovery;
    } else{
      outputBox.innerHTML = "not enough SP"

    }
endTurn()
  }
}


function startup() {
  Player0 = new Fighter(P0NAME, P0CHARA);
  Player1 = new Fighter(P1NAME, P1CHARA);

  //this makes a shortcut for 'document.getElementById'
  gameBox = document.getElementById('gameBox');//gets gamebox element
  headerBox = document.getElementById('headerBox');//gets headerBox element
  graphicsBox = document.getElementById('graphicsBox');//gets graphicsBox element
  barsBox = document.getElementById('barsBox');//gets barsBox element
  controlsBox = document.getElementById('controlsBox');//gets controlsBox element
  outputBox = document.getElementById('outputBox');//gets outputBox element


  //this shows the fighter images in the graphics box
  graphicsBox.innerHTML = '<img id ="' + Player0.charaName + '" src="img/' + Player0.charaName + '_idle.png" alt="' + Player0.name + '" class="fighterIMG">'//sets player in the graphics box with it's img
  graphicsBox.innerHTML += '<img id ="' + Player1.charaName + '" src="img/' + Player1.charaName + '_idle.png" alt="' + Player1.name + '" class="fighterIMG">'//sets player in the graphics box with it's img

  console.log('My name is ' + Player0.name + ' and my ATK is ' + Player0.atk);
  console.log('My name is ' + Player1.name + ' and my ATK is ' + Player1.atk);

  console.log("My name is " + Player0.name + " and my ATK is " + Player0.atk)//logs arrackers name with the attack
  console.log("My name is " + Player1.name + " and my ATK is " + Player1.atk)//logs arrackers name with the attack

  showControls(); //runs the showControls() function
  updateBars(); //runs the updateBars() function
}

function showControls() {//shows the controls
  //checks to see which players turn it is and show the apropriate controls
  if (playerTurn) {
    //show buttons for player1 and overwrites player0's controls
    controlsBox.innerHTML = '<button type="button" name="attack" onclick="Player1.single(Player0)">Single Attack!</button>';
  } else {
    //show buttons for player0 and overwrites player1's controls
    controlsBox.innerHTML = '<button type="button" name="attack" onclick="Player0.single(Player1)">Single Attack!</button>';
  }
}
//checks the target's HP is less than or equal to 0, Then retuns true or false.
function koCheck(target, amount) {//Declares knock out checking
  target.hp = target.hp - amount;//Declares loss of hp in players health
  if (target.hp <= 0) {//checks if health is lower or equal to 0
    return true;//Declares them dead
  } else {//or
    return false;//declares them alive
  }
}


//This function takes all the info to build an HP or SP bar, and ensure it is not greater than 100 or less than 0
function updateBar(player, hpsp, min, max) {
  let calculated = ((min / max) * 100)
  if (calculated > 100) {
    calculated = 100;
  } else if (calculated < 0) {
    calculated = 0;
  }
  return '<div class="' + hpsp + 'Bar"><div style="width:' + calculated + '%;" id="p0' + hpsp + 'Fill" class="' + hpsp + 'Fill">' + min + '</div></div>'
}

//This function makes the hp/sp bars and places them in the barsBox useing the updateBar
function updateBars() {
  barsBox.innerHTML = updateBar(Player0, 'hp', Player0.hp, START_HP)
  barsBox.innerHTML += updateBar(Player0, 'sp', Player0.sp, START_SP)
  barsBox.innerHTML += updateBar(Player1, 'hp', Player1.hp, START_HP)
  barsBox.innerHTML += updateBar(Player1, 'sp', Player1.sp, START_SP)
}

// EndTurn code
function endTurn() {//Declares end of turn
  playerTurn = !playerTurn
  if (koCheck(Player0, 0) || koCheck(Player1, 0)){

    hideControls();
    updateBars();
  } else {
    showControls()
    updateBars();
  }
}


function hideControls() {//declares hideControls

  controlsBox.innerHTML = '';//declares controlsBoxin the hideControls function
}


/*

MHW = 'delicious'

MHWoutput > MHWinput

*/
