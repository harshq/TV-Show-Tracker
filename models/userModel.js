var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userModel = new Schema({
	firstName: {type: String},
	lastName:{type: String},
	email:{type: String, unique: true},
	password:{type: String},
	createdOn:{type: Date},
	genre:[String],
	userType: {type: String , default: 'user'},
	subscribed:[{type: mongoose.Schema.Types.ObjectId, ref: 'shows'}],
	image:{type: String, default: 'images/user2-160x160.png'},
	notifications:{type: String, default: 'true'}
},{ versionKey: false });




module.exports = mongoose.model('users', userModel);