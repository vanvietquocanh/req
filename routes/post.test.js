var express = require('express');
var router = express.Router();
var axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = require("./module/urlMongo.js");
const dbName = 'testlive';
var changeName = require("./module/changeName.js")
const uuidv1 = require('uuid/v4');

/* GET home page. */
router.post('/', function(req, res, next) {
	function request(proxies) {
		var dataLead = {
			OS 		: req.body.os,
			Country : req.body.country
		}
		var urlR = req.body.link+`${uuidv1()}`;
		console.log(changeName.userAgent[changeName.OS.indexOf(req.body.os)])
		axios({
		  method: 'get',
		  url: urlR,
		  timeout: 600000,
		  headers:{
		  	"User-Agent" : changeName.userAgent[changeName.OS.indexOf(req.body.os)]
		  },
		  maxRedirects: 1000,
		  proxy: {
		    host: proxies.ip,
		    port: Number(proxies.port)
		  }
		}).then(function (response) {
			console.log(response)
			dataLead.res = response.request._redirectable._currentUrl
			console.log(dataLead,"res1")
			res.send(dataLead)
		}).catch(function(err) {
			console.log(err)
			if(err.request._currentUrl){
				dataLead.res = err.request._currentUrl
				console.log(dataLead,"err1")
				res.send(dataLead)
			}else{
				dataLead.res = err.response.data.error
				console.log(dataLead,"err2",err.response)
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
	  		if(!err){
  				db.collection("orderGeo").findOne({"geo":req.body.country},(err, order)=>{
  					if(!err){
							db.collection("orderGeo").updateOne(
								{"geo":req.body.country},
								{"$set":{
									"count":order.count+1
									}
								},
								(err, update)=>{
	  							client.close();									
								request(proxies[order.count%proxies.length])
							})
  					}else{
	  					client.close();
  						res.send("error")
  					}
  				})
	  		}else{
	  			client.close();
	  			res.send("error")
	  		}
	  	})
	});
});


module.exports = router;

//Mozilla/5.0 (iPod; CPU iPhone OS 12_0 like macOS) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/12.0 Mobile/14A5335d Safari/602.1.50
//