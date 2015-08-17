var express = require('express');

var routes = function(User,Show){
	var subscribeRouter = express.Router();

	subscribeRouter.route('/')
		.post(function(req,res){
			var userId = req.body.userId;
			var showId = req.body.showId;


			User.findById(userId, function(err, user){
				if(err){
					res.status(500).send(err);
				}else{
					user.subscribed.push(showId);
				}
				
				user.save(function(err) {
				    //if (err) return next(err);
				    //res.send(200);
					if(err){
				    console.log(err);
					}
				});
			});


			Show.findById(showId, function(err, show){
				if(err){
					res.status(500).send(err);
				}else{
					show.subscribers.push(userId);
				}
				
				show.save(function(err) {
				    //if (err) return next(err);
				    //res.send(200);
					if(err){
				    console.log(err);
					}
				});

			});


			res.send('subscribed!').status(200);

			


		});




	return subscribeRouter;

};


module.exports = routes;