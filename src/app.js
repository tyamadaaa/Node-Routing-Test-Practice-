var express = require('express');
var app = express();

//To return a html page named index.html
app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

//Message will appear: type /contact in the url
app.get('/contact', function(req,res){
    res.send('This is the contact page');
});

//Name will appear: type /profile/anyname in the url
app.get('/profile/:name', function(req,res){
    res.send('You requested to see a profile with the name of ' + req.params.name);
});

//An example of using ejs
app.set('view engine', 'ejs');

//Data below appears: type /status/name
app.get('/status/:name', function(req,res){
    let data = {age: 29, job: 'programmer'};
    res.render('status', {person: req.params.name, data: data}); 
});

module.exports = app