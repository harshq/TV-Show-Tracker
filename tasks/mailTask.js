var nodemailer = require('nodemailer');
//var agenda = require('agenda')({ db: { address: 'mongodb://localhost/remindme' } });
var agenda = require('agenda')({db: {  address: 'mongodb://harshana:remindme++12@ds031203.mongolab.com:31203/remindme'} });


var mailTask = function(Show){
	
	agenda.define('notifyUserEpisode', function(job, done) {
	var data = job.attrs.data;
	var id = data.id;
  	console.log('Sending emails for : '+id);
	
		Show.findById(id).populate('subscribers').exec(function(err, show){
		
		var emails = show.subscribers.map(function(user) {
		  return user.email;	
		}); 
			
		var upcomingEpisode = show.episodes.filter(function(episode) {
		  return new Date(episode.firstAired) < new Date();
		}).reverse()[0];
		
		console.log(upcomingEpisode);
			
		//----------------------------------------------------------
			
				var transporter = nodemailer.createTransport({
			    service: 'Gmail',
			    auth: {
			        user: 'tvshowtracking@gmail.com',
			        pass: 'remindme++'
					}
				});
			
				var mailOptions = {
					from: 'RemindMe! ►► <tvshowtracking@gmail.com>', 
					to: emails.join(','), 
					subject: show.name +' is about to start', 
					html: '<h3>'+show.name + ' starts in less than 2 hours on ' + show.network + '.</h3>' +
       '<p><b> Season ' + upcomingEpisode.season + ' Episode ' + upcomingEpisode.episodeNumber +'.</b></p><p>'+ '<b> Overview : </b>' + upcomingEpisode.overview+'</p>'
					
				};
			
			    transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
					console.log('Message sent: ' + info.response);
				});
			
			
		//----------------------------------------------------------
		
		
		});
		
		
		
	
	done();
		
	});
	
	agenda.start();
	
	
	
	agenda.on('start', function(job) {
	  console.log("> Starting job");
	});

	agenda.on('complete', function(job) {
	  console.log("> Finished job");
	});
	
	return agenda;
	


}


module.exports = mailTask;