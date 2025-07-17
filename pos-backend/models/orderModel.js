const mongoose = require ("mongoose");

const orderSchema = new mongoose.Schema({
    customerDetails: {
        Name:{ type: String, required: true},
        ID:{ type: String, required: true},
    },
    orderStatus: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    bills: {
        total: {type: Number, required: true},
        tax: {type: Number, required: true},
        totalWithTax: {type: Number, required: true},
    },
    items: []
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);