'use strict';

const config		= require(__dirname + '/config/config');
const router		= require(__dirname + '/config/router');
const express 		= require('express');
const session 		= require('express-session');
const bodyParser 	= require('body-parser');
const winston		= require('winston');
let io 				= require('socket.io')
let http 			= require('http')
// var formiddable 	= require('formiddable');
// const multer		= require('multer');
const cors 			= require('cors')

var corsOptions = {
  origin: 'localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}



let app;
let handler;

function start() {
	if (handler) {
		handler.close();
	}

	// create express app
	app = express();

	// parse application/json
	app.use(require('body-parser').json());
	app.use(require('body-parser').urlencoded({extended: false}));
	// app.use(cors(corsOptions))
	// set config
	config.use(process.env.NODE_ENV);

	// notify that the application is starting
	winston.log('info', 'Starting', config.APP_NAME, 'on', config.ENV, 'environment');

	// app.use(multer({dest:__dirname+'/../frontend/assets/uploads/'}).single('file'));
	// Serves the static content in the frontend folder
	// app.use(express.static(config.DIR.ASSETS));
	// lets you use HTTP verbs such as PUT and DELETE in places where the client doesn't support it
	app.use(require('method-override')());
	// parse application/x-www-form-urlencoded
	app.use(require('compression')());
	// configure the session store
	app.use(session({
		resave : true,
		secret : config.COOKIE_SECRET,
		rolling : true,
		saveUninitialized : true,
		name : config.COOKIE_NAME,
		cookie : {
			maxAge: 60 * 1000 * 60 * 2 // 2 hours
		}
	}));



	app.options("/api/login", cors()) //special case for login CORS problem
	app.use(function(req, res, next) {
	    res.header('Access-Control-Allow-Origin', "*");
	    res.header("Access-Control-Allow-Credentials", true);
	    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    	res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
		
	    next();
	})



	// app.use(function(req, res, next) {
	//     res.header('Access-Control-Allow-Origin', "http://localhost:8080");
	//     res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	//     res.header('Access-Control-Allow-Headers', 'Content-Type');
	//     next();
	// })




	app.use(router(express.Router()));
	winston.log('info', 'Server listening on port', config.PORT);
	var server = app.listen(config.PORT);
	// http = http.Server(app)
	io = io.listen(server)
	// io.set('origins', '*:*');
	io.set('transports', ['websocket','polling'])
	io.on('connection', function(socket){
	  	console.log('Monitoring on with n connections');

	  	socket.on('message', function(message) {
	        console.log("Message Received: " + message);
	        io.emit('message', {type:'new-message', text: message});    
    	});
	});
	return server;
}

handler = start();
