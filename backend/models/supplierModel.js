const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    cnic: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    vehicleNo: {
        type: String,
        required: true,
    },
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
