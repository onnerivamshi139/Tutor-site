 const exp=require('express')
const app=exp()
const mclient=require("mongodb").MongoClient;
var cors = require('cors')
app.use(cors())

require("dotenv").config()
//import path core mdoule
 const path=require('path')
 //connect build of react app with nodejs
//  app.use(exp.static(path.join(__dirname,'./build')))
const Userapp=require('./APIS/userapp');
const Tutorapp=require('./APIS/tutorapp')
const Productapp = require('./APIS/Product');
const DBurl = "mongodb+srv://vamshi123:vamshi123@cluster0.ojkg9z7.mongodb.net/?retryWrites=true&w=majority"

mclient.connect(DBurl)
.then((client)=>{
    let dbobj=client.db("vamshidb")
    let usercollection=dbobj.collection("usercollection")
    let productcollection=dbobj.collection("productcollection")
    let tutorcollection=dbobj.collection("tutorcollection")
    let requestcollection=dbobj.collection("requestcollection")
    //sharing collection objects to APIs
    app.set("usercollection",usercollection); 
    app.set("tutorcollection",tutorcollection); 
    app.set("productcollection",productcollection);
    app.set("requestcollection",requestcollection);
    console.log("DB connection success")
})
.catch(err=>console.log("error in DB connection",err))
app.use('/user-api',Userapp)
app.use('/tutor-api',Tutorapp)
app.use('/product-api',Productapp)


//dealing page refreshing
app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'build/index.html'))
})
//const port =process.env.REACT_APP_PORT;
//const port=process.env.REACT_APP_PORT;
app.listen(4000,()=>console.log("server is runing on port "));