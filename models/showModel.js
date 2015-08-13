var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var showModel = new Schema({
  tvdbId: Number,
  name: String,
  airsDayOfWeek: String,
  airsTime: String,
  firstAired: Date,
  contentRating: String,
  genre: [String],
  network: String,
  overview: String,
  rating: Number,
  imdbId: String,
  runtime: Number,
  fanart: String,
  status: String,
  poster: String,
  actors: [{
    Image: String,
    Name: String,
    Role: String
  }],
  subscribers: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  }],
  episodes: [{
      season: Number,
      episodeNumber: Number,
      episodeName: String,
      firstAired: Date,
      image: String,
      overview: String,
      torrent: [{
            format: String,
            link: String
        }]
  }]
});


module.exports = mongoose.model('shows', showModel );