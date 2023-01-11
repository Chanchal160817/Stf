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

// const isValidNumber = function (value) {
//     const noNumber = /^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/g
//     if (typeof value !== 'string') return false
//     if (noNumber.test(value) === false) return false
//     return true
// }

function validNumber(phone){
    return /^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/.test(phone)
}

const isValid = function (value) {
    
    if (typeof value === "undefined" || typeof value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidDigit=function(value) {
    return /^\d+$/.test(value)
} 

module.exports = {isEmail , isValidPassword , isValidObjectId , validNumber, isValid , isValidDigit}