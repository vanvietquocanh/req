'use strict';
jQuery(document).ready(function($) {
	window.onscroll = ()=>{
		if(document.body.scrollTop>20||document.documentElement.scrollTop>20){
			$("nav.navbar.navbar-expand-lg.navbar-light.bg-colorThemesSite").addClass('fixed-top')
		}else{
			$("nav.navbar.navbar-expand-lg.navbar-light.bg-colorThemesSite").removeClass('fixed-top')
		}
	}
});