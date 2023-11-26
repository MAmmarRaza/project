const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    report: {
        type: String,
        required: true,
        unique: true,
    },
    products: {
        type: Array,
        required: true,
    },
    created_at: {
        type: Date,
        default:Date.now()
    }
});

const Report = mongoose.model('report', reportSchema);

module.exports = Report;
