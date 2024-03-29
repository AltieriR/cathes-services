const Utils = require('./../utils/Utils.js');
const Student = require('./../model/student.js');
const Professor = require('./../model/professor.js');
const Equipment = require('./../model/equipment.js');
const History = require('./../model/history.js');
const auth = require('./../controller/auth.js');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json());

//you can not post "nested object"
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static('images')); //'/images'

app.use(auth);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal error!');
});

const rejectFile = function (req, file, callback) {
    if (file.mimeType === 'image/jpg' || file.mimeType === 'image/png') {
        callback(new Error('Only jpg or png image types allowed'), true);
    } else {
        callback(null, false);
    }
};

const storageConfig = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './images/'); //err, path
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname.replace(/ /g, ''));
    }
});

const upload = multer({ storage: storageConfig });
/*
const upload = multer({
    storage: storageConfig,
    limits: {
        fileSize: (1024 * 1024) * 10 //10mb 
    }
});*/

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

app.post('/equipment', upload.single('image'), async function (req, res) {
    //handle image
    //const { qrcode, name, image, description, campus, rentedBy, createdBy, createdAt, modifiedBy, modifiedAt } = req.body;
    var equipment = Utils.getReqBody(Equipment, req.body);

    if (req.file) {
        console.log(req.file.originalname + " < path");
        equipment.image = req.file.path;
    } else {
        console.log('A equipment was saved without an image');
    }
    equipment.save(function (err) {
        if (err) return console.log(err.errmsg);
        console.log(equipment);
        res.status(200).send(equipment.name + ' saved successfully!');
    });
});

//res.redirect("/");
app.patch('/equipment/:id', async function (req, res) {
    let equipment = { name, image, description, campus, rentedBy, createdBy, createdAt, modifiedBy } = req.body;
    equipment.modifiedAt = Date.now();
    
    Equipment.findByIdAndUpdate(req.params.id, equipment, function (err, docs) {
        if (err) { //TODO handle different types of error
            res.status(400).send('Equipment not found!');
        } else {
            console.log(docs.name);
            //TODO Verify if the rent changed
            /*let history = Utils.getReqBody(History, req.body);

            history.save(function (err) {
                if (err) return console.log(err);
                //res.status(200).send(history.responsible + ' saved successfully!');
            });*/
            res.status(200).send(docs.name +' updated successfully!');
            //res.status(200).send(history.responsible + ' saved successfully!');
        }
    });

    /*equipment.update(function (err) {
        if (err) return console.log(err);
        res.status(200).send(student.name + ' updated successfully!');
    });*/
});

app.get('/equipment', async function (req, res) {
    var equipment = Equipment.find({}, function (err, docs) { //'name'
        if (err) return res.status(500).send('Internal error!');
        res.json(docs);
    });
    //.select('qrcode name')
    //console.log(equipment);
});

app.get('/student/:id', async function (req, res) {
    let id = req.params.id;
    var student = Student.findById(id, function (err, docs) { //'name'
        if (err) return res.status(500).send('Internal error!');
        res.json(docs);
    }).select(['-password']);
    //.select('qrcode name')
    //console.log(equipment);
});


app.listen(3000);

/*
        console.log('Request Type:', req.method)
        console.log('Request URL:', req.originalUrl)

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