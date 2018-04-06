const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const expenseRoutes=require('./api/routes/expenses');
const orderRoutes=require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(enableCors);
//const url="mongodb+srv://kay:Yahoo@123@cluster0.mongodb.net/products";

 mongoose.connect( "mongodb://jiteshsamal:Yahoo123@cluster0-shard-00-00-n1fem.mongodb.net:27017,cluster0-shard-00-01-n1fem.mongodb.net:27017,cluster0-shard-00-02-n1fem.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",function(err, db) {
       // console.log('connected');
        console.log(err);
       // console.log(db);
    });
//  mongoose.connect( "mongodb://jitesh%2Esamal%40gmail.com:Yahoo%40123@cluster0-shard-00-00-n1fem.mongodb.net:27017,cluster0-shard-00-01-n1fem.mongodb.net:27017,cluster0-shard-00-02-n1fem.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
//  ).then(function(err,res){
//     console.log(err); y

//     console.log(res)
// mongodb://<dbuser>:<dbpassword>@ds135399.mlab.com:35399/online_projects
// });





//routes
app.use(expenseRoutes);
//app.use('/orders',orderRoutes);



//unknown routes...
app.use(function(req,res,next){
    const error = new Error('Not matching to any request');
    error.status=404;
    next(error);
});

// //error handler...
app.use(function(err,req,res,next){
    if(req.error){
        res.status(500);
        res.send({error:err.message});
    }
});

console.log('started working');

//enable cors method for the api...
function enableCors(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    if(req.method=="OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUR,GET,POST,DELETE");
        return res.status(200).json({});
    }
}

module.exports=app;