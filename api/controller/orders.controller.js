const express = require('express');
const router = express.Router();
const Order=require('../models/order');
const Product=require('../models/product');
const mongoose=require('mongoose');
const tokenverify = require("../middleware/tokenverify");


function getOrders(req,res){
    Order.find()
        .select("_id Quantity Product ")
        .populate("Product","Price Name Details -_id")
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500)
            .json({"message":"Error occured",error:err})
        })
}

function getOrderById(req,res,next){
    Order.findById(req.params.orederId)
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Got order data',
            request: {
                type: "POST",
                url: "http://localhost:3000/orders",
                body: { productId: "ID", quantity: "Number" }
              }
        })
    })
    
}

function addOrder(req,res){
    Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        Quantity: req.body.Quantity,
        Product: req.body.productId,
        Details:req.body.Details
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

function deleteOrder(req,res){
    Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}


module.exports={
    getOrders:getOrders,
    getOrderById:getOrderById,
    addOrder:addOrder,
    deleteOrder:deleteOrder
}