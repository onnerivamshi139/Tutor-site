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
        const { tutorId, userobj } = request.body;

        // Check if the sender and receiver exist in the tutorcollection
        const tutor = await tutorcollection.findOne({ username: tutorId });
        const student = await usercollection.findOne({ username: userobj.username });

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

        if (tutor.Requests.includes(userobj.username)) {
            return response.status(400).send({ message: "Request already sent" });
        }

        // Add the receiver's ID to the sender's sentRequests array
        tutor.Requests.push(userobj);
        student.Requests.push(tutorId);

        // Save the updated sender document
        await tutorcollection.updateOne({ username: tutorId }, { $set: { Requests: tutor.Requests } });
        await usercollection.updateOne({ username: userobj.username }, { $set: { Requests: student.Requests } });

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
        const { feedback,username,profileImg} = request.body;

        // Find the tutor by ID
        const tutor = await tutorcollection.findOne({ username: tutorId });

        if (!tutor) {
            return response.status(404).send({ message: "Tutor not found" });
        }

        // Add the feedback to the tutor's feedback array
        if (!tutor.feedback) { 
            tutor.feedback = [];
        }
        tutor.feedback.push({text:feedback, username:username,profileImg:profileImg});

        // Update the tutor's document with the new feedback
        await tutorcollection.updateOne({ username: tutorId }, { $set: { feedback: tutor.feedback } });

        return response.send({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "Internal server error" });
    }
}));


Tutorapp.post('/update-tutor/:id', upload.single("profilePicture"), expressAsyncHandler(async (request, response) => {
    try {
        const tutorcollection = request.app.get("tutorcollection");
        const tutorId = request.params.id;

        // Get the tutor's existing details
        const existingTutor = await tutorcollection.findOne({ username: tutorId });

        if (!existingTutor) {
            return response.status(404).send({ message: "Tutor not found" });
        }

        // Get the updated details from the request
        const { mobileNumber, subjects, address } = request.body;

        // Create a new tutor object with updated details
        const updatedTutor = {
            ...existingTutor,
            mobileNumber,
            subjects,
            address,
        };

        // Update the profile picture if a new one is uploaded
        if (request.file) {
            updatedTutor.profileImg = request.file.path;
        }

        // Update the tutor's document with the new details
        await tutorcollection.updateOne({ username: tutorId }, { $set: updatedTutor });

        return response.send({ message: "Tutor details updated successfully" });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "Internal server error" });
    }
}));



// Add this route to your tutor API
Tutorapp.get('/get-requests', expressAsyncHandler(async (request, response) => {
    try {
        const tutorcollection = request.app.get("tutorcollection");

        // Find users who have sent requests and project only the "Requests" field
        const usersWithRequests = await tutorcollection.find({
            Requests: {
                $exists: true, // The field exists in the document
                $not: { $size: 0 } // The field is not an empty array
            }
        }, {
            projection: {
                _id: 0, // Exclude the _id field
                Requests: 1 // Include only the Requests field
            }
        }).toArray();

        if (!usersWithRequests || usersWithRequests.length === 0) {
            return response.status(404).send({ message: "No requests found" });
        }

        return response.send({ message: "Requests retrieved successfully", payload: usersWithRequests });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "Internal server error" });
    }
}));



// Import necessary libraries and middleware
// ...

// Handle accepting a request
Tutorapp.post('/accept-request', expressAsyncHandler(async (req, response) => {
    try {
      const tutorcollection = req.app.get("tutorcollection");
      const usercollection = req.app.get("usercollection");
      const { tutorId, studentobj } = req.body;
  
      // Find the tutor and student documents
      const tutor = await tutorcollection.findOne({ username: tutorId });
      const student = await usercollection.findOne({ username: studentobj.username });
  
      if (!tutor) {
        return response.status(404).send({ message: "Tutor not found" });
      }
  
      if (!student) {
        return response.status(404).send({ message: "Student not found" });
      }
  
      // Check if the student's username is in the tutor's Requests array
    //   const studentIndex = tutor.Requests.indexOf(studentUsername);
      const studentIndex = tutor.Requests.findIndex(request => request.username === studentobj.username);

      if (studentIndex === -1) {
        return response.status(400).send({ message: "Request not found" });
      }
  
      // Move the student's username from Requests to Students in the tutor's document
      tutor.Requests.splice(studentIndex, 1);
  
      if (!tutor.Students) {
        tutor.Students = [];
      }
      tutor.Students.push(studentobj);
  
      // Add the tutor's username to the student's Tutors array
      if (!student.Tutors) {
        student.Tutors = [];
      }
      student.Tutors.push(tutorId);
  
      // Update tutor and student documents
      await tutorcollection.updateOne({ username: tutorId }, { $set: { Requests: tutor.Requests, Students: tutor.Students } });
      await usercollection.updateOne({ username: studentUsername }, { $set: { Tutors: student.Tutors } });
  
      return response.send({ message: "Request accepted successfully", payload: tutor.Requests });
    } catch (error) {
      console.error(error);
      return response.status(500).send({ message: "Internal server error" });
    }
  }));
  
