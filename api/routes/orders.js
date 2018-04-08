
const express = require('express');
const router = express.Router();
const tokenverify=require('../middleware/tokenverify');

const orderscontroller=require('../controller/orders.controller');

router.get('/getOrders',tokenverify,orderscontroller.getOrders );

router.get('/getOrderById/:orderId',tokenverify,orderscontroller.getOrderById);

router.post('/addOrder',tokenverify,orderscontroller.addOrder);

router.delete('/deleteOrder',tokenverify,orderscontroller.deleteOrder);

module.exports=router;