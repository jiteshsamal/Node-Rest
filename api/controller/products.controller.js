const express = require('express');
const mongoose=require('mongoose');
const router = express.Router();
const product = require("../models/product");


function getProducts(req,res){
    product.find()
    .select("_id Price Name Details ")
    .then(docs => {
      res.status(200).json({
          message:'products Retrived successfully',
          data:docs
      });
    });
}

function getProductById(req,res,next){
    product.findById(  
        req.params.productId,
        (err, todo) => {
          if (err) return res.status(500).send(err);
           return res.json({
               message:"Product rerived",
                data:todo
           });
        })
}

function addNewProduct(req,res){
    const exp= new product({
        _id:new mongoose.Types.ObjectId(),
        Price:req.body.Price,
        Name:req.body.Name,
        Details:req.body.Details,
    });
    exp.save().
        then(data=>{res.status(200).json({
            message:'product posted succefully',
            data:data
        })})
        .catch(err=>{
            res.status(404).json({
                message:err
            })
        })
}

function editProduct(req,res){
    product.findByIdAndUpdate(  
        req.body.todoId,
        {Date:new Date(),Price:req.body.Price, Details:req.body.Details, Name:req.body.Name},
       {new: true},
        (err, todo) => {
          if (err) return res.status(500).send(err);
           return res.send(todo);
        })
    }

function deleteProduct(req,res){
        product.findByIdAndRemove(req.body.todoId, (err, todo) => {  
            if (err) return res.status(500).send(err)
            const response = {
                message: "product successfully deleted",
                id: todo._id
            };
            return res.status(200).send(response);
        });
    }


    module.exports={
        getProducts:getProducts,
        getProductById:getProductById,
        addNewProduct:addNewProduct,
        editProduct:editProduct,
        deleteProduct:deleteProduct
    }