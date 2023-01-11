const ClientModel = require("../model/clientmodel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {isEmail, isValidPassword, isValidObjectId, validNumber, isValid, isValidDigit} = require('../middleware/validation')

/*******************Create Clien**************/

const createClient = async(req, res) => {
    try {
        let data = req.body;

        if(Object.keys(data).length == 0)
        return res.status(400).send({status: false, message : "Please provide following details."})

        let {name, email, phone, password,height, weight, Gender, goal, age, foodCategory} = data


        if(!name || !email || !password || !phone || !height || !weight || !age || !goal || !Gender || !foodCategory) 
        return res.status(400).send({status : false, message : "Please provide the credentials. "})

        //--------email and password validation----------\\
        if(!isEmail(email) || !isValidPassword(password)) return res.status(400).send({status: false, message:"Please check your email and password."})

        if(!validNumber(phone)) return res.status(400).send({status: false, message: "Please check your mobile number"})

        if(!isValid(name)) return res.status(400).send({status: false, message:"Please write you name."})

        if(!isValid(height)) return res.status(400).send({status: false, message:"Please check you height."})

        if(!isValidDigit(weight))  return res.status(400).send({status: false, message:"Please check you weight."})

        if(!isValidDigit(age))  return res.status(400).send({status: false, message:"Please check you age."})

        if(!isValid(goal)) return res.status(400).send({status: false, message:"Please check you goal."})

        if(goal !== "gain-Weight" || "loose-Weight") return res.status(400).send({status: false, message:"Please check you goal."})


        if(!isValid(Gender)) return res.status(400).send({status: false, message:"Please check you Gender."})

        if(Gender !== "Male" || "Female" || "Others") return res.status(400).send({status: false, message:"Please check you Gender."})


        if(!isValid(foodCategory)) return res.status(400).send({status: false, message:"Please check you footCategory."})

        if(foodCategory !== "vej" || "regular") return res.status(400).send({status: false, message:"Please check you footCategory."})



        let uniqueEmail = await ClientModel.findOne({email : email});
        if(uniqueEmail) return res.status(400).send({satus: false, message : "Email already exist. Please recheck."})

        let uniquePhone = await ClientModel.findOne({phone : phone})
        if(uniquePhone) return res.status(400).send({status : false , message : "phone number already exist. Please retry."})
        
        let registerClient = {
            name : name,
            email : email,
            password : password,
            phone : phone,
            height : height,
            weight : weight,
            age : age,
            goal : goal,
            Gender : Gender,
            foodCategory : foodCategory
        };

        let newAdmin = await ClientModel.create(registerClient);

        return res.status(201).send({status : true , message : "Register Created successfully." , data : newAdmin})




    } catch (error) {
        return res.status(500).send({status : false , message : error.message})
    }
}

/**********************Log-in clien*************/
const loginClient = async(req, res)=>{
    try {
        

        let data = req.body;

        if(Object.keys(data).length == 0) 
        return res.status(400).send({status : false , message : "Please provide the credentials."});
    
        const{email , password }= data;
    
        if(!email || !password) return res.status(400).send({status : false , message : "Please provide EmailId and password."});
    
        if(!isEmail(email) || !isValidPassword(password)) return res.status(400).send({status: false , message: "Please provide the valid Email and password."});
    
        let ClientExists = await ClientModel.findOne({email : email})
        if(!AdminExists) return res.status(404).send({status: false , message: "Failed! No data found."});
    

        let createToken = jwt.sign({
            adminId : AdminExists._id.toString()
        },"STF-secret-key")
    
        return res.status(201).send({status: true, message : "User Logged-In successfully.", data: createToken})

        

    } catch (error) {
        return res.status(500).send({status : false , message : error.message})
    }
}



//*******************************Sign Up Client*********************************\\

const signupClient = async (req , res) =>{
    try {
        let data = req.body;

        if(Object.keys(data).length == 0)
        return res.status(400).send({status: false, message : "Please provide following details."})

        let {name, email, phone, password} = data

        if(!name || !email || !password || !phone) 
        return res.status(400).send({status : false, message : "Please provide the credentials. "})

        //--------email and password validation------
        if(!isEmail(email) || !isValidPassword(password)) return res.status(400).send({status: false, message:"Please check your email and password."})

        let uniqueEmail = await ClientModel.findOne({email : email});
        if(uniqueEmail) return res.status(400).send({satus: false, message : "Email already exist. Please recheck."})

        let uniquePhone = await ClientModel.findOne({phone : phone})
        if(uniquePhone) return res.status(400).send({status : false , message : "phone number already exist. Please retry."})
        
        let signupClient = {
            name : name,
            email : email,
            password : password,
            phone : phone
        };

        let newClient = await ClientModel.create(signupClient);

        return res.status(201).send({status : true , message : "Register Created successfully." , data : newClient})

    } catch (error) {
        return res.status(500).send({status : false , message : error.message})
    }
}
















module.exports = {createClient, loginClient, signupClient}