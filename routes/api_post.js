const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Post = require('../models/post');

router.get('/',(req,res,next)=>{
	
	Post.find()
		.exec()
		.then(posts=>{
			res.status(200).json(posts);
		})
		.catch(err => {
			console.log(err);
			res.status(404).json({
				error:err
			});
		});
});

router.post('/',(req,res,next)=>{
	const post = new Post({
		_id: mongoose.Types.ObjectId(),
		title:req.body.title,
		body:req.body.body
	});

	post.save()
		.then(result=>{
			res.status(201).json({
				message:"Post Created Successfully"
			});
		}).catch(err=>{
			console.log(err);
			res.status(404).json({
				error:err
			});
		});
});

module.exports = router;