var request = require('request');
var TVDB = require("node-tvdb/compat");
var tvdb = new TVDB("B5D2874D61BF48DA");
//var agenda = require('agenda')({ db: { address: 'mongodb://localhost/remindme' } });
var agenda = require('agenda')({db: {  address: 'mongodb://harshana:remindme++12@ds031203.mongolab.com:31203/remindme'} });
var async = require('async');

var updateDatabase = function(Show){


agenda.define('updateShowInfo', function(job, done) {
	var data = job.attrs.data;
	var name = data.name;
  	//console.log('Updating: '+id);
	//console.log(new Date());
//--------------------------------------------------------------	
	
		
		
		Show.findById(id,function(err, show){
				if(err){
					res.status(500).send(err);
				}else{
					
					
					
					
					//console.log('0');
					async.waterfall([
						function(callback) {
							
							
							tvdb.getSeriesAllById(show.tvdbId, function(err, response) {
								if(!err){
									console.log('1');
									callback(null , response);
								}
							 		
							});
							
							
							//callback();
						},
						function(tvdbres , callback) {
						  	//console.log('2');
							
							
							
							request('http://eztvapi.re/show/'+show.imdbId, function (error, response, body) {
								if (!error && response.statusCode == 200) {
									var jsonBody = JSON.parse(body);
									callback(null , tvdbres , jsonBody);
								  } 
								
								
							  });
							
						},
						function(tvdbres, torres , callback) {
							//console.log('3');
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
							//console.log('4');
							
							
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
								console.log('Error while updating the database');
								//res.send('Unexpected Error!').status(500);
							}else{	
								console.log('Database updated');
								console.log(name+" Updated!");
								//res.send('Show Updated!').status(200);
							}

							});
						
						
						

					});
					
					
					
					
					
					
					
					
				}
			});
	
	
	
	
	
	
	
	
	
//--------------------------------------------------------------	
	
	done();
});

agenda.start();
	
	
	
agenda.on('start', function(job) {
var data = job.attrs.data;
var name = data.name;

   
  console.log("Updating "+ name +" "+ new Date());
});
		
	
	return agenda;

};

module.exports = updateDatabase;
