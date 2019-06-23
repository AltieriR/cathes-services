var path = require('path');
var Utils = require('./../utils/Utils.js');
var Student = require('./../model/student.js');
var Professor = require('./../model/professor.js');
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

app.post('/professor', async function (req, res) {
    var professor = Utils.getReqBody(Professor, req.body);

    professor.save(function (err) {
        if (err) {
            Utils.reqErrorHandling(err, 'Professor', res); //next()
        } else {
            res.status(200).send(professor.name + ' saved successfully!');
        }
    });
    console.log(professor);
});

app.post('/student', async function (req, res) {
    var student = Utils.getReqBody(Student, req.body);

    student.save(function (err) {
        if (err) {
            Utils.reqErrorHandling(err, 'Student', res); //next()
        } else {
            res.status(200).send(student.name + ' saved successfully!');
        }
    });
    console.log(student);
});

app.post('/equipment', async function (req, res) {
    //handle image
    //const { qrcode, title, image, description, campus, rentedBy, createdBy, createdAt, modifiedBy, modifiedAt } = req.body;
    var equipment = Utils.getReqBody(Equipment, req.body);

    equipment.save(function (err) {
        if (err) return console.log(err);
        res.status(200).send(equipment.title + ' saved successfully!');
    });
    console.log(equipment);
});

//res.redirect("/");
app.put('/equipment/:id', async function (req, res) {
    let id = req.params.id;
    var equipmentOutdated = await equipmentOutdated.find(id);
    const createdAt = Date.now();
    const returned = true;
    const { name, qrcode, campus, characteristics } = req.body;
    var equipment = new Equipment({ name, qrcode, campus, createdAt, returned, characteristics });
    Equipment.findByIdAndUpdate(req.params.id, function (req, res) {
        if (err) {
            res.status(400).send('Equipment not found!');
        } else {
            let history = { isStudent, responsible, equipment, campus, createdAt, returned, characteristics };

            history.save(function (err) {
                if (err) return console.log(err);
                res.status(200).send(student.name + ' saved successfully!');
            });
        }
    });

    equipment.update(function (err) {
        if (err) return console.log(err);
        res.status(200).send(student.name + ' updated successfully!');
    });
    console.log(equipment);
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