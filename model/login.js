var mongoose = require('./../database/config.js');
const bcrypt = require('bcryptjs');

var LoginSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    lastLogin: {
        deviceInfo: {
            id: {
                type: String,
                require: true,
            }
        },
        log: {
            type: Date,
            default: Date.now
        }
    },
    preferences: {
        locale: String,
        newsletter: Boolean
    },
    deviceInfo: [{
        deviceId: {
            type: String,
            require: true,
        },
        device: {
            system: String,
            complement: String,
        },
        locale: {
            country: String,
            language: String
        }
    }]
});

LoginSchema.pre('save', async function(next){
    //params: tuple, encryption rounding times
    var hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

var Login = mongoose.model('Login', LoginSchema);

module.exports = Login;