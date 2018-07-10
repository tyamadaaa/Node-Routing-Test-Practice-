var express = require('express');
var app = express();

/**
 * @api {use} Error Handling
 * @apiName Error
 * @apiGroup Test
 */
app.use(function(err,req,res,next) {
    res.send(err)
    res.status(500).send();
});

/**
 * @api {get} / Request Test Route 
 * @apiName Get Homepage
 * @apiGroup Test
 * 
 * @apiSuccess {String} homepage gets homepage
 * 
 * @apiSuccessExample Success URL
 * {
 *  URL: '/'
 * }
 */
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

/**
 * @api {get} /contact Request Test Route
 * @apiName Get Contact
 * @apiGroup Test
 * 
 * @apiSuccess {String} contact gets contact
 * 
 * @apiSuccessExample Success URL
 * {
 *  URL: '/contact'
 * }
 */
app.get('/contact', function(req,res) {
    res.send('This is the contact page');
});

/**
 * @api {get} /contact/:name Request Test Route
 * @apiName Contact Page Internal Server Error
 * @apiGroup Test
 * 
 * @apiSuccess {String} contact error handling
 * 
 * @apiSuccessExample Success URL
 * {
 * URL: '/contact/name'
 * }
 */
app.get('/contact/:name', function (req,res) {
    try {
        if (req.params.name === 'name') {
            throw new Error();
        }
    } catch (err) { 
        res.status(err.status || 500)
        .send(err.message);
    }
});

/**
 * @api {get} /profile/anyname Request Test Route 
 * @apiName Get Name
 * @apiGroup Test
 * 
 * @apiSuccess {String} profile name
 * 
 * @apiSuccessExample Sucess URL
 * {
 *  URL: '/profile/name'
 * }
 */
app.get('/profile/:name', function(req,res) {
    res.send('This is a profile of ' + req.params.name);
});

/**
 * @api {get} /status/name Request Test Route
 * @apiName Return Data 
 * @apiGroup Test
 * 
 * @apiSuccess {String} staus name
 * 
 * @apiSuccessExample Success URL
 * {
 *  URL: '/status/name'
 * } 
 */
app.set('view engine', 'ejs');
app.set('views','./src/views');
app.get('/status/:name', function(req,res) {
    let data = {age: 29, job: 'programmer'};
    res.render('status', {person: req.params.name, data: data}); 
});

module.exports = app