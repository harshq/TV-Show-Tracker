var express = require('express');
var request = require('request');
var TVDB = require("node-tvdb/compat");
var tvdb = new TVDB("B5D2874D61BF48DA");


var routes = function(Show){
	var userRouter = express.Router();
    
	userRouter.route('/')
		.get(function(req,res){
		
		var query = req.query;
			Show.find(query,function(err, data){
				if(err){
					res.status(500).send(err);
				}else{
					res.json(data).status(200);
				}
			});
           
		});
    
	userRouter.route('/:id')
		.get(function(req,res){
		
		var id = req.params.id;
		
			Show.findById(id,function(err, data){
				if(err){
					res.status(500).send(err);
				}else{
					res.json(data).status(200);
				}
			});
           
		})
		.delete(function(req,res){
	
		var id = req.params.id;
		
			Show.findById(id,function(err, data){
				if(err){
					res.status(500).send(err);
				}else{
					data.remove();
					res.send('Show Removed!').status(200);
				}
			});
	});
	

	
	
	
	
	
	
	
	
	return userRouter;
};


module.exports = routes;