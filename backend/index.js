
const express = require("express");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

//app config
const app = express();
const port =5000;

app.use(express.json());
app.use(cors());

//Database Connection With  MongoDB

mongoose.connect("mongodb+srv://ujjwalnepal2060:notebook7070@cluster0.xqpy5bo.mongodb.net/Kapada")
//Api Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//Image Storage Engine

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
});
//Schema for Creating Products
const Product =mongoose.model("product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    },
});
app.post('/addproduct',async(req,res)=>{
    let products= await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        sucess:true,
        name:req.body.name,
    });
});
// Creating API for deleting Products
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        sucess:true,
        name:req.body.name,
    })
});
//Creating API for getting all products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("all products fetched");
    res.send(products);
});

//Schema creating for User model

const Users =mongoose.model('users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
       type:String, 
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

//Creating Endpoint for registering the user
app.post('/signup',async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({sucess:false,error:"existing user found with same email id"})
    }
    let cart ={};
     
    for (let i =0;i< 300; i++) {
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data ={
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,"secret_ecom");
    res.json({sucess:true,token})

});
// Creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password ===user.password;
        if(passCompare){
            const data ={
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({sucess:true,token});
        }
        else{
            res.json({sucess:false,error:"Wrong Password"});
        }
    }
    else{
        res.json({sucess:false,error:"Wrong Email Id"})
    }
});
// creating endpoint for newcollection data
app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("new collection fetched");
    res.send(newcollection);
});

//creating endpoint for popular in women section

app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("popular in women fetched");
    res.send(popular_in_women);
})
//creating middelware to fetch user
    const fetchUser = async(req,res,next)=>{
        const token = req.header('auth-token');
        if(!token){
            res.status(401).send({error:"Please authenticat using valid token"})
        }
        else{
            try{
                const data = jwt.verify(token,'secret_ecom');
                req.user = data.user;
                next();
            }catch (error){
                res.status(401).send({error:"please authenticate using a valid token"})
            }
        }
    }


//creating end point for adding products in cartdata

app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added")
});

//creating endpoint to remove product form cartdata

app.post('/removeformcart',fetchUser,async(req,res)=>{
    console.log("Removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if( userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed")
});

//creating endpoint to get cartdata

app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error){
        console.log("server Running on Port"+port)
    }
    else{
        console.log("error :" +error)
    }
});