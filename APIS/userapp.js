const exp=require('express')
const expressAsyncHandler = require('express-async-handler')
const Userapp=exp.Router()
const bcryptjs=require('bcryptjs')
//jsonwebtoken
const jwt=require('jsonwebtoken')

require("dotenv").config()

var cloudinary=require("cloudinary").v2
const { CloudinaryStorage }=require('multer-storage-cloudinary')
const multer=require("multer");

cloudinary.config({
    cloud_name:"dpcmouuen",
    api_key:"288333834481731",
    api_secret:"h9JxTzgSs4gSR9tUzvDUiKt66B4",
    secure:true,
});

const cloudinaryStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,res)=>{
        return{
            folder:"ecom",
            public_id:file.fieldname+"-"+Date.now(),
        };
    },
});

var upload=multer({storage:CloudinaryStorage});

Userapp.use(exp.json())




Userapp.get('/getusers',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get("usercollection")
    
    let users=await usercollection.find().toArray()
    response.send({message:'all users',payload:users})
}));
Userapp.post('/login',expressAsyncHandler(async(request,response)=>{
    let usercollection=request.app.get("usercollection")
    //user credintials fron client
    let usercred=request.body
    //find the user in DB
    let userofDB=await usercollection.findOne({username:usercred.username})
    if(userofDB==null){
        response.send({message:"Invalid username",status:200})
        //alert("invalid details")
    }
    else{
        //comparing given password and actual password
        let status=await bcryptjs.compare(usercred.password,userofDB.password)
        //if pass not matched
        if(status==false){
            response.send({message:"Invalid password"})
        }
        else{``
            //create token

            let token=jwt.sign({username:userofDB.username},"abcedef",{expiresIn:60})
            //send token
            response.send({message:"login success",payload:token,userObj:userofDB})
        }
    }
}));
Userapp.post('/create-user',

upload.single("photo"),
expressAsyncHandler(async(request,response)=>{
    let newUser=request.body;
    let usercollection=request.app.get("usercollection")
    let existinguser=await usercollection.findOne({username:newUser.username})
    if(existinguser!=null){
        response.send({message:"Username already exists,please choose another"})
    }
    else{
        let hashedpassword= await bcryptjs.hash(newUser.password,6)
        newUser.password=hashedpassword
        await usercollection.insertOne(newUser);
        response.send({message:"new user created"})
    }
}));

module.exports=Userapp; 