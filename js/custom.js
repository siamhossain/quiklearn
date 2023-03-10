/**
 * Frontend JS
 */

'use strict';

(function($) {
    var rtInsureti = rtInsureti || {};

    /**
	 * Predefined variables.
	 */
    var $window = $(window),
        $document = $(document),
        $body = $('body'),
        $preLoader = $('#preloader'),
        $toTop = $('.rt-scroll-to-top'),
        $intelHeader = $('.intelligent-header'),
        $headerSpace = $('.fixed-header-space'),
        $rtOdoCounters = $('.rtOdoCounter'),
        $elCarousel = $(".element-carousel"),

        $rtMobileMenu = $(".offscreen-navigation .mobile-menu"),
        $rtTabWrappers = document.querySelectorAll('.rt-tabs-wrapper');
    

    /**
	 * Check if element exists.
	 */
	$.fn.elExists = function () {
		return this.length > 0;
	};

	/**
	 * Functions.
	 */
    rtInsureti.functions = {
		preLoaderInit: function () {
			if (!$preLoader.elExists()) {
				return false;
			}

            $window.on('load', function () {
                $preLoader.delay(300).fadeOut('fast', function () {
                    // $(this).remove();
                });
            });
		},

        //sticky header
		scrollToTop: function () {

            $window.on("scroll", function () {
                var scroll = $(window).scrollTop();
                if (scroll < 200) {
                    $("nav.sticky-header").removeClass("affix");
                    $(".place-holder").css("padding-top", "0");
                    $("#header-content-wrap").addClass(".header-content-wrap");
                } else {
                    $("nav.sticky-header").addClass("affix");
                    $(".place-holder").css("padding-top", "90px");
                }
            });

			$toTop.on('click', function () {
				$('html, body').animate(
					{
						scrollTop: 0
					},
					{
						duration: 500,
						easing: 'swing'
					}
				);
			});
		},

        //counter-up
        counterUp: function () {
            $rtOdoCounters.each(function(item) {
                $rtOdoCounters.appear(function(e) {
                    var el = this;
                    var updateData = $(el).attr("data-count");
                    var od = new Odometer({
                        el: el,
                    });
                    od.update(updateData);
                });
            });
        },

        //mobile-menu-dropdown
        mobileMenuDropdown: function () {

            if (!$rtMobileMenu.elExists()) {
				return false;
			}

            $rtMobileMenu.children("li").addClass("menu-item-parent");
            $rtMobileMenu.find(".menu-item-has-children > a").on("click", function(e) {
                e.preventDefault();
                $(this).toggleClass("opened");
                var n = $(this).next(".sub-menu"),
                    s = $(this).closest(".menu-item-parent").find(".sub-menu");
                $rtMobileMenu
                    .find(".sub-menu")
                    .not(s)
                    .slideUp(250)
                    .prev("a")
                    .removeClass("opened"),
                    n.slideToggle(250);
            });
            $rtMobileMenu
                .find(".menu-item:not(.menu-item-has-children) > a")
                .on("click", function(e) {
                    $(".rt-slide-nav").slideUp();
                    $("body").removeClass("slidemenuon");
            });
        },

        //tab-function
        rtTabs: function () {

            // rt-tabs-wrapper
            if ($rtTabWrappers.length) {
                // for scoped
                $rtTabWrappers.forEach((rtTabWrapper) => {
                    var rtTabLabels = rtTabWrapper.querySelectorAll(".rt-tab-nav .rt-tab-nav-item");
                    var rtTabPanes = rtTabWrapper.querySelectorAll(".rt-tab-pane-wrapper .rt-tab-pane");
        
                    if (rtTabLabels.length) {
                        rtTabLabels.forEach(item => {
                            item.addEventListener('click', function() {
        
                                // menu item 
                                rtTabLabels.forEach(lableItem => {
                                    lableItem.classList.remove('active');
                                })
        
                                // tab pane item 
                                rtTabPanes.forEach(paneItem => {
                                    paneItem.classList.remove('active');
                                })
                                // matching by data-rt-tab-id and pass active class
                                var valueMatchingTab = this.getAttribute('data-rt-tab-id');
                                var getMatchingTab = rtTabWrapper.querySelectorAll(`[data-rt-tab-id="${valueMatchingTab}"]`)
                                getMatchingTab.forEach(ele => ele.classList.add('active'))
        
                            })
                        })
                    }
                })
            }
        },

        //mobile-menu-toggle
        mobileToggleMenu: function () {
            $(".sidebarBtn").on("click", function(e) {
                e.preventDefault();
                if ($(".rt-slide-nav").is(":visible")) {
                    $(".rt-slide-nav").slideUp();
                    $("body").removeClass("slidemenuon");
                } else {
                    $(".rt-slide-nav").slideDown();
                    $("body").addClass("slidemenuon");
                }
            });
        },

        //search-overlay
        searchOverlay: function () {
            $('a[href="#template-search"]').on("click", function (event) {
                console.log('hello')
                event.preventDefault();
                var target = $("#template-search");
                target.addClass("open");
                setTimeout(function () {
                    target.find("input").focus();
                }, 600);
                return false;
            });
  
            $("#template-search, #template-search button.close").on(
                "click keyup",
                function (event) {
                    if (
                    event.target === this ||
                    event.target.className === "close" ||
                    event.keyCode === 27
                    ) {
                    $(this).removeClass("open");
                    }
                }
            );
        },

        //mouse-parallax
        mouseParallax: function () {
            var parallaxInstances = [];
            $('.rt-mouse-parallax').each(function(index, element) {
                var $this = $(this);
                $this.attr('id', "rt-parallax-instance-" + index);
                parallaxInstances[index] = new Parallax($("#rt-parallax-instance-" + index).get(0));
            })
        },

        //nice-select
        niceSelect: function () {
            $('select').niceSelect();
        },

        //Elements Carousel
        elementsCarousel: function() {

            var visibleSlides       = null;
            var visibleSlides_xl    = null;
            var visibleSlides_lg    = null;
            var visibleSlides_md    = null;
            var visibleSlides_sm    = null;
            var visibleSlides_xs    = null;
            var slideLoop           = null;
            var slideSpeed          = null;
            var slideSpace          = null;
            var slideAutoPlayDelay  = null;
            var slideEffect         = null;
    
            if ($elCarousel.elExists()) {
    
                var swiperInstances = [];
    
                $elCarousel.each(function(index, element) {
    
                    var $this = $(this);
    
                    // Fetching from data attributes
                    var visibleSlides       = $this.attr("data-visible-slide") ? parseInt($this.attr("data-visible-slide"), 10) : 3;
                    var visibleSlides_xl    = $this.attr("data-visible-xl-slide") ? parseInt($this.attr("data-visible-xl-slide"), 10) : 3;
                    var visibleSlides_lg    = $this.attr("data-visible-lg-slide") ? parseInt($this.attr("data-visible-lg-slide"), 10) : 3;
                    var visibleSlides_md    = $this.attr("data-visible-md-slide") ? parseInt($this.attr("data-visible-md-slide"), 10) : 2;
                    var visibleSlides_sm    = $this.attr("data-visible-sm-slide") ? parseInt($this.attr("data-visible-sm-slide"), 10) : 1;
                    var visibleSlides_xs    = $this.attr("data-visible-xs-slide") ? parseInt($this.attr("data-visible-xs-slide"), 10) : 1;
                    var slideSpeed          = $this.attr("data-speed") ? parseInt($this.attr("data-speed"), 10) : 1000;
                    var slideLoop           = $this.attr("data-loop") === 'true' ? 1 : 0;
                    var slideSpace          = $this.attr("data-space-between") ? parseInt($this.attr("data-space-between"), 10) : 30;
                    var slideAutoPlayDelay  = $this.attr("data-autoplay-delay") ? parseInt($this.attr("data-autoplay-delay"), 10) : 100000000;
                    var slideEffect         = $this.attr("data-effect") ? $this.attr("data-effect") : 'slide';
    
                    // Adding slider and slider-nav instances to use multiple times in a page
                    $this.addClass("instance-" + index);
                    $this.parent().find(".prev").addClass("prev-" + index);
                    $this.parent().find(".next").addClass("next-" + index);
    
                    swiperInstances[index] = new Swiper(".instance-" + index, {
                        slidesPerView: visibleSlides,
                        spaceBetween: slideSpace,
                        speed: slideSpeed,
                        loop: slideLoop,
                        effect: slideEffect,
                        observer: true,
                        observeParents: true,
                        watchSlidesProgress: true,
                        watchSlidesVisibility: true,
                        loopAdditionalSlides: 10,
                        autoplay: {
                            delay: slideAutoPlayDelay
                        },
    
                        navigation: {
                            nextEl: '.swiper-arrow.next',
                            prevEl: '.swiper-arrow.prev'
                        },
    
                        pagination: {
                            el: '.pagination-' + index,
                            type: 'bullets',
                            clickable: true
                        },
    
                        // Responsive breakpoints
                        breakpoints: {
                            0: {
                                slidesPerView: visibleSlides_xs,
                            },
                            640: {
                              slidesPerView: visibleSlides_sm,
                              spaceBetween: 20,
                            },
                            768: {
                              slidesPerView: visibleSlides_md,
                              spaceBetween: 40,
                            },
                            1024: {
                              slidesPerView: visibleSlides_lg,
                              spaceBetween: 50,
                            },
                            1200: {
                              slidesPerView: visibleSlides,
                              spaceBetween: 30,
                            },
                          }
                    });
                });
                
                // Updating the sliders
                setTimeout(function () {
                    swiperInstances.forEach(function(slider) {
                        slider.update();
                    })
                }, 50);
    
                // Updating the sliders in tab
                $('body').on('shown.bs.tab', 'a[data-bs-toggle="tab"], a[data-bs-toggle="pill"]', function (e) {
                    swiperInstances.forEach(function(slider) {
                        slider.update();
                    })
                });
            }
        },

        activeMenu: function () {
            $("#main-menu ul a")    
            .click(function(e) {
                var link = $(this);

                var item = link.parent("li");
                
                if (item.hasClass("active")) {
                    item.removeClass("active").children("a").removeClass("active");
                } else {
                    item.addClass("active").children("a").addClass("active");
                }

                if (item.children("ul").length > 0) {
                    var href = link.attr("href");
                    link.attr("href", "#");
                    setTimeout(function () { 
                        link.attr("href", href);
                    }, 300);
                    e.preventDefault();
                }
            })
            .each(function() {
                var link = $(this);
                if (link.get(0).href === location.href) {
                    link.addClass("active").parents("li").addClass("active");
                    return false;
                }
            }); 
        },


		bodyClass: function () {
			$body.addClass('document-loaded');
		},
	};

    /**
	 * Scripts to run on document ready event.
	 */
	$document.ready(function () {
		rtInsureti.functions.preLoaderInit();
		rtInsureti.functions.scrollToTop();
        rtInsureti.functions.counterUp();
        rtInsureti.functions.mobileMenuDropdown();
        rtInsureti.functions.rtTabs();
        rtInsureti.functions.mobileToggleMenu();
        rtInsureti.functions.searchOverlay();
        rtInsureti.functions.mouseParallax();
        rtInsureti.functions.niceSelect();
        rtInsureti.functions.elementsCarousel();
        rtInsureti.functions.activeMenu();
	});

	/**
	 * Scripts to run on window load event.
	 */
	$window.on('load', function() {
		rtInsureti.functions.bodyClass();
	});

	/**
	 * Scripts to run on window resize event.
	 */
	$window.on('resize', function() {
	});

  
    /*==============================
    //  WOW
    ===============================*/
    
    var wow = new WOW({
    boxClass: "wow",
    animateClass: "animate__animated",
    offset: 0,
    mobile: false,
    live: true,
    scrollContainer: null,
    });
    wow.init();

    // init Isotope
    $('.course-category-items').isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows'
      });
    
      $('.course-category-menu ul li').click(function(){
        $('.course-category-menu ul li').removeClass('active');
        $(this).addClass('active');
    
        var selector = $(this).attr('data-filter');
        $('.course-category-items').isotope({
          filter: selector
        });
        return false;
      });
  

})(jQuery);