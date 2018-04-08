var jwt = require('jsonwebtoken');

function tokenVerify(req,res,next){
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'node-rest');
    req.userData = decoded;
    next();
}

module.exports=tokenVerify;