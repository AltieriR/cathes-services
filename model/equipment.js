var mongoose = require('mongoose');

var EquipmentSchema = new mongoose.Schema({
    qrcode: {
        type: String, //type: mongoose.Schema.Types.ObjectId
        unique: true,
        require: true,
        select: false
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    campus: {
        type: String,
        require: true
    },
    rentedBy: {
        type: String,
        require: true
    },
    createdBy: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedBy: {
        type: String,
        require: true
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    },
});

/*EquipmentSchema.pre('save', async function(next){
    next();
});*/

var Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports = Equipment;