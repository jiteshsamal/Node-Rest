const express = require('express');
const router = express.Router();
const tokenverify=require('../middleware/tokenverify');
const productscontroller=require('../controller/products.controller');


router.get('/getProducts',tokenverify,productscontroller.getProducts);

router.get('/getProductById/:productId',tokenverify,productscontroller.getProductById);

router.post('/addNewProduct',tokenverify,productscontroller.addNewProduct);

router.patch('/editProduct',tokenverify,productscontroller.editProduct);

router.delete('/deleteProduct',tokenverify,productscontroller.deleteProduct);

module.exports=router;