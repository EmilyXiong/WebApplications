#!/usr/bin/nodejs

// -------------- load packages -------------- //
var cookieSession = require('cookie-session');
var express = require('express');
var simpleoauth2 = require("simple-oauth2");
var app = express();
var request = require('request');
var mysql = require('mysql');

var fs = require('fs');
var hbs = require('hbs');
hbs.Handlebars = require('handlebars');

// -------------- express initialization -------------- //

// PORT SETUP
app.set('port', process.env.PORT || 8080 );
app.set('view engine', 'hbs');

var connection = mysql.createConnection({
  database : 'site_2019exiong',
  host     : 'mysql1.csl.tjhsst.edu',
  port     : 3306,
  user     : 'site_2019exiong',
  password : 'zaeSj3WUFm9LwFnRfJeWpvEe'
});

var pet_counts = "";

connection.connect();

// SO THAT EXPRESS KNOWS IT IS SITTING BEHIND A PROXY
app.set('trust proxy', 1); // trust first proxy 

app.use(cookieSession({
  name: 'session',
  keys: ['SuperDuperSecret1', 'key12233456']
}));

app.use(express.static(__dirname + '/css'));

// -------------- variable initialization -------------- //

// OAUTH2 Stuff
var ion_client_id = 'ai8Wmbyryb2zdO3vRa0KXpr1VQi0TXXJIsgT7ISh';
var ion_client_secret = 'qLJ94GbOZy5ewgZNeTMeCyihowGxYhkVStKhCIgLDeQwhtqBYXHQLrlmCOOsrijZf8THVXbjRCZ3j65a7GE5GkLvZCvO9ex4LSBy5q1E8GeUDt0ERbJTxY6RQBRvjEp9';
var ion_redirect_uri = 'https://user.tjhsst.edu/2019exiong/login/';
var student_client = {};
var thisStudent = '';

var oauth2 = simpleoauth2.create({
  client: {
    id: ion_client_id,
    secret: ion_client_secret,
  },
  auth: {
    tokenHost: 'https://ion.tjhsst.edu/oauth/',
    authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
    tokenPath: 'https://ion.tjhsst.edu/oauth/token/'
  }
});

// Authorization uri definition
var authorizationUri = oauth2.authorizationCode.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri
});

// handlebars compiled 
var index_hbs = compile_handlebars('index');
var game_hbs = compile_handlebars('petGame');
var page_hbs = compile_handlebars('petPage');
var room_hbs = compile_handlebars('petRoom');
var store_hbs = compile_handlebars('petStore');
// -------------- express listener -------------- //

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express Server Started on Port: '+listener.address().port );
});

// -------------- express getters -------------- //

app.get('/', function (req, res, next) {
    // Update or initialize number of visits tracked by cookie
    req.session.views = (req.session.views || 0) + 1;
    
    if (typeof req.session.token !== 'undefined') {
        // IF THE USER HAS LOGGED IN!
        var access_token = req.session.token.token.access_token;
        console.log(access_token);
        thisStudent = access_token;
        student_client = {access_token : ''};
        // ASK ION FOR THE USER NAME
        request.get({url:'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token}, function (e, r, body) {
            console.log('AS STRING:' + body);

            var res_object = JSON.parse(body);
            console.log('AS OBJECT:' + res_object);
        
            // get the user name
            user_name = res_object['short_name'];
            full_user_name = res_object['full_name'];
            student_id = res_object['id'];
            student_client[access_token] = student_id
            //check if the user has already registered in the system otherwise, create the user in the system
            var sql = 'select * from students where student_id=' + student_id;
            newUser = connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                var rows = JSON.parse(JSON.stringify(results));
                if (rows.length === 0){
                    //This is a new user and we need to add to students table
                    insertstudent(req, res, user_name, full_user_name, student_id, render_room);
                }
                else{
                    render_room(req, res, user_name, full_user_name, student_id, "no");
                }
            });
        });
        
    } else {
        // NOT LOGGED IN YET
        user_name = 'NEW USER';
        full_user_name = 'NEW USER';
        student_id = '';
        render_page(req, res, user_name, full_user_name, student_id);
        //render_page(req, res, user_name);
    }

});

app.get('/petRoom', function(req, res){
    var student_id = req.query.student_id;
    var user_name = req.query.user_name;
    var full_user_name = req.query.full_user_name;
    
    render_petRoom(req, res, user_name, full_user_name, student_id);
});


app.get('/getPetCounts', function(req, res){
    
    var student_id = req.query.student_id;
    var sql = 'select pets.pet_name, student_pets.count from student_pets , pets where student_pets.pet_name=pets.pet_name and student_id=' + student_id;

    var pet_counts = connection.query(sql , function (error, results, fields) {
        if (error) throw error;
        var pets = JSON.stringify(results);
        res.send(pets);
    });
});

app.get('/petStore', function(req, res){
    var student_id = req.query.student_id;
    var user_name = req.query.user_name;
    var full_user_name = req.query.full_user_name;
    
    render_petStore(req, res, user_name, full_user_name, student_id);
});

