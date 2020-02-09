var express = require('express');
var router = express.Router();
var cdn = require("./module/CDN.js")
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
var ObjectID = require('mongodb').ObjectID
const dbName = 'requestSSH';

/* GET home page. */
router.get('/', function(req, res, next) {
	MongoClient.connect(url,{
			useUnifiedTopology: true,
			useNewUrlParser: true,
			}, function(err, client) {
	  	assert.equal(null, err);
	  	var db = client.db(dbName);
		db.collection("proxylist").distinct("geo",(err, geo)=>{
	  		client.close();
	  		if(!err){
				res.render("index", {"cdn":cdn, geo:geo});
	  		}else{
	  			res.send(err)
	  		}
	  	})
	});
});


module.exports = router;

//
//Mozilla/5.0 (iPod; CPU iPhone OS 12_0 like macOS) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/12.0 Mobile/14A5335d Safari/602.1.50