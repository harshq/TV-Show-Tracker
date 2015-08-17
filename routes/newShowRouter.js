var express = require('express');
var request = require('request');
var TVDB = require("node-tvdb/compat");
var tvdb = new TVDB("B5D2874D61BF48DA");
var async = require('async');
var sugar = require('sugar');

var routes = function(Show,updateShows,mailTask,newShowTask){

var newShowRouter = express.Router();

//---------------------------------------------Middleware--------------------------------------------------------
	
	newShowRouter.use('/:tvdbId',function(req,res,next){
    var tvdbId = req.params.tvdbId;
    tvdb.getSeriesAllById(tvdbId, function(err, response) {
				if(err){
                    if(err.statusCode === 404){
                        res.send('Show Not Found!').status(404);
                    }else{
					   res.send(err).status(500);
                    }
				}else if(response.id === tvdbId){
					req.show = response ;
                    //res.json(response);
                    next();
                }else{
                    res.send('Show Not Found!').status(404);
                }
    });
      
},function(req,res,next){
    var tvdbId = req.params.tvdbId;
    tvdb.getActors(tvdbId, function(err, response) {
                if(err){
                    if(err.statusCode === 404){
                        res.send('Actors Not Found!').status(404);
                    }else{
					   res.send(err).status(500);
                    }
				}else if(response){
					req.actors = response ;
                    //res.json(response);
                    next();
                }else{
                    res.send('Show Not Found!').status(404);
                }
    });      
        
},function(req,res,next){
    
    request('http://eztvapi.re/show/'+req.show.IMDB_ID, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            req.torrentData = JSON.parse(body);
              next();
              
          }else{
            req.torrentData = "No Torrent Data available";
            next();
          }
        
        
        
        });
});
//-----------------------------------------------------------------------------------------------------
	
newShowRouter.route('/:tvdbId')
    .post(function(req,res){
    
    
    
    var series =  req.show;
    var actors = req.actors;
    var episodes = req.show.Episodes;
    var torrentData = req.torrentData.episodes;
	var images = req.torrentData.images;

    
    //res.send(episodes).status(200);
    
    var show = new Show({
           tvdbId: series.id,
           name: series.SeriesName,
           airsDayOfWeek: series.Airs_DayOfWeek,
           airsTime: series.Airs_Time,
           firstAired: series.FirstAired,
           contentRating: series.ContentRating,
           genre: series.Genre.split('|').filter(Boolean),
           network: series.Network,
           overview: series.Overview,
           rating: series.Rating,
           imdbId: series.IMDB_ID,
           runtime: series.Runtime,
           fanart: images.fanart,
           status: series.Status,
           poster: images.poster,
           actors: [],
           episodes:[]
    });
    
    episodes.forEach(function(element, index , array){
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
    
    actors.forEach(function(element, index , array){
        //for(var x in element){
            show.actors.push({
                  Image: 'http://thetvdb.com/banners/'+element.Image,
                  Name: element.Name,
                  Role: element.Role
            });
        //}
    });
    
    
    torrentData.forEach(function(element, index, array){
        show.episodes.forEach(function(el, ind, arr){
           if(element.season == el.season && element.episode == el.episodeNumber){
                
               
               for(var x in element.torrents){
				   //console.log(x +' is '+ element.torrents[x].url);
				   //console.log(el.torrent);
				   el.torrent.push({
                    	format: x || null,
                    	link: element.torrents[x].url || null
                	});
			   }
               
               
//               console.log('from torrent file -> season: '+element.season+' episode: '+element.episode);
//               console.log('from show -> season: '+el.season+' episode: '+el.episodeNumber);
//               console.log('torrent : '+element.torrents);
//               console.log('------------------------------------------------------')
			   
                    
               
           } 
        });
        
        
    });
    
	show.save(function(err){
		if(err){
			res.send('Unexpected Error!');
		}else{	
			
			//updateShows();
			//updateShows.schedule('in 20 seconds', 'Update show info', {id : show._id});
			//updateShows.schedule('in 20 seconds', 'Update show info', {id : show._id}).repeatEvery('20 seconds');
			//updateShows.every('1 minute', 'Update show info',{id : show._id});
			
			var alertDate = Date.create('Next ' + show.airsDayOfWeek + ' at ' + show.airsTime).rewind({hour: 1});
			
			//console.log('SCHEDULE DATE :'+alertDate);
			//------------------------------
			updateShows.schedule('in 10 minutes', 'updateShowInfo', {id : show._id}).repeatEvery('30 minutes').save();
			mailTask.schedule(alertDate, 'notifyUserEpisode', {id : show._id, date : alertDate}).repeatEvery('1 week').save();
			newShowTask.schedule('in 2 minutes', 'notifyUserShow', {tvdbId : show.tvdbId});
			//------------------------------
			//mailTask.schedule('in 20 seconds', 'notifyUserEpisode', {id : show._id , date : alertDate}).repeatEvery('1 minute').save();
			res.json(show).status(200);
		}
			
	});
	
    
    
});
    
//-----------------------------------------------------------------------------------------------------------	

	return newShowRouter;

};

module.exports = routes;