app.get('/getMoneyBalance', function(req, res){
    
    var student_id = req.query.student_id;
    var sql = 'select money from students where student_id=' + student_id;

    var pet_counts = connection.query(sql , function (error, results, fields) {
        if (error) throw error;
        var money = JSON.stringify(results);
        res.send(money);
    });
});

app.get('/updatePetCount', function(req, res){
    
    var student_id = req.query.student_id;
    var pet_name = req.query.pet_name;
    var count = req.query.count;
    var action = req.query.action;
    var sql = "";
    if (action == "update"){
        sql = "update student_pets set  count = " + count + " where student_id = "  + student_id + " and pet_name='" + pet_name + "'";
    }
    else{
        sql = "insert into student_pets values(" + student_id + ",'" + pet_name +"'," + count + ")";
    }
    console.log(sql);
    connection.query(sql , function (error, results, fields) {
        if (error) throw error;
        var isDone = JSON.stringify(results);
        res.send(isDone);
    });
});

app.get('/updateBalance', function(req, res){
    
    var student_id = req.query.student_id;
    var balance = req.query.balance;
    var sql = "update students set money=" + balance + " where student_id = "  + student_id ;
    connection.query(sql , function (error, results, fields) {
        if (error) throw error;
        var isDone = JSON.stringify(results);
        res.send(isDone);
    });
});

// -------------- intermediary login helper -------------- //
app.get('/login', function (req, res, next) {
    
    // THIS PAGE WAS CALLED WITH A GET PARAMETER 'code' BY OUR OAUTH HOST
    var theCode = req.query.code; 
    
    // Construct options that will be used to generate a login token
    var options = {
        code: theCode,
        redirect_uri: ion_redirect_uri
     };

    // ASYNCHRONOUSLY REQUEST A TOKEN FROM THE SERVER
    oauth2.authorizationCode.getToken(options, function (error, result) {
        if (error) {
            console.log(error);
            return res.json('Authentication failed');
        }

        // TURN THE RESULT INTO A TOKEN
        var token = oauth2.accessToken.create(result);
        console.log("unique id = "+ token);
        
        // ATTACH THE TOKEN TO OUR COOKIE SESSION
        req.session.token = token;
        // console.log(req.session.token);

        // DEBUG <<and massively insecurely>> display this token to the user 
        // return res.json(token);

        // Redirect authenticated user home
        res.redirect('https://user.tjhsst.edu/2019exiong/');
    });
         
});

// -------------- render helper -------------- //
function render_page(req, res, user_name, full_user_name, student_id) {
    var context = { user : user_name,
                    fullname: full_user_name,
                    times : req.session.views,
                    login_link : authorizationUri, 
                    sID : student_id};

    var htmlOutputString = index_hbs.run(context);
    res.send(htmlOutputString);    
}

function render_game(req, res, user_name, full_user_name, student_id) {
    var context = { user : user_name,
                    fullname: full_user_name,
                    times : req.session.views,
                    sID : student_id};

    var htmlOutputString = game_hbs.run(context);
    res.send(htmlOutputString);    
}

function render_room(req, res, user_name, full_user_name, student_id, new_user) {
    var timeInfo = "";
    if (new_user == 'yes'){
        timeInfo = " Welcome to your pet home for the FIRST time ! ";
        statusMsg = "We have made a beautiful room for you and also deposited $1,000 to your accounts.";
    }
    else{
        timeInfo = " Welcome BACK to your pet home again ! ";
        statusMsg = "Your pets are all waiting for you in your room.";
    }
    var context = { user : user_name,
                    fullname: full_user_name,
                    times : req.session.views,
                    sID : student_id,
                    timesinfo: timeInfo,
                    statusMsg: statusMsg
                };  

    var htmlOutputString = page_hbs.run(context);
    res.send(htmlOutputString);    
}

function render_petRoom(req, res, user_name, full_user_name, student_id) {
    
    var context = { user : user_name,
                    fullname: full_user_name,
                    times : req.session.views,
                    sID : student_id
                };

    var htmlOutputString = room_hbs.run(context);
    res.send(htmlOutputString);    
}

function render_petStore(req, res, user_name, full_user_name, student_id) {
    
    var context = { user : user_name,
                    fullname: full_user_name,
                    times : req.session.views,
                    sID : student_id
                };

    var htmlOutputString = store_hbs.run(context);
    res.send(htmlOutputString);    
}

// -------------- handlebars functions -------------- //
function compile_handlebars(f_name) {
	template = {};
	template['run'] = hbs.Handlebars.compile(
			read_file_sync(f_name)
		);
	return template;
}


function read_file_sync(f_name) {
	return fs.readFileSync(__dirname + '/views/'+f_name+'.hbs').toString();
}

function insertstudent(req, res, user_name, full_user_name, student_id, render_room){
    var sql = "insert into students values(" + student_id + ", '" + full_user_name + "', '" + user_name + "', 1000)";
    console.log('sql = ' + sql);
    connection.query(sql, function(err) {
        if (err) throw err;
        render_room(req, res, user_name, full_user_name, student_id, "yes");
    });
}








