const ClientModel = require("../model/clientmodel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {isEmail , isValidPassword , isValidObjectId} = require('../middleware/validation')

/*******************Create Clien**************/

const createClient = async(req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})
    }
}

/**********************Log-in clien*************/
const loginClient = async(req, res)=>{
    try {
        
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})
    }
}

module.exports = {createClient, loginClient}