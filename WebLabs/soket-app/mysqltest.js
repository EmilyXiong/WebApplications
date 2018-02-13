#!/usr/bin/nodejs

// INITIALIZATION STUFF
var express = require('express')
var app = express();
var mysql = require('mysql');

var fs = require('fs');
var hbs = require('hbs');
hbs.Handlebars = require('handlebars');

// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM
app.set('port', process.env.PORT || 8080 );

app.set('view engine', 'hbs');

var game_hbs = compile_handlebars('mySQLtest.hbs');

var connection = mysql.createConnection({
  database : 'site_2019exiong',
  host     : 'mysql1.csl.tjhsst.edu',
  port     : 3306,
  user     : 'site_2019exiong',
  password : 'zaeSj3WUFm9LwFnRfJeWpvEe'
});

connection.connect();

connection.query('SELECT * FROM students', function (error, results, fields) {
  if (error) throw error;
  console.log('Results has this many entries:', results.length);
  console.log('------------------------------');
  console.log('The first entry is:', results[0]);
  console.log('------------------------------');
  console.log('The keys of the first entry are:', Object.keys(results[0]));
  console.log('------------------------------');
  console.log('The entire query is: ', results);
  console.log('------------------------------');
});

connection.end();

// -------------- export functions -------------- //
app.get('/', function(req, res){
    res.render('mySQLtest');
});

app.get('/renewedPage', function(req, res){
    connection.connect();

connection.query('SELECT * FROM students', function (error, results, fields) {
  if (error) throw error;
  res.send('Results has this many entries:', results.length);
  console.log('------------------------------');
  console.log('The first entry is:', results[0]);
  console.log('------------------------------');
  console.log('The keys of the first entry are:', Object.keys(results[0]));
  console.log('------------------------------');
  console.log('The entire query is: ', results);
  console.log('------------------------------');
});

connection.end();
});




// // -------------- listener -------------- //
var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});