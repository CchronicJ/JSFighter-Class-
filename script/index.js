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
let logging = true;//stops a log that goes down the screen

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
  attack(target) {//sets target of attack
    console.log(this.name + ' attacked ' + target.name);//logs it
  }

  single(target) {//sets attack type used on target
    this.attack(target);//attacks
  }

  double(target) {//sets attack types used on target
    this.attack(target);//attacks
    this.attack(target);//attacks again
  }

  //this logs that they recovered
  recover() {//sets recovery
    console.log('Recovered!');//logs recovery
  }
}

function startup() {//what shows during startup
  Player0 = new Fighter(P0NAME, P0CHARA);//gives player the name
  Player1 = new Fighter(P1NAME, P1CHARA);//gives player the name

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


  console.log("My name is " + Player0.name + " and my ATK is " + Player0.atk)//logs arrackers name with the attack
  console.log("My name is " + Player1.name + " and my ATK is " + Player1.atk)//logs arrackers name with the attack

  showControls() //runs the showControls() function
  updateBars() //runs the updateBars() function
}

function showControls() {//shows the controls
  //checks to see which players turn it is and show the apropriate controls
  if (playerTurn) {
    //show buttons for player1 and overwrites player0's controls
    controlsBox.innerHTML = '<button type="button" name="attack" onclick="Player1.single(Player0)">Single Attack!</button>'
  } else {
    //show buttons for player0 and overwrites player1's controls
    controlsBox.innerHTML = '<button type="button" name="attack" onclick="Player0.single(Player1)">Single Attack!</button>'
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


function updateBars() {//Declares updateBars
  //calculates the percent of HP
  player0PercentHP = (Player0.hp / START_HP) * 100//percentage of player0's health
  player1PercentHP = (Player1.hp / START_HP) * 100//percentage of player1's health
  player0PercentHP = (Player0.sp / START_SP) * 100//percentage of player0's SP
  player1PercentHP = (Player1.sp / START_SP) * 100//percentage of player1's SP

  //Makes sure Player0's health is not greater than 100% or less than 0%
  if (player0PercentHP <= 0) {//Declares health either being equal to or below 0 keeping it above
    player0PercentHP = 0//sets player health only being able to go to 0 not any lower
  } else if (player0PercentHP > 100) {//Declares health being greater then 100
    player0PercentHP = 100//keeps it from enter above 100
  } else {//or
    player0PercentHP = player0PercentHP
  }

  //Makes sure Player1's health is not greater than 100% or less than 0%
  if (player1PercentHP <= 0) {//Declares health either being equal to or below 0 keeping it above
    player1PercentHP = 0//sets player health only being able to go to 0 not any lower
  } else if (player1PercentHP > 100) {//Declares health being greater then 100
    player1PercentHP = 100//keeps it from enter above 100
  } else {//or
    player1PercentHP = player1PercentHP
  }

  //Makes sure Player0's SP is not greater than 100% or less than 0%
  if (player0PercentSP <= 0) {//Declares SP either being equal to or below 0 keeping it above
    player0PercentSP = 0//sets player SP only being able to go to 0 not any lower
  } else if (player0PercentSP > 100) {//Declares SP being greater then 100
    player0PercentSP = 100//keeps it from enter above 100
  } else {//or
    player0PercentSP = player0PercentSP
  }

  //Makes sure Player1's SP is not greater than 100% or less than 0%
  if (player1PercentSP <= 0) {//Declares SP either being equal to or below 0 keeping it above
    player1PercentSP = 0//sets player SP only being able to go to 0 not any lower
  } else if (player1PercentSP > 100) {//Declares SP being greater then 100
    player1PercentSP = 100//keeps it from enter above 100
  } else {
    player1PercentSP = player1PercentSP
  }
  barsBox.innerHTML = ''
  barsBox.innerHTML += 'P0<div class="hpBar"><div style="height:' + player0PercentHP + '%; width: 100%;" id="p0HPfill" class="HPfill"></div></div>'
  barsBox.innerHTML += '<div class="spBar"><div style="height:' + player0PercentSP + '%; width: 100%;" id="p0SPfill" class="SPfill"></div></div>'
  barsBox.innerHTML += 'P1<div class="hpBar"><div style="height:' + player1PercentHP + '%; width: 100%;" id="p1HPfill" class="HPfill"></div></div>'
  barsBox.innerHTML += '<div class="spBar"><div style="height:' + player1PercentSP + '%; width: 100%;" id="p1SPfill" class="SPfill"></div></div>'
}

// EndTurn code
function endTurn() {
  playerTurn = !playerTurn
  if (kocheck(Player0, 0) || kocheck(Player1, 0)){
    hideControls();
  }
}

function hideContols() {
  controlsBox.innerHTML = "";
}






/*

MHW = 'delicious'

MHWoutput > MHWinput

*/
