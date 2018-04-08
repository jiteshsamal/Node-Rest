const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Expense = require("../models/expense");

function getExpenses(req,res){
    Expense.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    });
}

function addExpenses(req,res){
const exp= new Expense({
    _id:new mongoose.Types.ObjectId(),
    Date:new Date(),
    Price:req.body.Price,
    Location:req.body.Location,
    Reason:req.body.Reason
});
//res.status(200).json(exp);
console.log(exp);
exp.save().
    then(data=>{res.status(200).json({
        message:'Data posted succefully',
        data:data
    })})
    .catch(err=>{
        res.status(404).json({
            message:err
        })
    })
}


function editExpenses(req,res){

    Expense.findByIdAndUpdate(  
        req.body.todoId,
        {Date:new Date(),Price:req.body.Price, Location:req.body.Location, Reason:req.body.Reason},
       {new: true},
        (err, todo) => {
          if (err) return res.status(500).send(err);
           return res.send(todo);
        })
}


function deleteExpenses(req,res){
    Expense.findByIdAndRemove(req.body.todoId, (err, todo) => {  
        if (err) return res.status(500).send(err)
        const response = {
            message: "Todo successfully deleted",
            id: todo._id
        };
        return res.status(200).send(response);
    });
}

module.exports={
    addExpenses:addExpenses,
    editExpenses:editExpenses,
    deleteExpenses:deleteExpenses,
    getExpenses:getExpenses
}