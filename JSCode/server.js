var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Defining a route from localhost:3000/ to ./client/index.html
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//Defining resource filter from /js/** to ./client/js/**
app.use('/js', express.static(__dirname +'/js'));


//Running server on port 3000. On started executin logging function.
//A typical example of async function call.
server.listen(3000, function(){
	console.log('Started on port 3000...');
});


var bodyParser = require('body-parser') //analyse the responses
app.use(bodyParser.json());//use json format

var Client = require('node-rest-client').Client; //creat client
client = new Client();

var args = {
	//data: {"destUrl": "http://localhost:3000/"},  //Here is my own IP address

	data: {"destUrl": "http://130.230.158.176:3000/"},  //Here is my own IP address
	headers:{"Content-Type": "application/json"}
};



/*Subscribe the notification of zone 1~5 */

client.get("http://escop.rd.tut.fi:3000/RTU", function(data, response){ //check system is online
	console.log(JSON.parse(data));
	client.post("http://escop.rd.tut.fi:3000/RTU/CNV8/events/Z1_Changed/notifs", args, function(data,response) {
	});
	client.post("http://escop.rd.tut.fi:3000/RTU/CNV8/events/Z2_Changed/notifs", args, function(data,response) {
	});
	client.post("http://escop.rd.tut.fi:3000/RTU/CNV8/events/Z3_Changed/notifs", args, function(data,response) {
	});
	client.post("http://escop.rd.tut.fi:3000/RTU/CNV8/events/Z4_Changed/notifs", args, function(data,response) {
	});
	client.post("http://escop.rd.tut.fi:3000/RTU/CNV8/events/Z5_Changed/notifs", args, function(data,response) {
	});
});

//var palletNumber = 0;
var data;
var time=0;
var locationID = '';
var mySocket;
//var palletIDList = [];
io.on('connection', function(socket){
	mySocket = socket;
});

app.post('/', function(req,res){ //routes http post requests
	console.log(req.body);
	data = req.body;
	console.log(req.body.senderID + ' has got pallet #' + req.body.payload.PalletID);//get notification once the pallet Id in zone1~5 changes


	if (locationID != data.id && req.body.payload.PalletID != -1 ) {

		mySocket.emit('palletData', {
			senderID: data.senderID,
			location: data.id,
			palletID: data.payload.PalletID
		});
		locationID = data.id;

	}

});


var service_body_args = {

	data: {"destUrl": "http://escop.rd.tut.fi:3000/"},  //Here is server IP address
	headers:{"Content-Type": "application/json"}
};

// send data to server
client.post('http://escop.rd.tut.fi:3000/fmw', function(req, res){

	io.on('connection', function(socket){

		socket.on('LoadPaper', function(){
			client.post('http://130.230.141.228:3000/RTU/ROB7/services/LoadPallet', service_body_args, function(data, response){});
			setTimeout(function(){
			client.post('http://130.230.141.228:3000/RTU/CNV7/services/TransZone35', service_body_args, function(data, response){});
			},10);
		});

		socket.on('TransZone12', function(){
			client.post('http://130.230.141.228:3000/RTU/CNV8/services/TransZone12', service_body_args, function(data, response){});
		});

		socket.on('TransZone23', function(){
			client.post('http://130.230.141.228:3000/RTU/CNV8/services/TransZone23', service_body_args, function(data, response){});
		});

		socket.on('TransZone35', function(){
			client.post('http://130.230.141.228:3000/RTU/CNV8/services/TransZone35', service_body_args, function(data, response){});
		});

		socket.on('TransZone14', function(){
			client.post('http://130.230.141.228:3000/RTU/CNV8/services/TransZone14', service_body_args, function(data, response){});
		});

		socket.on('TransZone45', function(){
			client.post('http://130.230.141.228:3000/RTU/CNV8/services/TransZone45', service_body_args, function(data, response){});
		});
	});
});







