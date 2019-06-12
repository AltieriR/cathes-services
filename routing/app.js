var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var test = require('./controller/auth.js')(app);//.


app.use(bodyParser.json());
//you can not post "nested object"
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal error!');
});

app.listen(3000);

app.use('/user/:id', function (req, res, next) {
    console.log('Request Type:', req.method)
    next();
},
    function (req, res, next) {

        console.log('Request Type:', req.method)
        console.log('Request URL:', req.originalUrl)
        res.send('USER');
        next();
    });
    
/*

//module.exports = app;

//res.redirect('/users');

//app.use('/coverup', express.static('public'));
//app.use(express.static('public'));

app.use('/user/:id', function (req, res, next) {
console.log('Request URL:', req.originalUrl)
next();
}, function (req, res, next) {
console.log('Request Type:', req.method)
next();
});

var myLogger = function (req, res, next) {
console.log('LOGGED');
next();
};

app.use(myLogger);


app.use(function (err, req, res, next) {
console.error(err.stack);
res.status(500).send('Internal error!');
});

app.get('/', function (req, res) {
res.send('Hello World!');
});



app.route('/user')
.get(function (req, res) {
    res.send('Get user');
})
.post(function (req, res) {
    res.send('Add user');
})
.put(function (req, res) {
    res.send('Update user');
});


app.get('/', function (req, res) {
    res.send('Root path find out!');
});

app.get('/public/', function (req, res) {
    //res.send('You just got access to the catolica university logo!');
    app.use(express.static('public'));
    res.sendFile('logo_256x256.png', { root: path.join(__dirname, '../public/img') });
});

app.listen(3000, function () {
    console.log('Request received. Still listening at port 3000');
});

app.get('/get', function (req, res) {
    console.log('Getting at /get');
    //res.sendStatus(200);
    res.json({ "greeting": "welcome foo!" });
    //res.sendFile(path.join(__dirname, '../', 'test.html'));
    //res.sendFile('test.html', { root: path.join(__dirname, '../') });
    //res.sendFile(path.resolve('test.html'));
});

*/