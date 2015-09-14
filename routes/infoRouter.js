var express = require('express');
var request = require('request');
var TVDB = require("node-tvdb/compat");
var tvdb = new TVDB("B5D2874D61BF48DA");


var routes = function(ReqShow){

var infoRouter = express.Router();

	infoRouter.route('/')
		.get(function(req,res){
			ReqShow.find(function(err, data){
				if(err){
					res.status(500).send(err);
				}else{
					res.json(data).status(200);
				}
			});
		})
		.post(function(req,res){
		
			var userId = req.body.userId;
			//console.log(req.body.SeriesName);
		
			ReqShow.findOne({name : req.body.SeriesName },function(err,data){
				if(err){
					res.send('err').status(500);
				}else{
					if(!data){
						
						var reqShow = new ReqShow({
								tvdbId: req.body.seriesid,
								name:req.body.SeriesName,
								overview:req.body.Overview,
								firstAired:req.body.FirstAired,
								network:req.body.Network,
								imdbId:req.body.IMDB_ID,
								poster:req.body.poster,
								status:req.body.status,
								runtime:req.body.runtime,
								genres:[],
								reqested: []
								});

								req.body.genres.forEach(function(element,index, array){reqShow.genres.push(element);});
								reqShow.reqested.push(userId);

								reqShow.save(function(err){
									if(err){
										res.status(500).send(err);
									}else{
										res.status(201).send('new show requested');
									}});
						
						//-----------------------------------------------------
			
							}else{
							
								data.reqested.push(userId);
								data.save(function(err){
									if(err){
											res.status(500).send(err);
									}else{
											res.status(201).send('old show updated');
									}});

								//-------------------------------------------------------

							}
				}
			});
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		});
	
    infoRouter.use('/:seriesName' , function(req,res, next){
		var seriesName = req.params.seriesName;

			tvdb.getSeriesByName(seriesName, function(err, response) {
    			if(err){
					//console.log('err');
                    //req.shows = {status : 404};
    				//res.send("Show Not Found!").status(404);
    			}else{
					//console.log(response);
    				req.shows = response;
                    next();
    			}
			});
    
    },function(req,res,next){
        
        if( req.shows && req.shows.length > 0){

        var show = req.shows[0];

            if(!!show.IMDB_ID){

        

                request('http://eztvapi.re/show/'+show.IMDB_ID, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    
					  
					if(!!body){
                    var data = JSON.parse(body);
						show.poster = data.images.poster;
						show.status = data.status;
						show.runtime = data.runtime;
						show.year = data.year;
						show.genres = data.genres;

						req.show = show;
						next();
				  	}else{
						show.status = "unavailable";
						show.runtime = "0";
						show.year = "unavailable";
						show.genres = [];
						show.poster = null;
						req.show = show;
						next();
					}
					  
					  
					  

                  }else{
                    show.status = "unavailable";
						show.runtime = "0";
						show.year = "unavailable";
						show.genres = [];
						show.poster = null;
						req.show = show;
						next();
                  }
                });
				
				
				
				
				

            }else{
                next();
            }

        }else{
            next();
        }

    });



    infoRouter.route('/:seriesName')
        .get(function(req,res){

            if(req.show){
                res.json(req.show).status(200);
            }else{
                res.json({status: 404}).status(404);
            }
            
        });



	

	return infoRouter;

};

module.exports = routes;