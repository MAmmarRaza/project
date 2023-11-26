const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define a MongoDB schema for your data
const productSchema = new Schema({
    dc_name: String,
    sku_id: String,
    sku_name: String,
    brand: String,
    category: String,
    date_pkt: Date,
    created_at: Date,
    type: String,
    quantity: Number,
    pp: Number,
    inventory_value: Number,
    notes: String,
    code: String,
    expiry: Date,
    requester_email: String,
    requester_name: String,
});

// Create a model based on the schema
module.exports = mongoose.model('product', productSchema);