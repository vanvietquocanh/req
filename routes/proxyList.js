var express = require('express');
var router = express.Router();
var cdn = require("./module/CDN.js")
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'requestSSH';

/* GET home page. */
router.get('/', function(req, res, next) {
	MongoClient.connect(url,{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		}, function(err, client) {
		  	assert.equal(null, err);
		  	var db = client.db(dbName);
		  	db.collection("proxylist").find().toArray((err, proxys)=>{
		  		client.close();
				res.render("proxyList", {"cdn":cdn, proxylist:proxys});
	  	})
	});
});

module.exports = router;