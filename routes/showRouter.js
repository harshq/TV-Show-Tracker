var express = require('express');
var request = require('request');
var TVDB = require("node-tvdb/compat");
var tvdb = new TVDB("B5D2874D61BF48DA");
var async = require('async');


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
		}).post(function(req,res){
	
		var id = req.params.id;
		Show.findById(id,function(err, show){
				if(err){
					res.status(500).send(err);
				}else{
					
					
					
					
					console.log('0');
					async.waterfall([
						function(callback) {
							
							
							tvdb.getSeriesAllById(show.tvdbId, function(err, response) {
									console.log('1');
							 		callback(null , response);
							});
							
							
							//callback();
						},
						function(tvdbres , callback) {
						  	console.log('2');
							
							
							
							request('http://eztvapi.re/show/'+show.imdbId, function (error, response, body) {
								if (!error && response.statusCode == 200) {
									var jsonBody = JSON.parse(body);
									callback(null , tvdbres , jsonBody);
								  } 
								
								
							  });
							
						},
						function(tvdbres, torres , callback) {
							console.log('3');
							show.episodes = [];
							
							tvdbres.Episodes.forEach(function(element, index , array){
								//for(var x in element){
									show.episodes.push({
										  season: element.SeasonNumber,
										  episodeNumber: element.EpisodeNumber,
										  episodeName: element.EpisodeName,
										  firstAired: element.FirstAired,
										  image: 'http://thetvdb.com/banners/'+element.filename,
										  overview: element.Overview,
										  torrent: []
									});
								//}
							});
							
							callback(null, torres);
							
						},
						function(torres ,callback) {
							console.log('4');
							
							
							torres.episodes.forEach(function(element, index, array){
								show.episodes.forEach(function(el, ind, arr){
								   if(element.season == el.season && element.episode == el.episodeNumber){

									   for(var x in element.torrents){
										   el.torrent.push({
												format: x || null,
												link: element.torrents[x].url || null
											});
									   }


								   } 
								});


							});
							
							
							callback(null, 'done');
						}
					], function (err, result) {
						
						
							show.save(function(err){
							if(err){
								res.send('Unexpected Error!').status(500);
							}else{	
								res.send('Show Updated!').status(200);
							}

							});
						
						
						

					});
					
					
					
					
					
					
					
					
				}
			});
	
	
	
	
		});
	

	
	
	
	
	
	
	
	
	return userRouter;
};


module.exports = routes;