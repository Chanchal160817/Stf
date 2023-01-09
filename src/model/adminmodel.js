const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        uppercase : true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique : true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
    

}, { timestamps: true });


module.exports = mongoose.model('admin', adminSchema);