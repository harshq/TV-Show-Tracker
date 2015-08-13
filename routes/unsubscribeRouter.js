var express = require('express');

var routes = function(User,Show){
	var unsubscribeRouter = express.Router();

	unsubscribeRouter.route('/')
		.post(function(req,res){
			var userId = req.body.userId;
			var showId = req.body.showId;


			User.findById(userId, function(err, user){
				if(err){
					res.status(500).send(err);
				}else{
					var index = user.subscribed.indexOf(showId);
					user.subscribed.splice(index , 1);
				}
				
				user.save(function(err) {
				    console.log(err);
				});
			});


			Show.findById(showId, function(err, show){
				if(err){
					res.status(500).send(err);
				}else{
					//show.subscribers.push(userId);
					var index = show.subscribers.indexOf(userId);
					show.subscribers.splice(index , 1);
				}
				
				show.save(function(err) {
				    console.log(err);
				});

			});


			res.send('unsubscribed!').status(200);

			


		});




	return unsubscribeRouter;

};


module.exports = routes;