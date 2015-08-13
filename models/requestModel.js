var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var requestModel = new Schema({
	
	tvdbId: {type: Number},
	name:{type: String},
	overview:{type: String},
	firstAired:{type: Date},
	network:{type: String},
	imdbId:{type: String},
	poster:{type: String},
	status:{type: String},
	runtime:{type: Number},
	genres:[String],
	reqested: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
});



module.exports = mongoose.model('requests', requestModel);