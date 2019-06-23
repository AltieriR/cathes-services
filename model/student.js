var mongoose = require('./../database/config.js');
var bcrypt = require('bcryptjs');

var StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        unique: true,
        require: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    myItems: [{
        item: {
            itemKey: String, //QR Code / Id
            rentedAt: Date,
            rentedUntil: Date,
        }
    }],
    additionalInfo: {
        type: String
    }
});

/*
StudentSchema.pre('save', async function(next){
    //params: object tuple, encryption rounding times
    var hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});*/

var Student = mongoose.model('Student', StudentSchema);

module.exports = Student;