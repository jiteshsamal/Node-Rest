

const express = require('express');
const router = express.Router();

const authcontroller=require('../controller/auth.controller');

router.post('/signup',authcontroller.signup );


router.post("/login",authcontroller.login );


  router.delete("/:userId",authcontroller.deleteUser );

 
  module.exports=router;