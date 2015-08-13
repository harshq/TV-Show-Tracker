var express = require('express');

var routes = function(User){

	var userRouter = express.Router();

	userRouter.route('/')
		.get(function(req,res){
			var query = {};
			if(req.query.firstName){
				query.firstName = req.query.firstName;
			}else if(req.query.email){
				query.email = req.query.email;
			}else if(req.query.genre){
				query.genre = req.query.genre;
			}

			User.find(query,function(err, users){
				if(err){
					res.status(500).send(err);
				}else{
					res.json(users).status(200);
				}
			});	
		})
		.post(function(req,res){
			var data = req.body;
			if(data._id){
				delete data._id;
			}
			var user = new User(data);

			user.save(function(err){
				if(err){
					res.status(500).send(err);
				}else{
					res.status(201).json(user);
				}
			});
		});

	userRouter.route('/events/:userId')
		.get(function(req,res){

		var randomColor = function() {
          var letters = '0123456789ABCDEF'.split('');
          var color = '#';
          for(var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
          }
          return color;
        }


			var events = [];
			var userId = req.params.userId;
			User.findById(userId)
				.populate('subscribed')
				.exec(function(err, data){
					if(err){
						res.send(err).status(500);
					}else if(data){
						//res.json(data).status(200);
						data.subscribed.forEach(function(show,index,array){
							var showName = show.name;
							var poster = show.poster;
							var showAirsTime = show.airsTime;
							var network = show.network;

							var col = randomColor();

							show.episodes.forEach(function(episode, ind , arr){

								var season = episode.season || "Unavailable";
								var episodeNumber = episode.episodeNumber || "Unavailable";
								var episodeName = episode.episodeName || "Unavailable";
								var firstAired = episode.firstAired || "Unavailable";
								var overview = episode.overview || "Unavailable";
								var _id = episode._id;

								if(episode.firstAired !== null){
								//var aired = episode.firstAired.substring(0,10);
								events.push({
									_id: _id,
									title: showName ,
									poster:  poster,
									showAirsTime : showAirsTime,
									network:network,
									start: episode.firstAired, 
									allDay: true, 
									color: col,
									textColor: 'white',
									stick: true,
									season:season,
									episodeNumber:episodeNumber,
									episodeName:episodeName,
									firstAired:firstAired,
									overview:overview
								});	
								}
							});
			
						});  


						res.send(events).status(200);

					}else{
						res.status(404).send('User Not Found!');
					}
				});
	});

	userRouter.route('/loginValidate')
		.post(function(req,res){
			var query = {};
			var email = req.body.email;
			var password = req.body.password;
			
			if(!!email && !!password){
				query.email = email;
				query.password = password;

				User.find(query,function(err, user){
					if(err){
						res.status(404).json({"status" : "404"});
					}else{
						res.json(user).status(200);
					}
				});	

			}else{
				res.json({"status" : "404"}).status(404);
			}
				
		});


	userRouter.use('/:userId', function(req,res,next){
		var userId = req.params.userId;
			User.findById(userId, function(err, data){
				if(err){
					res.send(err).status(500);
				}else if(data){
					req.user = data;
					next();
				}else{
					res.status(404).send('User Not Found!');
				}
			});
	});

	userRouter.route('/:userId')
		.get(function(req,res){
			if(req.user){
				res.json(req.user).status(200);	
			}else{
				res.status(404).send('User Not Found!');
			}
		})
		.patch(function(req,res){
			var data = req.body;
			if(data._id){
				delete data._id;
			}

			for(var i in data){
				req.user[i] = data[i];
			}

			req.user.save(function(err){
				if(err){
					res.status(500).send(err);
				}else{
					res.status(201).json(req.user);
				}
			});

		})
		.delete(function(req,res){
			req.user.remove(function(err){
				if(err){
					res.status(500).send(err);
				}else{
					res.status(201).send('User Deleted');
				}
			});
		});


	return userRouter;

};


module.exports = routes;




