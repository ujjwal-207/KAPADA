const port =5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

//Database Connection With  MongoDB

mongoose.connect("mongodb+srv://ujjwalnepal2060:notebook7070@cluster0.xqpy5bo.mongodb.net/Kapada")
//Api Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//Image storage Engine

const storage=multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload=multer({storage:storage});

//Creating upload Endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        sucess:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


app.listen(port,(error)=>{
    if(!error){
        console.log("server Running on Port"+port)
    }
    else{
        console.log("error :" +error)
    }
})