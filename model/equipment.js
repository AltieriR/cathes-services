var mongoose = require('mongoose');

var EquipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    qrcode: {
        type: String,
        unique: true,
        require: true,
        select: false
    },
    campus: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    characteristics: {
        type: String
    },
});

EquipmentSchema.pre('save', async function(next){
    next();
});

var Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports = Equipment;