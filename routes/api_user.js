const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds =10;
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/',(req,res,next)=>{
    User.find()
		.exec()
		.then(users=>{
			res.status(200).json(users);
		})
		.catch(err => {
			console.log(err);
			res.status(404).json({
				error:err
			});
		});
});


router.post('/',(req,res,next)=>{
    User.find({email:req.body.email}).exec()
		.then(user=>{
			if(user.length>=1){
				res.status(409).json({
					message : "User Already Exist"
				});
			}else{


				bcrypt.hash(req.body.password,saltRounds,(err,hashResult)=>{

				if(err){
					return res.status(500).json({
						error:err
					});
				}else{
					const user = new User({
						_id: mongoose.Types.ObjectId(),
						email: req.body.email,
                        password: hashResult,
                        name:req.body.name
					});

					user.save()
						.then(result=>{
							console.log(result);
							res.status(201).json({
								message:"User Created Successfully"
							});
						})
						.catch(err => {
							console.log(err);
							res.status(404).json({
								error:err
							});
						});
				}


			});

			}
		});

});

router.get('/register',(req,res,next)=>{
    res.render('register');
});


module.exports = router;