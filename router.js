const express=require('express')
const router=express.Router();
const Product=require('./uploadSchema/productschema')
const multer=require('multer')
const path=require('path');


router.get('/',(req,res)=>{
    Product.find({},(err,doc)=>{
if(err){
  console.log(err)
}
else{
  console.log(res.doc)
  res.json(doc)
}

    })
})



var profileImage=[];
var storage = multer.diskStorage({
  destination:function(req,file,callback){
   callback(null,'./public/uploads');
  },
  filename:function(req,file,callback){
    var ext='';
    var name='';
    if(file.originalname){
      // var p =file.originalname.lastIndexOf('.');
      // ext=file.originalname.substring(p+1);
      // var firstname=file.originalname.substring(0,p+1);
      name=Date.now()+'_'+file.originalname;
      // name+=ext; 
    }
    profileImage=[];
    profileImage.push({'name':name});
    callback(null,name);
  }
});
var upload=multer({storage:storage,limits:{filesize:10}}).array('image');



router.post('/',upload,async(req,res)=>{
  // console.log(req.body.Name)
  // console.log(req.body.Price)
  // console.log(profileImage)
  // console.log(req.files) 
if(req.files.length==0){
  var data=new Product({
    Name:req.body.Name,
    Price:req.body.Price,
    image:null
    
})
}else{
    var data=new Product({
        Name:req.body.Name,
        Price:req.body.Price,
        image:profileImage[0].name
        
    })
  }
    console.log(data)
await data.save((err,results)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("inserted");
    }
})
})

router.get('/product_edit/:id',(req,res)=>{
  const id=req.params.id;
 // console.log("EDIT" ,req.body)
   Product.find({"_id":id},(err,doc)=>{
if(err){
  console.log("err"+err)
}
else{

  res.json(doc)
}

  })
})

router.put('/update/:id',upload,(req,res)=>{
const id=req.params.id;
// console.log("id and id and id",id);
// console.log("update DATA",req.body)
// console.log("image",profileImage[0]);
// console.log("files",req.files.length)

if(req.files.length==0){
var updaterecord = {
  Name:req.body.Name,
  Price:req.body.Price,
}
console.log("not image")

}
else{
 var updaterecord = {
    Name:req.body.Name,
    Price:req.body.Price,
    image:profileImage[0].name
  }
  console.log("yes image")
}
  Product.findOneAndUpdate({"_id":id},{$set:updaterecord},{new:true},(err,doc)=>{
    console.log("result",doc)
if(err){
  console.log(err)
}
else{
  console.log("docs",doc)
  res.json(doc)
}
  })
})

router.delete('/delete/:id',async(req,res)=>{
  const id=req.params.id
  console.log(id)
  Product.findByIdAndDelete({"_id":id},(err,doc)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("deleted");
      res.json("deleted");
    }
  })
})
module.exports=router;