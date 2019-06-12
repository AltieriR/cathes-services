var mongoose = require('mongoose');

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
    additionalInfo : {
        type: String
    }
});

var Student = mongoose.model('Student', StudentSchema);

module.exports = Student;