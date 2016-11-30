/*
 * 3rd Party Modules
 */
'use strict';
var express      = require('express');
var exphbs       = require('express-handlebars');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var MongoStore   = require('connect-mongo')(session);
var multer       = require('multer');
var passport     = require('passport');

/*
 * Custom Modules
 */
var db           = require('./db');
var conf         = require('./config');
var fetchFiles   = require('./helpers').fetchFiles;


/*
 * Initialize
 */
var app          = express();

db.init();

app.use(cookieParser()); // Read Cookies
app.use(bodyParser.json()); // get information request in json format
app.use(bodyParser.urlencoded({ extended: true }));

var hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.html',
  partialsDir: [
      'views/partials/',
  ]
})

app.use(session({
  secret: conf.sessionSecret,
  store: new MongoStore({ url: conf.db }),
  resave: true,
  saveUninitialized: true
}))

/*
 * Models
 */
var Endpoint = require('./models/endpoint');

app.engine('.html', hbs.engine);
app.set('view engine', '.html');

app.use(express.static('public'));

/*
 * Routes
 */
require('./passport-config')(app)

// Admin Route
var adminRoute = require('./admin');
fetchFiles(__dirname + '/admin/', function(name){
    app.use('/', adminRoute[name]);
})


// app.get('/api/v2/:endpoint',(req,res) => {
// 	db.getEndpoint(req.params.endpoint).find({}).toArray( (err,endpoint) => {
// 				if (err)
// 					console.log(err);

// 				res.json(endpoint);
// 			})
// })

// app.get('/', (req,res) => {
// 	res.render('index')
// })

// app.get('/login', (req,res) => {
// 	res.render('login');
// })

// app.post('/login', (req,res) => {
// 	console.log(req.body);
// })

// app.post('/endpoint', (req,res) => {
// 	db.mongoDb.collection('profile-info').insert({
// 		name: 'profile-info',
// 		url: '/profile-info',
// 		fields: [
// 			{name: 'String'},
// 			{address: 'String'}
// 		]
// 	})
// })

// 404 Page Not Found
app.use( (req, res, next) => {
    var err = new Error('404');
    err.status = conf.messages['404'].status;
    res.status(err.status).render('error',{
        status: conf.messages['404'].status,
        title: conf.messages['404'].title,
        description: conf.messages['404'].description
    });
});

// 500 Page Not Found
app.use( (err, req, res, next) => {
    res.status(conf.messages['500'].status).render('error',{
        status: conf.messages['500'].status,
        title: conf.messages['500'].title,
        description: conf.messages['500'].description
    });
});


module.exports = app