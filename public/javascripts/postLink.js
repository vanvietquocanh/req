"use strict"
var reLink = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/m
jQuery(document).ready(function($) {
	function submitLink() {
		$("#submit").click(function(event) {
			if(reLink.test($("#link").val())){
				$("#submit").off("click")
				$("#submit").html("<i></i>")
				$("#submit i").addClass('fas fa-circle-notch fa-spin')
				var data = {
					link    : $("#link").val(),
					os 	    : $("#os").val(),
					country : $("#country").val()
				}
				$.post('/test', data, function(data, textStatus, xhr) {
					console.log(data);
					$("#lastLink").text(data.res)
					$("#countryLink").text(data.Country)
					$("#osLink").text(data.OS)
					$("#submit").empty().text("Submit")
					submitLink();
				});
			}
		});
	}
	submitLink();
	$("#link").keydown(function(event) {
		if(event.key==="Enter"&&event.keyCode===13){
			$("#submit").click()
		}
	});
});