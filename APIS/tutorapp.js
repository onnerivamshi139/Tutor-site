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
            folder:"tutorimg",
            public_id:"img"+"-"+Date.now(),
        };
    },
});

var upload=multer({storage:cloudinaryStorage});

Tutorapp.use(exp.json())




Tutorapp.get('/getusers',expressAsyncHandler(async(request,response)=>{
    let tutorcollection=request.app.get("tutorcollection")
    
    let users=await tutorcollection.find().toArray()
    response.send({message:'all users',payload:users})
}));
Tutorapp.get('/getusers/:id',expressAsyncHandler(async(request,response)=>{
    let pid=request.params.id;
    let tutorcollection=request.app.get("tutorcollection");
    let tutor=await tutorcollection.findOne({username:pid})
    if(tutor==null)
    {
        response.send('tutors not existed')
    }
    else{
        response.send({message:'tutors found',payload:tutor})
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
    let newUser=JSON.parse(request.body.userObj);
    let tutorcollection=request.app.get("tutorcollection")
    let existinguser=await tutorcollection.findOne({username:newUser.username})
    if(existinguser!=null){
        response.send({message:"Username already exists,please choose another"})
    }
    else{
        let hashedpassword= await bcryptjs.hash(newUser.password,6)
        newUser.password=hashedpassword
        newUser.profileImg=request.file.path;
        await tutorcollection.insertOne(newUser);
        response.send({message:"new user created"})
    }
}));

Tutorapp.post('/send-request', expressAsyncHandler(async (request, response) => {
    try {
        const tutorcollection = request.app.get("tutorcollection");
        const usercollection=request.app.get("usercollection")
        const { tutorId, userId } = request.body;

        // Check if the sender and receiver exist in the tutorcollection
        const tutor = await tutorcollection.findOne({ username: tutorId });
        const student = await usercollection.findOne({ username: userId });

        if (!tutor || !student) {
            return response.status(404).send({ message: "Sender or receiver not found" });
        }

        // Check if the sender has already sent a request to the receiver
        if (!tutor.Requests) {
            tutor.Requests = [];
        }
        if (!student.Requests) {
            student.Requests = [];
        }

        if (tutor.Requests.includes(userId)) {
            return response.status(400).send({ message: "Request already sent" });
        }

        // Add the receiver's ID to the sender's sentRequests array
        tutor.Requests.push(userId);
        student.Requests.push(tutorId);

        // Save the updated sender document
        await tutorcollection.updateOne({ username: tutorId }, { $set: { Requests: tutor.Requests } });
        await usercollection.updateOne({ username: userId }, { $set: { Requests: student.Requests } });

        return response.send({ message: "Request sent successfully" });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "Internal server error" });
    }
}));




Tutorapp.post('/submit-feedback/:id', expressAsyncHandler(async (request, response) => {
    try {
        const tutorcollection = request.app.get("tutorcollection");
        const tutorId = request.params.id;
        const { feedback } = request.body;

        // Find the tutor by ID
        const tutor = await tutorcollection.findOne({ username: tutorId });

        if (!tutor) {
            return response.status(404).send({ message: "Tutor not found" });
        }

        // Add the feedback to the tutor's feedback array
        if (!tutor.feedback) {
            tutor.feedback = [];
        }
        tutor.feedback.push(feedback);

        // Update the tutor's document with the new feedback
        await tutorcollection.updateOne({ username: tutorId }, { $set: { feedback: tutor.feedback } });

        return response.send({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "Internal server error" });
    }
}));




module.exports=Tutorapp; 