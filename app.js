const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const expenseRoutes=require('./api/routes/expenses');
const orderRoutes=require('./api/routes/orders');
const productsRoutes=require('./api/routes/products');
const authRoutes=require('./api/routes/auth');

mongoose.connect( "mongodb://jiteshsamal:Yahoo123@cluster0-shard-00-00-n1fem.mongodb.net:27017,cluster0-shard-00-01-n1fem.mongodb.net:27017,cluster0-shard-00-02-n1fem.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",function(err, db) {
    // console.log('connected');
     console.log(err);
    // console.log(db);
 });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });



//app.use(enableCors);
//const url="mongodb+srv://kay:Yahoo@123@cluster0.mongodb.net/products";


//  mongoose.connect( "mongodb://jitesh%2Esamal%40gmail.com:Yahoo%40123@cluster0-shard-00-00-n1fem.mongodb.net:27017,cluster0-shard-00-01-n1fem.mongodb.net:27017,cluster0-shard-00-02-n1fem.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
//  ).then(function(err,res){
//     console.log(err); y

//     console.log(res)
// mongodb://<dbuser>:<dbpassword>@ds135399.mlab.com:35399/online_projects
// });





//routes
app.use('/expense',expenseRoutes);
app.use('/products',productsRoutes);
app.use('/orders',orderRoutes);
app.use('/auth',authRoutes);



app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

console.log('started working');

//enable cors method for the api...
// function enableCors(req,res,next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","*");
//     if(req.method=="OPTIONS"){
//         res.header("Access-Control-Allow-Methods","PUR,GET,POST,DELETE");
//         return res.status(200).json({});
//     }
// }

module.exports=app;