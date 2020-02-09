$(document).ready(function () {
	var titleCurrent = window.location.pathname.split("/")[1].replace("-"," ")
	titleCurrent = titleCurrent.toLowerCase().replace(/\b[a-z]/g, function(letter) {
	    return letter.toUpperCase();
	});
	$("#title-current").text(titleCurrent)
	$(`a[href$='${window.location.pathname}']`).parent().addClass('active')
	$('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});