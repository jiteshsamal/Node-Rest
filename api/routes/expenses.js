const express = require('express');
const router = express.Router();
//const expense=require('../models/expense');
const Expense = require("../models/expense");
router.get('/',function(req,res){
    Expense.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    });
});

// router.get('/:expenseId',function(req,res,next){
    
    
// });

router.post('/',function(req,res){
   // console.log(req.body);
    const exp= new Expense({
        //id:new mongoose.Types.ObjectId(),
        Date:new Date(),
        Price:req.body.Price,
        Location:req.body.Location,
        Reason:req.body.Reason
    });
    //res.status(200).json(exp);
    //console.log(exp);
    exp.save().
        then(data=>{res.status(200).json({
            message:'Data posted succefully',
            data:data
        })})
        .catch(err=>{
            res.status(404).json({
                message:'error occured'
            })
        })
});

router.patch('/',function(req,res){
    res.status(200).send({'Message':'/products patch request.'})
});


router.delete('/',function(req,res){
    res.status(200).send({'Message':'/products delete request.'})
});

module.exports=router;