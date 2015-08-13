var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://harshana:remindme++12@ds031203.mongolab.com:31203/remindme');
//mongoose.connect('mongodb://localhost/remindme');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

var Show = require('./models/showModel');
var User = require('./models/userModel');
var ReqShow = require('./models/requestModel');

var userRouter = require('./routes/userRouter')(User);
var showRouter = require('./routes/showRouter')(Show);
var infoRouter = require('./routes/infoRouter')(ReqShow);
var newShowRouter = require('./routes/newShowRouter')(Show);
var subscribeRouter = require('./routes/subscribeRouter')(User,Show);
var unsubscribeRouter = require('./routes/unsubscribeRouter')(User,Show);


app.use('/users', userRouter);
app.use('/shows', showRouter);
app.use('/info',infoRouter);
app.use('/add', newShowRouter);
app.use('/subscribe', subscribeRouter);
app.use('/unsubscribe', unsubscribeRouter);


// app.get('/', function(req,res){
// 	res.send('Server is up and running!');
// });



app.listen(port, function(){
	console.log('App is listening on port 3000');
});