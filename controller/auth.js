const express = require('express');
const Student = require('./../model/student.js');
const Login = require('./../model/login.js');
const Utils = require('./../utils/Utils.js');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/register', async function (req, res) {
    const { login, password } = req.body;
    if (await Login.findOne({ login })) {
        return res.status(400).send({ error: 'User already exists' });
    } else {
        let user = Utils.getReqBody(Login, req.body);
        user.save(function (err, docs) {
            if (err) {
                console.log(err);
                Utils.reqErrorHandling(err, 'User', res);
                //return res.status(400).send({ error: 'Internal error' });
            } else {
                //Prevent password from being shown on the response 
                user.password = null;
                return res.send(user);
            }
        });
    }
});

router.post('/login', async function (req, res) {
    
    console.log(req.body.email);
    let email = req.body.email;
    let password = req.body.password;

    let login = await Login.findOne({ email: email }); //.select('password')
    if (!login) {
        return res.status(400).send({ error: 'This email is not registered!' });
    }

    if (await bcrypt.compare(password, login.password)) {
        return res.status(200).send('Successfully logged in');
    } else {
        return res.status(400).send({ error: 'Password is wrong!' });
    }
});

//Router for JWT
router.post('/loginjwt', async function (req, res) {
    console.log("req received");
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    console.log("req received");
    console.log(email);

    var student = await Student.findOne({ email }); //.select('password')
    if (!student) {
        return res.status(400).send({ error: 'This email is not registered!' });
    }
    if (!await bcrypt.compare(password, student.password)) {
        return res.status(400).send({ error: 'Password is wrong!' });
    }
    res.send({ student });
});

module.exports = router;
//module.exports = app => app.use('/users', router);