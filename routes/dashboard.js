var express = require('express');
var router = express.Router();
var cdn = require("./module/CDN.js")

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render("dashboard", {"cdn":cdn });
});

module.exports = router;