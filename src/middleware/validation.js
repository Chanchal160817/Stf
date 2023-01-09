const mongoose = require('mongoose');

function isEmail(email){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    return regex.test(email);
}

function isValidPassword(password){
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password)
}

function isValidObjectId(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId);
}
module.exports = {isEmail , isValidPassword , isValidObjectId}