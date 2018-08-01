//Will house all of our simple CRUD examples, only for testing whilst
//We build the TTOOL - www.github.com/allanocelot/tournament-tool


// BASE SETUP
// =============================================================================

//Import API MOdels
var Team = require('./models/team');


var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/imaginaryfriends'); // connect to our database



// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


router.route('/teams').post(function(req, res) {

        var team = new Team();
        team.name = req.body.name;

        team.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Team created!' });
        });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Imaginary Friends, Booting up ' + port);
