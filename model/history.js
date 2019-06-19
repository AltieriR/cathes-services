var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
    isStudent: {
        type: String,
        require: true
    },
    responsible: {
        type: Boolean,
        require: true
    },
    equipment: {
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
    returned: {
        type: Boolean,
        require: true
    },
    characteristics: {
        type: String
    },
});

HistorySchema.pre('save', async function(next){
    next();
});

var History = mongoose.model('History', HistorySchema);

module.exports = History;