const exp=require('express')
const Productapp=exp.Router()
const expresAsyncHandler=require('express-async-handler')
Productapp.use(exp.json())



Productapp.get('/getproducts',expresAsyncHandler(async(request,response)=>{
    let productcollection=request.app.get("productcollection")
    let products=await productcollection.find().toArray()
    response.send({message:"All Products",payload:products})
}));
Productapp.get('/getproduct/:id',expresAsyncHandler(async(request,response)=>{
    let pid=(+request.params.id);
    let productcollection=request.app.get("productcollection");
    let product=await productcollection.findOne({id:pid})
    if(product==null)
    {
        response.send('product not existed')
    }
    else{
        response.send({message:'product found',payload:product})
    }
}));
Productapp.post('/create-product',expresAsyncHandler(async(request,response)=>{
    
  let newUser=request.body;
  let usercollection=request.app.get("tutorcollection")
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
  Productapp.put('/update-product',expresAsyncHandler(async(request,response)=>{
    let productcollection=request.app.get("productcollection")
    let modifiedproduct=request.body
    await productcollection.updateOne({id:modifiedproduct.id},{$set:{...modifiedproduct}})
    response.send("product updated successfully")
  }))  ;


  Productapp.delete('/delete-product',expresAsyncHandler(async(request,response)=>{
    let productcollection=request.app.get("productcollection")
    
    let deletionproduct=request.body
    
    await productcollection.deleteOne({id:deletionproduct.id})
    response.send({message:"product deleted duccessfully"})
  }))
        



module.exports=Productapp; 