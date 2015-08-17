var nodemailer = require('nodemailer');
//var agenda = require('agenda')({ db: { address: 'mongodb://localhost/remindme' } });
var agenda = require('agenda')({db: {  address: 'mongodb://harshana:remindme++12@ds031203.mongolab.com:31203/remindme'} });


var mailTask = function(ReqShow){
	
	agenda.define('notifyUserShow', function(job, done) {
	var data = job.attrs.data;
	var tvdbId = data.tvdbId;
	//var today = new Date();
	//var showName = "";
		
  	//console.log('Sending emails for : '+id);
	
		ReqShow.findOne({tvdbId : tvdbId }).populate('reqested').exec(function(err, reqShow){
	
		var emails = reqShow.reqested.map(function(user) {
			if(user.notifications === 'true'){
				return user.email;
			}
		}); 
			
		
		
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
					subject: reqShow.name +' is now on RemindMe!', 
					html: '<h3>'+reqShow.name +' is now on RemindMe! </h3>' +
       '<p>As you requested, we added '+reqShow.name+' to RemindMe!. Now you can get the latest updates if you subscribe to the show. Cheers!</p>'
					
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
	  console.log(">>>> Starting mailing job");
	});

	agenda.on('complete', function(job) {
	  console.log(">>Back to main thread");
	});
	
	return agenda;
	


}


module.exports = mailTask;