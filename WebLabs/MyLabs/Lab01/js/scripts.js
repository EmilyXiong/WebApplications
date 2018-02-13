var thisState='';
var thisStateIndex = 0;
var enteredIndex = [];

var corrctAnswers=[];
var wrongAnswers = [];
var reasonMessage ='';
var timer =0;
var pause = true;
var myTimer = setInterval(countTime, 1000);

function startGame(){
    document.getElementById('startDiv').style.display = "block";
    thisStateIndex = Math.floor(Math.random()*50);
    thisState = states[thisStateIndex].name;

    while(corrctAnswers.indexOf(thisState) != -1 || wrongAnswers.indexOf(thisState) != -1){
        thisStateIndex = Math.floor(Math.random()*50);
        thisState = states[thisStateIndex].name;
    }
    enteredIndex = [];
    reasonMessage='';
    
    console.log("This state is" , thisState)
    str = "Name all states that border:     "
    var result = str.fontcolor("black");
    document.getElementById('startDiv').innerHTML = result + thisState.fontcolor("red");
    document.getElementById('stateInput').value = "";
    document.getElementById('startButton').innerHTML = "Select Next State";
    index = findStateByName(thisState);
    var borderStates = borders[index];
    var count = borderStates.length;
    var b_states = '';
    for(var i = 0; i <count; i++){
        b_states = b_states + states[borderStates[i]].name + ", ";
    }
    if(b_states == ''){
    		b_states = 'There is no bordering state.';
    }
    
    document.getElementById('correctAnswers').style.display = "none";
    document.getElementById('correctStates').innerHTML = b_states;
    console.log("correct states are: ", b_states);
    document.getElementById('enteredStates').innerHTML = "";
    document.getElementById('message').innerHTML = "";
    
    document.getElementById("submitAnswer").disabled = false;
	document.getElementById("stateInput").disabled = false;
	document.getElementById("tip").disabled = false;
	
	document.getElementById('timerDiv').style.display = "block";
	timer = 61 * 1000;
	pause = false;
}

function checkBorder(){
	inStr = document.getElementById("stateInput").value;
	if (inStr.trim() !== ''){
		document.getElementById('stateInput').value = "";
		checkStates(inStr);
	}
	
    if(enteredIndex.length === 0){
        if(thisStateIndex == 48 || thisStateIndex == 49){
        		startOver(true);
        }
        return;
    }
    
    enteredIndex.sort(function(a,b) { return a - b; });
    answer = borders[thisStateIndex].sort(function(a,b) { return a - b; });
    console.log("enteredIndex is ", enteredIndex, "while my answer is", answer);
    if(enteredIndex.length > answer.length){
        reasonMessage = "There are less than " + enteredIndex.length + " states bordering " + thisState + ".";
    }
    else if (enteredIndex.length < answer.length){
    		reasonMessage  = "There are more than " + enteredIndex.length + " states bordering " + thisState + ".";
    }
    
    if(enteredIndex.length != answer.length){
    		startOver(false);
    		return;
    }
	
    for (var i = 0; i < enteredIndex.length; i++){
        if(enteredIndex[i] != answer[i]){
            reasonMessage = "One or more states are not border states of " + thisState + ".";
            startOver(false);
            return;
        }
    }
    startOver(true);
}

function findStateByName(name){
    for (var i = 0; i < 50; i++){
        if(name.toUpperCase() == states[i].name.toUpperCase()
           || name.toUpperCase() == states[i].abbreviation.toUpperCase()){
            return i;
        }
    }
    return -1;
}

function endGame(){
    document.getElementById('playGame').style.display = "none";
    document.getElementById('gameOver').style.display = "block";
}

function checkState(event){
    if(event.keyCode == 13){
        inStr = document.getElementById("stateInput").value;
        if(inStr.trim() !== ''){
            document.getElementById('stateInput').value = "";
            checkStates(inStr);
        }
    }
}

function checkStates(inStates){
	var enteredStates = inStates.split(",");
    for(var j = 0; j < enteredStates.length; j++){
        var state = enteredStates[j].trim();
        var stateIndex = findStateByName(state);
        if (stateIndex == -1){
        		reasonMessage = state.fontcolor("red")  + " --  this is an invalid state name. ";
        		startOver(false);
        		return;
        }
        else{
        		var found = false;
			for (var i = 0; i< enteredIndex.length; i++){
				if(enteredIndex[i] == stateIndex){
					found = true;
					break;
				}
			}
			if(!found){
				enteredIndex.push(stateIndex);
				oldStr = document.getElementById('enteredStates').innerHTML;
				document.getElementById('enteredStates').innerHTML = oldStr + states[stateIndex].name.fontcolor("green") + ", " ;
			}
        }
    }
}

function startOver(wasIAtWin){
	
	document.getElementById("submitAnswer").disabled = true;
	document.getElementById("stateInput").disabled = true;
	pause = true;
	
	if (wasIAtWin){
		corrctAnswers.push(thisState);
		document.getElementById('message').innerHTML = "Congragulations!!! you have won this state ".fontcolor("green") + 
													"<br>Next Action:  Please select next state. Good Luck!";
	}
	else{
		wrongAnswers.push(thisState)
		document.getElementById('correctAnswers').style.display = "block";
		document.getElementById('message').innerHTML = "Sorry!!! you have lost this state ".fontcolor("red") + 
								"<br>Reason: " + reasonMessage +
								"<br>Next Action:  Please select next state. Good Luck!";
	}
	
	var winStates = '';
	for (var i = 0; i < corrctAnswers.length; i++){
		winStates = winStates + corrctAnswers[i] + ", ";
	}
	var lostStates = '';
	for (var i = 0; i < wrongAnswers.length; i++){
		lostStates = lostStates + wrongAnswers[i] + ", ";
	}
	
	document.getElementById('totalCount').innerHTML =  "" + (corrctAnswers.length + wrongAnswers.length);
	document.getElementById('totalWon').innerHTML = "" + corrctAnswers.length;
	document.getElementById('totalLost').innerHTML =  "" + wrongAnswers.length;
	document.getElementById('resultWonStates').innerHTML = ""+ winStates.fontcolor("green");
	document.getElementById('resultLostStates').innerHTML = "" + lostStates.fontcolor("red");
	
}

function ShowHint()
{
	var el = document.createElement("div");
	 el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
	 var mesg = "State " + thisState + " has " +  borders[thisStateIndex].length + " bordering states.";
	 el.innerHTML = mesg.fontcolor("red");
	 setTimeout(function(){
	  el.parentNode.removeChild(el);
	 },2000);
	 document.body.appendChild(el);
}

function countTime(){
	if (pause != true){
		timer = timer - 1000;
		if(timer <= -1){
			reasonMessage = "Time expired! Please do it a little quicker next time.";
			startOver(false);
		}
		else{
			var timeRemaining = "Time remaining:&nbsp;&nbsp;".fontcolor("black") + ("" + timer/1000).fontcolor("green") + "&nbsp;&nbsp;&nbsp;secs.".fontcolor("black");
			document.getElementById("timerDiv").innerHTML = timeRemaining;
		}
	}	
}




