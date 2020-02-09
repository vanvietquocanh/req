var express = require('express');
var router = express.Router();
var axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'requestSSH';
var changeName = require("./module/changeName.js")

/* GET home page. */
router.post('/', function(req, res, next) {
	function request(proxies) {
		var dataLead = {
			OS 		: req.body.os,
			Country : req.body.country
		}
		axios({
		  method: 'get',
		  url: req.body.link,
		  timeout: 600000,
		  headers:{
		  	"User-Agent" : changeName.userAgent[changeName.OS.indexOf(req.body.os)]
		  },
		  maxRedirects: 1000,
		  proxy: {
		    host: proxies.ip,
		    port: proxies.port
		  },
		}).then(function (response) {
			dataLead.res = response.request._redirectable._currentUrl
			res.send(dataLead)
		}).catch(function(err) {
			if(err.request._currentUrl){
				dataLead.res = err.request._currentUrl
				res.send(dataLead)
			}else{
				dataLead.res = err.response.data.error
				res.send(dataLead)
			}
		})
	}
	MongoClient.connect(url,{
			useUnifiedTopology: true,
			useNewUrlParser: true,
			}, function(err, client) {
	  	assert.equal(null, err);
	  	var db = client.db(dbName);
	  	db.collection("proxylist").find({"geo":req.body.country}).sort({"index":1}).toArray((err, proxies)=>{
	  		// client.close();
	  		if(!err){
	  			if(proxies.length>1){
	  				db.collection("orderGeo").findOne({"geo":req.body.country},(err, order)=>{
	  					if(!err){
  							db.collection("orderGeo").updateOne(
  								{"geo":req.body.country},
  								{"$set":{
  									"count":order.count+1
  									}
  								},
  								(err, update)=>{
  								request(proxies[order.count%proxies.length])
  							})
	  					}else{
	  						res.send("error")
	  					}
	  				})
	  			}else{
  					request(proxies)
	  			}
	  		}else{
	  			res.send("error")
	  		}
	  	})
	});
});


module.exports = router;

//
//Mozilla/5.0 (iPod; CPU iPhone OS 12_0 like macOS) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/12.0 Mobile/14A5335d Safari/602.1.50