#!/usr/bin/nodejs

// INITIALIZATION STUFF
var express = require('express');
http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM
server.listen(process.env.PORT || 8080);

// -------------- express getter -------------- //
app.get('/', function (req, res, next) {
    res.sendFile(__dirname+'/index.html');
});

// -------------- variables -------------- //
var x = 0;
var id_score = {}; 		// socket id to game score map
var id_rooms = {};		// id to game room map
var game_rooms = {};		// game room to socket id map
var user_names = {};		// id to user name map
var ret_rooms = {};		// id to room name map
var currentNumber = {}; // id to game number map

// -------------- socket initialization -------------- //

io.on('connection',function(socket){
    
    // log to the local server file
    console.log('a connection from user: ' + socket.id);
    x += 1;
    
    socket.on('list_all_users', function(data){
        console.log( Object.keys(io.sockets.sockets) );
    });
    
    socket.on('guess', function(data) {
        console.log('NEW SOCKET INFO');
        console.log(data);
        answerGuess(socket, data);
    });
    
    socket.on('make_user_name', function(data){
        make_user(socket,data);
    });
    
    socket.on('join_secret_room', function(data){
        join_room(socket,data);
    });
    
    socket.on('list_all_rooms', function(data){
        list_all_rooms(socket, data);
    });
    
    socket.on('list_users_by_room', function(data){
    		list_users_by_room(socket, data);
    })
    
    socket.on('list_game_status', function(data){
    		list_game_status(socket, data);
    })
});


// -------------- socket functions -------------- //
function make_user(socket, user_name) {
    console.log("New user: ", user_name);
    if(user_names.hasOwnProperty(socket.id)){
        console.log("you already have this user");
    }
    else{
        user_names[socket.id] = user_name;
        id_score[socket.id] = 0;
        currentNumber[socket.id] = 5;
    }
    console.log(user_names);
    
}

function join_room(socket, room_name) {
    console.log("ret_rooms", ret_rooms);
    console.log("room_name", room_name);
    
    var name = user_names[socket.id];
    if(name === null){
        name = "User" + x;
        user_names[socket.id] = name;
    }
    console.log(name);
    if (game_rooms.hasOwnProperty(room_name) && game_rooms[room_name].indexOf(socket.id) == -1) {
            game_rooms[room_name].push(socket.id);
            id_rooms[socket.id] = room_name;
            ret_rooms[room_name].push(name);
            console.log("no same ids");
    } 
    else if(game_rooms.hasOwnProperty(room_name) && game_rooms[room_name].indexOf(socket.id) != -1){
        console.log("same ids, don't add to room");
    }
    else{
    		// This is a new room
        game_rooms[room_name] = [socket.id]; // room to id map
        ret_rooms[room_name] = [name];  //room to user name map
        id_rooms[socket.id] = room_name;
    }    

    console.log(game_rooms);
    console.log(ret_rooms);
    socket.join(room_name);
}

function list_all_rooms(socket, data) {
	console.log("list_all_rooms message received!");

	var ret  = [];
    for (var room in ret_rooms){
    		ret.push(room)
    }
    console.log("sending back data =" + ret);
    if(data === 'listSecretRooms'){
    		console.log("From List Secret Rooms Buutton!");
    		socket.emit('all_rooms', ret);
    }
    else if (data === 'listUserByRoom'){
    		console.log("From List Users By Room Button!");
    		socket.emit('all_rooms_by_user', ret);
    }
    else{
    		console.log("From Refresh Room List Button!");
		socket.emit('refresh_room_list', ret);
    }
}

function answerGuess(socket, data){
	if( id_rooms.hasOwnProperty(socket.id) && user_names.hasOwnProperty(socket.id)){
		var newNumber = Math.floor((Math.random() * 9) + 1);
	    while (newNumber == currentNumber[socket.id]){
	        newNumber = Math.floor((Math.random() * 9) + 1);
	    }
	    if ((newNumber > currentNumber[socket.id] && data == "high") ||
	    		(newNumber < currentNumber[socket.id] && data == "low")){
	        id_score[socket.id] = id_score[socket.id] + 1;
	        socket.emit('answer', {"number":newNumber, "guess":"True", "score": id_score[socket.id]});
	    }
	    else{
	        socket.emit('answer', {"number":newNumber, "guess":"False", "score": id_score[socket.id]});
	    }
	    currentNumber[socket.id] = newNumber;
	}
	else{
		socket.emit('login_needed', "Please login to a room first using your user name to play the game.");
	}   
}

function list_users_by_room(socket, data){
	console.log("list_users_by_room received for room " + data);
	var userList = ret_rooms[data];
    socket.emit('all_users_by_room', userList);
    console.log("sending back data =" + userList);
}

function list_game_status(socket, data){
	
//	var id_score = {}; 		// socket id to game score map
//	var id_rooms = {};		// id to game room map
//	var game_rooms = {};		// game room to socket id map
//	var user_names = {};		// id to user name map
//	var ret_rooms = {};		// id to room name map
//	var currentNumber = {}; // id to game number map
	
	var ret = [];
	
	console.log("list_game_status message received!");
	
	var socketId_list = game_rooms[data];
	for (var index in socketId_list){
		id = socketId_list[index];
		user = user_names[id];
		score = id_score[id];
		var gameScore =  {
			"user": user,
			"score": score
		}
		ret.push(gameScore)
	}
	
	console.log("list_game_status sending back: " +JSON.stringify(ret));
	socket.emit('game_status_by_room', ret);
}
