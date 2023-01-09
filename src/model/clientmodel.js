const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({

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
    },
    height:{
        type: String,
        required: true
    },
    weight:{
        type: Number,
        required:true
    },
    Gender:{
        type: String,
        required: true,
        enum:["Male","Female","Others"]
    },
    goal:{
        type:String,
        required: true,
        enum:["gain-Weight" , "loose-Weight"],
    },
    age:{
        type: Number,
        required: true
    },
    foodCategory:{
        type: String,
        required:true,
        enum:["veg", "regular"]
    }
    

}, { timestamps: true });


module.exports = mongoose.model('client', clientSchema);