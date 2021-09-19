const express=require('express');
const app=express();
const mongoose=require('mongoose');
const serverrouter=require('./router');
const bodyParser=require('body-parser')
const morgan=require('morgan');
const cors=require('cors')

//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(morgan('dev'));
app.use(cors())
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/AdminPannel',{useNewUrlParser:true});
var db=mongoose.connection
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
  console.log("db connection succeeded"); 
});

app.use('/',serverrouter)
app.listen('2000',(req,res)=>{
    console.log("2000 server is running");
})