// Handle rejecting a request
Tutorapp.post('/reject-request', expressAsyncHandler(async (request, response) => {
    try {
        const tutorcollection = request.app.get("tutorcollection");
        const { tutorId, studentobj } = request.body;

        // Find the tutor document
        const tutor = await tutorcollection.findOne({ username: tutorId });

        if (!tutor) {
            return response.status(404).send({ message: "Tutor not found" });
        }

        // Check if the student's username is in the tutor's Requests array
        const studentIndex = tutor.Requests.findIndex(request => request.username === studentobj.username);
        if (studentIndex === -1) {
            return response.status(400).send({ message: "Request not found" });
        }

        // Remove the student's username from the Requests array
        tutor.Requests.splice(studentIndex, 1);

        // Update the tutor document
        await tutorcollection.updateOne({ username: tutorId }, { $set: { Requests: tutor.Requests } });

        return response.send({ message: "Request rejected successfully",payload:tutor.Requests});
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "Internal server error" });
    }
}));


// Import necessary libraries and middleware
// ...

// Handle adding availability and experience details
Tutorapp.post(
    '/add-availability-experience/:id',
    expressAsyncHandler(async (request, response) => {
      try {
        const tutorcollection = request.app.get('tutorcollection');
        const tutorId = request.params.id;
  
        // Get the tutor's existing details
        const existingTutor = await tutorcollection.findOne({ username: tutorId });
  
        if (!existingTutor) {
          return response.status(404).send({ message: 'Tutor not found' });
        }
  
        // Get the updated details from the request
        const { selectedDays, selectedTimeSlot, experienceYears, experienceMonths } = request.body;
  
        // Create a new tutor object with updated availability and experience details
        const updatedTutor = {
          ...existingTutor,
          selectedDays,
          selectedTimeSlot,
          experienceYears,
          experienceMonths,
        };
  
        // Update the tutor's document with the new details
        await tutorcollection.updateOne({ username: tutorId }, { $set: updatedTutor });
  
        return response.send({ message: 'Tutor availability and experience updated successfully' });
      } catch (error) {
        console.error(error);
        return response.status(500).send({ message: 'Internal server error' });
      }
    })
  );
  


  Tutorapp.post('/update-tutor-services/:id', expressAsyncHandler(async (request, response) => {
    try {
        const tutorcollection = request.app.get("tutorcollection");
        const tutorId = request.params.id;

        // Get the new service details from the request
        const { serviceType, serviceDetails, serviceMode } = request.body;

        // Get the tutor's existing details
        const existingTutor = await tutorcollection.findOne({ username: tutorId });

        if (!existingTutor) {
            return response.status(404).send({ message: "Tutor not found" });
        }

        // Create a new service object with the new details
        const newService = {
            type: serviceType,
            details: serviceDetails,
            mode: serviceMode,
        };

        // Ensure that the `services` field exists in the document
        existingTutor.services = existingTutor.services || [];

        // Append the new service to the tutor's existing services array
        existingTutor.services.push(newService);

        // Update the tutor's document with the new services
        await tutorcollection.updateOne({ username: tutorId }, { $set: existingTutor });

        return response.send({ message: "Tutor services updated successfully" });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "Internal server error" });
    }
}));


// Export the Tutorapp router
module.exports = Tutorapp;


// ...



  
  