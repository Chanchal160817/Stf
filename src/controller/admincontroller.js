const AdminModel = require('../model/adminmodel');
const mongoose = require('mongoose');
const {isEmail , isValidPassword} = require('../middleware/validation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/*******************Creating Admins************/
const createAdmin = async (req , res) =>{
    try {
        let data = req.body;

        if(Object.keys(data).length == 0)
        return res.status(400).send({status: false, message : "Please provide following details."})

        let {name, email, phone, password} = data

        // let securePassword = await bcrypt.hash(password , 10);

        if(!name || !email || !password || !phone) 
        return res.status(400).send({status : false, message : "Please provide the credentials. "})

        //--------email and password validation------
        if(!isEmail(email) || !isValidPassword(password)) return res.status(400).send({status: false, message:"Please check your email and password."})

        let uniqueEmail = await AdminModel.findOne({email : email});
        if(uniqueEmail) return res.status(400).send({satus: false, message : "Email already exist. Please recheck."})

        let uniquePhone = await AdminModel.findOne({phone : phone})
        if(uniquePhone) return res.status(400).send({status : false , message : "phone number already exist. Please retry."})
        
        let registerAdmin = {
            name : name,
            email : email,
            password : password,
            phone : phone
        };

        let newAdmin = await AdminModel.create(registerAdmin);

        return res.status(201).send({status : true , message : "Register Created successfully." , data : newAdmin})

    } catch (error) {
        return res.status(500).send({status : false , message : error.message})
    }
}

/********************Log-in Admin*****************/
const loginAdmin = async function(req, res){
    try {
        let data = req.body;

    if(Object.keys(data).length == 0) 
    return res.status(400).send({status : false , message : "Please provide the credentials."});

    const{email , password }= data;

    if(!email || !password) return res.status(400).send({status : false , message : "Please provide EmailId and password."});

    if(!isEmail(email) || !isValidPassword(password)) return res.status(400).send({status: false , message: "Please provide the valid Email and password."});

    let AdminExists = await AdminModel.findOne({email : email})
    if(!AdminExists) return res.status(404).send({status: false , message: "Failed! No data found."});

    let createToken = jwt.sign({
        adminId : AdminExists._id.toString()
    },"STF-secret-key")

    return res.status(201).send({status: true, message : "User Logged-In successfully.", data: createToken})

    } catch (error) {
        return res.status(500).send({status : false , message : error.message})
    }
    }

module.exports = {createAdmin, loginAdmin}