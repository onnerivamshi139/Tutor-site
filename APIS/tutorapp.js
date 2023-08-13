const exp=require('express')
const expressAsyncHandler = require('express-async-handler')
const Tutorapp=exp.Router()
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

Tutorapp.use(exp.json())




Tutorapp.get('/getusers',expressAsyncHandler(async(request,response)=>{
    let tutorcollection=request.app.get("tutorcollection")
    
    let users=await tutorcollection.find().toArray()
    response.send({message:'all users',payload:users})
}));
Tutorapp.get('/getusers/:ci',expressAsyncHandler(async(request,response)=>{
    let pid=request.params.ci;
    let tutorcollection=request.app.get("tutorcollection");
    let tutors=await tutorcollection.find({city:pid})
    if(tutors==null)
    {
        response.send('tutors not existed')
    }
    else{
        response.send({message:'tutors found',payload:tutors})
    }
}));
Tutorapp.post('/tutorlogin',expressAsyncHandler(async(request,response)=>{
    let tutorcollection=request.app.get("tutorcollection")
    //user credintials fron client
    let usercred=request.body
    //find the user in DB
    let userofDB=await tutorcollection.findOne({username:usercred.username})
    if(userofDB==null){
        response.send({message:"Invalid username"})
    }
    else{
        //comparing given password and actual password
        let status=await bcryptjs.compare(usercred.password,userofDB.password)
        //if pass not matched
        if(status==false){
            response.send({message:"Invalid password"})
        }
        else{
            //create token

            let token=jwt.sign({username:userofDB.username},"abcedef",{expiresIn:60})
            //send token
            response.send({message:"login success",payload:token,userObj:userofDB})
        }
    }
}));
Tutorapp.post('/create-tutor',

upload.single("photo"),
expressAsyncHandler(async(request,response)=>{
    let newUser=request.body;
    let tutorcollection=request.app.get("tutorcollection")
    let existinguser=await tutorcollection.findOne({username:newUser.username})
    if(existinguser!=null){
        response.send({message:"Username already exists,please choose another"})
    }
    else{
        let hashedpassword= await bcryptjs.hash(newUser.password,6)
        newUser.password=hashedpassword
        await tutorcollection.insertOne(newUser);
        response.send({message:"new user created"})
    }
}));

module.exports=Tutorapp; 