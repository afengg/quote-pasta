//server.js
'use strict';
//require mongoose config
require('./mongooseconfig');

//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Item = require('./model/item');
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = 3001;
// db config
mongoose.connect('mongodb://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@ds023694.mlab.com:23694/quotepasta');
//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent items
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});
//adding the /items route to our /api router
router.route('/items')
  //retrieve all items from the database
  .get(function(req, res) {
    //looks at our item Schema
    Item.find(function(err, items) {
      if (err)
        res.send(err);
      //responds with a json object of our database items.
      res.json(items)
    });
  })
  //post new item to the database
  .post(function(req, res) {
    var item = new Item();
    //body parser lets us use the req.body
    item.author = req.body.author;
    item.quote = req.body.quote;
    item.tags = req.body.tags;
    item.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'item successfully added!' });
    });
  });
//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});