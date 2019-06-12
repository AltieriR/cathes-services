var Student = require('./Student');
var express = require('express');

var router = express.Router();

router.post('/register', async function(req, res){
    try {
        console.log(req.body);
        var student = await Student.create(req.body);

        return res.send(student);
    } catch (e){
        //return res.statusCode(400);
        return res.status(400).send({error: 'Registration failed'});
    }
});

module.exports = (app) => app.use('/users/', router);