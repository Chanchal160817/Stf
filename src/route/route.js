const express = require('express');
const router = express.Router();
const AdminController = require('../controller/admincontroller');
const ClientController = require('../controller/clientcontroller')

//***********Admin*************\\
router.post('/createAdmin', AdminController.createAdmin);
router.post('/loginAdmin', AdminController.loginAdmin);

//************Clien*************\\
router.post('/signupClient', ClientController.signupClient);
router.post('/createClient', ClientController.createClient);
router.post('/loginClent', ClientController.loginClient);


module.exports = router