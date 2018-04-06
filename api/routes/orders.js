const express = require('express');

const router = express.Router();

router.get('/',function(req,res){

    
    //res.status(200).send({'Message':'/orders Get request.'})
});

router.get('/:orderId',function(req,res,next){
    if(req.params.orderId=='1'){
        res.status(200).send({'Message':'/orders1 Get request.'})
    }
    else{
        res.status(200).send({'Message':'/orders2 Get request.'})
    }
});

router.post('/',function(req,res){
    res.status(200).send({'Message':'/orders Post request.'})
});

router.patch('/',function(req,res){
    res.status(200).send({'Message':'/orders patch request.'})
});


router.delete('/',function(req,res){
    res.status(200).send({'Message':'/orders delete request.'})
});

module.exports=router;