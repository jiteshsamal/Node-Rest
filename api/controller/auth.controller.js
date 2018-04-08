
const appUser=require('../models/appUser');
const mongoose=require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const saltRounds = 10;

function signup(req,res){
    console.log('request arrived');
    appUser.find({Email:req.body.Email})
        .then(data=>{
            if(data.length > 0){
                res.status(200).json({
                    "Message":"UserID already exist"
                })
            }
            else{
                var bcrypt = require('bcrypt');
                const saltRounds = 10;
                bcrypt.hash(req.body.Password, saltRounds, function(err, hash) {
                    const user = new appUser({
                        _id: mongoose.Types.ObjectId(),
                        Email: req.body.Email,
                        Password:hash,
                        });
                        user.save()
                            .then((err,data)=>{
                                if(err){
                                    res.status(200).json({
                                        "Message":"error while storing user",
                                        error:err
                                    })
                                }
                                else{
                                    res.status(200).json({
                                        "Message":"successfully added user",
                                        data:data
                                    })
                                }
                        }) 
                    });
            }
        })
        .catch(err=>{
            res.status(500)
            .json({"message":"Error occured",error:err})
        })
}


function login(req, res, next) {
    appUser.find({ Email: req.body.Email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.Password, user[0].Password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                Email: user[0].Email,
                userId: user[0]._id
              },
              "node-rest",
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }


  function deleteUser (req, res, next){
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }



  module.exports={
    signup:signup,
    login:login,
    deleteUser:deleteUser
  }