const express = require("express");
const route = require("./route/route");
const mongoose = require('mongoose');
const app = express();
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({extended : true}))

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://plutonium-functionUp:Atlas@cluster0.suocjnk.mongodb.net/Stf_db" , {
    // urlencoded : true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err))

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
})