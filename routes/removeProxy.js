var express = require('express');
var router = express.Router();
var cdn = require("./module/CDN.js")
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectID = require('mongodb').ObjectID
const url = require("./module/urlMongo.js");
const dbName = 'requestSSH';

/* GET home page. */
router.post('/', function(req, res, next) {
	MongoClient.connect(url,{
			useUnifiedTopology: true,
			useNewUrlParser: true,
			}, function(err, client) {
	  	assert.equal(null, err);
	  	var db = client.db(dbName);
	  	db.collection("proxylist").deleteOne({"_id":ObjectID(req.body.id)},(err, result)=>{
	  		db.collection("proxylist").findOne({"geo":req.body.geo},(err,geo)=>{
		  		if(!err){
		  			if(geo===null){
		  				db.collection("orderGeo").deleteOne({"geo":req.body.geo},(err, result)=>{
		  					client.close();
		  					if(!err){
		  						res.send("success")
		  					}else{
		  						res.send("error")
		  					}
		  				})
		  			}else{
		  				client.close();
		  				res.send("success")
		  			}
		  		}else{
		  			client.close();
		  			res.send("error")
		  		}
	  		})
	  	})
	});

});

module.exports = router;