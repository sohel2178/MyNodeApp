const express = require('express');
const path = require('path');
const cors = require('cors')

const bodyParser = require('body-parser');

const hbs = require('express-handlebars');

const userRoute = require('./routes/user');
const userApiRoute = require('./routes/api_user');
const aboutRoute = require('./routes/about');
const postApiRoute = require('./routes/api_post');

const app = express();

app.use(cors());

const mongoose = require('mongoose');

//Connect MongoDb
mongoose.connect('mongodb://sohel-app:SbRdmLUUHVoIE4RJ@sohel-app-shard-00-00-zzcpv.mongodb.net:27017,sohel-app-shard-00-01-zzcpv.mongodb.net:27017,sohel-app-shard-00-02-zzcpv.mongodb.net:27017/test?ssl=true&replicaSet=sohel-app-shard-0&authSource=admin');

const db = mongoose.connection;

// View Engine Setup
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layouts'}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

// Seeting Middle Ware For Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Public Directory
app.use(express.static(path.join(__dirname, 'public')));

// Now The Access Controlling Part
app.use((req,res,next) => {

	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization");

	if(req.method ==='OPTIONS'){
		res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');

		return res.status(200).json({});
	}

	next();

});



app.get('/',(req,res,next)=>{
    res.render("home");
});
app.get('/adduser',(req,res,next)=>{
    res.render("adduser");
});
app.use('/api/users', userApiRoute);
app.use('/api/blog/posts', postApiRoute);
app.use('/users', userRoute);
app.use('/about', aboutRoute);



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('App is Running On ',PORT);
});

