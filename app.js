const http = require("http");
const path = require("path");
const express = require("express");
const hbs = require('express-handlebars');
const bodyParser = require("body-parser");
const errorhandler = require('errorhandler');
const routes = require('./routes/route');
//const favicon = require('favicon');

// Autharization and authentication modules
const passport = require('passport');
const expressSession = require('express-session')({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
});
const connectEnsureLogin = require('connect-ensure-login');
const Author = require('./models/Author');

let app = express();

const port = process.env.PORT ||'3000'


//views engine
//  helpers: {
//    timeago: function(timestamp) {
//        return moment(timestamp).startOf('minute').fromNow();
//    }
//}
app.engine('hbs', hbs.create({
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: [ __dirname + '/views/partials']}).engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');

//bodyParser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json({
    type: function(req) {
        return req.header['content-type'] === '*/*' 
        server.timeout = 1000;
    }
}));
app.use(bodyParser.urlencoded({extended: false}));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//favicon
//app.use(express.favicon());

//CORS
app.use( (_req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requeted-With, Content-Type");
        res.setTimeout(0);
        next();
});

// Sessions configure
app.use(expressSession)

// Passort Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(Author.createStrategy());
passport.serializeUser(Author.serializeUser());
passport.deserializeUser(Author.deserializeUser());

if(process.env.NODE_ENV == 'developent') {
    //only use in development
    app.use(errorhandler())
}



// Creating the routes
app.get('/', routes.index);

app.get('/:articleurl/', routes.article);

app.get('/authors/login/', routes.login);
app.post('/authors/login/', (req, res, next)=>{
    passport.authenticate('local', (err, user, info)=>{
        if (err) {
            return next(err);
        }
        if(!user){
            return res.redirect('/authors/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/newarticle/');
        });
    });
});

app.get('/newarticle/', connectEnsureLogin.ensureLoggedIn(), routes.newarticle);
app.post('/newarticle/', connectEnsureLogin.ensureLoggedIn(), routes.newarticle);

app.get('/editarticle/', connectEnsureLogin.ensureLoggedIn() , routes.editarticle);
app.post('/editarticle/', connectEnsureLogin.ensureLoggedIn() , routes.editarticle);

app.get('/authors/signup/', routes.newauthor);
app.post('/authors/signup/', routes.newauthor);






//Ports and listening
app.set('port', port);
app.listen(port, () => {
  console.log("Up and runnig")
});


