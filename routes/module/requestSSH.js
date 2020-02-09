"use strict"
var request = require("request")
var country = require("./country.js")
var begin = 0;

function getSSH(geo) {
	request.get(`https://bitsocks.us/APIv2?token=8bbfcd5c497b8f369204f478b9daf461&code=${geo}`,(err,response,body)=>{
		if(!err){
			var data = JSON.parse(body);
			// console.log(data);
			begin++;
		}
		if(begin%20===0){
			requestSSH()
		}
	})
}
function loopCall(num) {
	for (var i = num; i < num+20; i++) {
		getSSH(country[i]);
	}
}
function loopCallSub(num) {
	for (var i = num; i < num+2; i++) {
		getSSH(country[i]);
	}
}
var requestSSH = ()=>{
	// if(begin<200){
	// 	loopCall(begin)
	// }else{
	// 	loopCallSub(begin)
	// }
	// getSSH("in")
}
module.exports = requestSSH;