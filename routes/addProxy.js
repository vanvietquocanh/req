var express = require('express');
var router = express.Router();
var cdn = require("./module/CDN.js")
const MongoClient = require('mongodb').MongoClient;
const url = require("./module/urlMongo.js");
const assert = require('assert');
const dbName = 'requestSSH';
var x = 0;
/* GET home page. */
router.post('/', function(req, res, next) {
	MongoClient.connect(url,{
			useUnifiedTopology: true,
			useNewUrlParser: true,
			}, function(err, client) {
	  	assert.equal(null, err);
	  	var db = client.db(dbName);
	  	req.body.index = x++;
	  	db.collection("proxylist").insertOne(req.body,(err, proxy)=>{
	  		db.collection("orderGeo").findOne({"geo":req.body.geo},(err,result)=>{
				if(result===null){
					db.collection("orderGeo").insertOne(
						{"geo":req.body.geo, count:0},
						(err, order)=>{
	  						client.close();
				  			if(!err){
				  				res.send("success")
				  			}else{res.send("errors")}
					})
				}else{
					db.collection("orderGeo").updateOne(
						{"geo":req.body.geo},
						{"$set":{count:result.count+2}},
						(err, order)=>{
	  						client.close();
				  			if(!err){
				  				res.send("success")
				  			}else{
				  				res.send("errors")
				  			}
					})
				}
	  		})
	  	})
	});
});

module.exports = router;