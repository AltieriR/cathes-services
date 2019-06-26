var express = require('express');
var Student = require('./../model/student.js');

var router = express.Router();

router.post('/register', async function(req, res){
    try {
        if(await Student.findOne({email})){
            return res.sendStatus(400).send({error: 'User already exists'});
        }
        console.log(req.body);
        var student = await Student.create(req.body);
        
        //Prevent password from being shown on the response 
        student.password = null;

        return res.send(student);
    } catch (e){
        return res.status(400).send({error: 'Registration failed'});
    }
});

router.get('/ts', async function(req, res){
    console.log('test');
    return res.status(200).send({error: 'Ok!'});
});

//Router for JWT
router.post('/login', async function(req, res){
    console.log("req received");
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    console.log("req received");
    console.log(email);

    var student = await Student.findOne({email}); //.select('password')
    if(!student){
        return res.status(400).send({error: 'This email is not registered!'});
    }
    if(!await bcrypt.compare(password, student.password)){
        return res.status(400).send({error: 'Password is wrong!'});
    }
    res.send({student});
});

module.exports = router;
//module.exports = app => app.use('/users', router);