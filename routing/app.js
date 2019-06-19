var path = require('path');
var Student = require('./../model/student.js');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
//require('./../controller/auth.js')(app);

app.use(bodyParser.json());

//you can not post "nested object"
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal error!');
});

app.get('/register/professor', async function (req, res) {
    const noww = Date.now();
    const { name, email, password, createdAt, additionalInfo } = req.body;

    var professor = new Student({ name, email, password, createdAt, additionalInfo });

    professor.save(function (err) {
        if (err) return console.log(err);
        res.status(200).send(professor.name + ' saved successfully!');
    });
    console.log(professor);
});

app.get('/register/student', async function (req, res) {
    const noww = Date.now();
    const { name, email, password, createdAt, additionalInfo } = req.body;

    var student = new Student({ name, email, password, createdAt, additionalInfo });

    student.save(function (err) {
        if (err) return console.log(err);
        res.status(200).send(student.name + ' saved successfully!');
    });
    console.log(student);
});

app.listen(3000);

/*
    //var student = await Student.findOne({email:'test@outlook.com'});
    app.use('/user/:id', function (req, res, next) {
        let id = req.params.id;
        console.log('Request Type:', req.method)
        next();
    },
    function (req, res, next) {
        console.log('Request Type:', req.method)
        console.log('Request URL:', req.originalUrl)
        res.send('USER');
        next();
    });

app.use('/user/:id', function (req, res, next) {
let id = req.params.id;
console.log('Request URL:', req.originalUrl)
next();
}, function (req, res, next) {
console.log('Request Type:', req.method)
next();
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

app.get('/public/', function (req, res) {
    //res.send('You just got access to the catolica university logo!');
    app.use(express.static('public'));
    res.sendFile('logo_256x256.png', { root: path.join(__dirname, '../public/img') });
});

app.get('/get', function (req, res) {
    console.log('Getting at /get');
    //res.sendFile('test.html', { root: path.join(__dirname, '../') });
});

*/