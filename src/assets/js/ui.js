const html = document.querySelector('html');
const body = document.querySelector('body');

var Init = {
	defaults : function(){
		this.resize();
		window.addEventListener("resize", this.resize);
	},
	resize : function(){
		Init.getBrowserSize();

		Init.breakpoint = window.matchMedia('(min-width:992px)').matches;
		if(!Init.breakpoint){
			$('html').removeClass('is-desktop');
			$('html').addClass('is-mobile');
		}else{
			$('html').removeClass('is-mobile');
			$('html').addClass('is-desktop');
		}
	},
	getBrowserSize : function(){
		this.bodyHeight = Math.max(
			document.body.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.clientHeight,
			document.documentElement.scrollHeight,
			document.documentElement.offsetHeight
		);
		this.bodyWidth = Math.max(
			document.body.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.clientWidth,
			document.documentElement.scrollWidth,
			document.documentElement.offsetWidth
		);
	},
};

var Common = {
	init : function(){
		this.scrolling();
		this.location();
		this.event();
		window.addEventListener('mousewheel', Common.scrolling);
		window.addEventListener('touchmove', Common.scrolling);
		$(window).scroll(function(){
			Common.scrolling();
		});
	},
	scrolling : function(e){
		var scrollTop = $(window).scrollTop();
		var gnbTop = $('#header').height();
		gnbTop = Number(gnbTop);

		if(scrollTop > 0){
			$('html').addClass('is-scrolled');
		}else{
			$('html').removeClass('is-scrolled');
		}

		if(scrollTop > 0){
			$('html').addClass('header-fixed');
		}else{
			$('html').removeClass('header-fixed');
		}

		//scrollbar bottom check
		if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
			$('html').addClass('is-bottom');
		}else{
			$('html').removeClass('is-bottom');
		}
	},
	location: function(){
		var dep1 = $("main").attr("data-dep1");
		var dep2 = $("main").attr("data-dep2");
		var dep3 = $("main").attr("data-dep3");

		$('.location .dep1 > a span').text($('.sitemap [data-dep1="'+ dep1 +'"]').text());
		$('.location .dep2 > a span').text($('.sitemap [data-dep2="'+ dep2 +'"]').text());
		if(dep3 !== ''){
			$('.location .dep3 > a span').text($('.sitemap [data-dep3="'+ dep3 +'"]').text());
		}else{
			$('.location .dep3').empty();
			$('.location .dep3').addClass('hide');
		}

		$('.sitemap [data-dep1="'+ dep1 +'"]').closest('li').siblings().clone().appendTo($('.location .dep1 > ul'))
		$('.sitemap [data-dep2="'+ dep2 +'"]').closest('li').siblings().clone().appendTo($('.location .dep2 > ul'))
		$('.sitemap [data-dep3="'+ dep3 +'"]').closest('li').siblings().clone().appendTo($('.location .dep3 > ul'));

		$('.location > ol > li:not(.home) > a').on('click',function(e){
			e.preventDefault();
			var $my = $(this).closest('li');
			if(!$($my).hasClass('active')){
				$($my).siblings('li').removeClass('active');
				$($my).addClass('active');
			}else{
				$($my).removeClass('active');
			}
		});
		$(document).on('click', function(e){
			if ($('.location').has(e.target).length === 0){
				$('.location > ol > li').removeClass('active');
			}
		});
	},
	event : function(){
		//custom scroll
		$("div:not(.card-wrap) > .overflow-y-scroll").mCustomScrollbar({
			theme:"dark"
		});

		skrollr.init({
			forceHeight: false,
			mobileCheck: function(){
				if((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
					// mobile device
				}
			}
		});

		//datepicker
		$('.form-datepicker').datepicker({
			changeMonth: true,
			changeYear: true,
			monthNames: ["01","02","03","04","05","06","07","08","09","10","11","12"],
            monthNamesShort: ["01","02","03","04","05","06","07","08","09","10","11","12"],
            dayNamesMin: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            showMonthAfterYear:true,
            showOtherMonths: true,
            changeMonth: true,
            changeYear: true,
			dateFormat: "yy-mm-dd",
			gotoCurrent: true,
			beforeShow: function(input, inst) {
				$('#ui-datepicker-div').addClass('datepicker-box');
			}
		});
	}
};

var Header = {
	init : function(){
		this.gnb();
		this.menu();
		this.sitemap();
		this.search();
	},
	gnb : function(e){
		var dep1 = $("main").attr("data-dep1");
		var dep2 = $("main").attr("data-dep2");
		var dep3 = $("main").attr("data-dep3");

		$('.gnb [data-dep1="'+ dep1 +'"]').parent().addClass('active');

		$('.gnb .dep1 > li > a').on('mouseenter focus', function(e){
			e.preventDefault();
			if($('html').hasClass('is-desktop')){
				$(this).parent().siblings().find('a').removeClass('hover');
				$(this).addClass('hover');
			}
		});
		$('.gnb').on('mouseleave', function(e){
			e.preventDefault();
			if($('html').hasClass('is-desktop')){
				$('.gnb .hover').removeClass('hover');
			}
		});
	},
	menu: function(e){
		$('.header-menu > a').on('click',function(e){
			e.preventDefault();
			$('html').addClass('show-menu');
		});
		$('.mobile-menu-close').on('click',function(e){
			e.preventDefault();
			$('html').removeClass('show-menu');
		});
	},
	sitemap: function(){
		var dep1 = $("main").attr("data-dep1");
		var dep2 = $("main").attr("data-dep2");
		var dep3 = $("main").attr("data-dep3");

		$('.sitemap [data-dep1="'+ dep1 +'"]').parent().addClass('active');
		$('.sitemap [data-dep2="'+ dep2 +'"]').parent().addClass('active');
		if(dep3 !== ''){
			$('.sitemap [data-dep3="'+ dep3 +'"]').parent().addClass('active');
		}

		$('.btn-hamburger').on('click',function(e){
			e.preventDefault();
			$('html').addClass('show-sitemap');
		});
		$('.sitemap .dep1 > li > a').on('click', function(e){
			if($('html').hasClass('is-mobile')){
				e.preventDefault();
				$(this).parent('li').toggleClass('active');
			}
		});
		$('.btn-sitemap-close').on('click',function(e){
			e.preventDefault();
			$('html').removeClass('show-sitemap');
		});
	},
	search: function(){
		$('.header-search-btn').on('click',function(e){
			e.preventDefault();
			$('.header-search').addClass('active');
			$('.header-search .form-control').focus();
		});
		$('.header-search .form-control').on('blur',function(e){
			$('.header-search').removeClass('active');
		});
	}
}

var Footer = {
	init : function(){
		this.familysite();
	},
	familysite : function(){
		$('.familysite .btn-open').on('click',function(){
			$('.familysite .dropdown').removeClass('active')
			$(this).closest('.dropdown').addClass('active');
		});
		$(document).on('click', function(e){
			if ($('.dropdown').has(e.target).length === 0){
				$('.dropdown').removeClass('active');
			}
		});
	}
};

Init.defaults();
Common.init();
Header.init();
Footer.init();

$(document).ready(function() {

});
