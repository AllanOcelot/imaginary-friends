var express = require('express');
var lodash = require('lodash');
var assert = require('assert')
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;

const PORT = 3000;
const server = express();

//Variables here
let db;


//Mongoose Connection
MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    // Client returned
    db = client.db('imaginaryfriends');
    console.log('connected');
    //client.close();
});

server.get('/', function(req, res){
    res('')
});

//If user GET's the this route, we want to provide a team via ID if specified, if not, return all VISIBLE teams
server.get('/api/teams/:id', function(req, res){
    var collection = db.collection("teams");
    //If user has requested a team via specific id
    if(req.params.id){
        var id = req.params.id;
        var o_id = new ObjectId(id);
        collection.find({"_id":o_id}).toArray(function(err, cursor) {
            if(err){
                console.log(err);
            }else{
                console.log(cursor);
            }
        });
        console.log('Client requested team via id ' + o_id + '.');
    //If user has not included an id in their request
    }else{
        collection.find({"visible": true}).toArray(function(err, cursor) {
            if(err){
                console.log(err);
            }else{
                console.log(cursor);
            }
        });
        console.log('Client did not request user via ID');
    }
});


server.listen(3000, function(){
    console.log('Testing');
});
