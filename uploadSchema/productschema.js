const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const productschema=mongoose.Schema({

    Name:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    image:{
        type:String,
    }
})
module.exports=mongoose.model('Product_details',productschema)