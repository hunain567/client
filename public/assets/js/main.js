(function ($) {
    "use strict";



    /*
    ============================================
    Wow Active  	         
    ============================================
    */
    function wowAnimation() {
        var wow = new WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: false,
            live: true,
        });
        wow.init();
    }



    /*
    ===========================================
    Preloader			     
    ==========================================
    */
    function preloader() {
        $(".preloader").delay(0).fadeOut();
    }

    /*
    ===========================================
    dynamicCurrentMenuClass			     
    ==========================================
    */
    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split('/').reverse()[0];

        selector.find('li').each(function () {
            let anchor = $(this).find('a');
            if ($(anchor).attr('href') == FileName) {
                $(this).addClass('active');
            }
        });
        // if any li has .current elmnt add class
        selector.children('li').each(function () {
            if ($(this).find('.active').length) {
                $(this).addClass('active');
            }
        });
        // if no file name return 
        if ('' == FileName) {
            selector.find('li').eq(0).addClass('active');
        }
    }

    // dynamic current class        
    let mainNavUL = $('.menu-nav').find('.navigation');
    dynamicCurrentMenuClass(mainNavUL);


    /*
    ===========================================
    Swiper Slider			     
    ==========================================
    */
    function thmSwiperInit() {
        const swiperElm = document.querySelectorAll(".thm-swiper__slider");
        swiperElm.forEach(function (swiperelm) {
            const swiperOptions = JSON.parse(swiperelm.dataset.swiperOptions);
            let thmSwiperSlider = new Swiper(swiperelm, swiperOptions);
        });
    }


    /*
    ===========================================
    Accordion Active		     
    ==========================================
    */
    function accordionActive() {
        if ($('.accordion-box-one').length) {
            $(".accordion-box-one").on('click', '.accord-btn', function () {

                if ($(this).hasClass('active') !== true) {
                    $('.accordion .accord-btn').removeClass('active');

                }

                if ($(this).next('.accord-content').is(':visible')) {
                    $(this).removeClass('active');
                    $(this).next('.accord-content').slideUp(500);
                } else {
                    $(this).addClass('active');
                    $('.accordion .accord-content').slideUp(500);
                    $(this).next('.accord-content').slideDown(500);
                }
            });
        }
    }





    let elements = document.querySelectorAll(".rolling-text");

    elements.forEach((element) => {
        let innerText = element.innerText;
        element.innerHTML = "";
  
        let textContainer = document.createElement("div");
        textContainer.classList.add("block");
  
        for (let letter of innerText) {
            let span = document.createElement("span");
            span.innerText = letter.trim() === "" ? "\xa0" : letter;
            span.classList.add("letter");
            textContainer.appendChild(span);
        }
  
        element.appendChild(textContainer);
        element.appendChild(textContainer.cloneNode(true));
    });
  
    elements.forEach((element) => {
        element.addEventListener("mouseover", () => {
            element.classList.remove("play");
        });
    });
  
    // custom coursor
    if ($(".custom-cursor").length) {
  
      var cursor = document.querySelector('.custom-cursor__cursor');
      var cursorinner = document.querySelector('.custom-cursor__cursor-two');
      var a = document.querySelectorAll('a');
  
      document.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
      });
  
      document.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        cursorinner.style.left = x + 'px';
        cursorinner.style.top = y + 'px';
      });
  
      document.addEventListener('mousedown', function () {
        cursor.classList.add('click');
        cursorinner.classList.add('custom-cursor__innerhover')
      });
  
      document.addEventListener('mouseup', function () {
        cursor.classList.remove('click')
        cursorinner.classList.remove('custom-cursor__innerhover')
      });
  
      a.forEach(item => {
        item.addEventListener('mouseover', () => {
          cursor.classList.add('custom-cursor__hover');
        });
        item.addEventListener('mouseleave', () => {
          cursor.classList.remove('custom-cursor__hover');
        });
      })
    }
  
  
  
    // Animation gsap
    function title_animation() {
      var tg_var = jQuery(".sec-title-animation");
      if (!tg_var.length) {
        return;
      }
      const quotes = document.querySelectorAll(".sec-title-animation h2");
  
      quotes.forEach((quote) => {
        //Reset if needed
        if (quote.animation) {
          quote.animation.progress(1).kill();
          quote.split.revert();
        }
  
        var getclass = quote.closest(".sec-title-animation").className;
        var animation = getclass.split("animation-");
        if (animation[1] == "style4") return;
  
        quote.split = new SplitText(quote, {
          type: "lines,words,chars",
          linesClass: "split-line",
        });
        gsap.set(quote, {
          perspective: 400,
        });
  
        if (animation[1] == "style1") {
          gsap.set(quote.split.chars, {
            opacity: 0,
            y: "90%",
            rotateX: "-40deg",
          });
        }
        if (animation[1] == "style2") {
          gsap.set(quote.split.chars, {
            opacity: 0,
            x: "50",
          });
        }
        if (animation[1] == "style3") {
          gsap.set(quote.split.chars, {
            opacity: 0,
          });
        }
        quote.animation = gsap.to(quote.split.chars, {
          scrollTrigger: {
            trigger: quote,
            start: "top 90%",
          },
          x: "0",
          y: "0",
          rotateX: "0",
          opacity: 1,
          duration: 1,
          ease: Back.easeOut,
          stagger: 0.02,
        });
      });
    }
    ScrollTrigger.addEventListener("refresh", title_animation);
  



    /*============================================
	Mobile Menu	// SubMenu Dropdown Toggle
    =============================================*/
    if ($(".menu-area li.menu-item-has-children ul").length) {
        $(".menu-area .navigation li.menu-item-has-children").append(
            '<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>'
        );
    }



    /*============================================
	Mobile Nav Hide Show
    =============================================*/
    if ($(".mobile-menu").length) {
        var mobileMenuContent = $(".menu-area .main-menu").html();
        $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);

        //Dropdown Button
        $(".mobile-menu li.menu-item-has-children .dropdown-btn").on("click", function () {
            $(this).toggleClass("open");
            $(this).prev("ul").slideToggle(300);
        });
        //Menu Toggle Btn
        $(".mobile-nav-toggler").on("click", function () {
            $("body").addClass("mobile-menu-visible");
        });

        //Menu Toggle Btn
        $(".menu-backdrop, .mobile-menu .close-btn").on("click", function () {
            $("body").removeClass("mobile-menu-visible");
        });
    }



    /*============================================
	Menu sticky & Scroll to top
    =============================================*/
    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
            $("#sticky-header").removeClass("sticky-menu");
            $(".scroll-to-target").removeClass("open");
        } else {
            $("#sticky-header").addClass("sticky-menu");
            $(".scroll-to-target").addClass("open");
        }
    });



    /*=============================================
	Scroll Up  	         
    =============================================*/
    if ($(".scroll-to-target").length) {
        $(".scroll-to-target").on("click", function () {
            var target = $(this).attr("data-target");
            // animate
            $("html, body").animate({
                    scrollTop: $(target).offset().top,
                },
                1000
            );
        });
    }



    /*=============================================
	Odometer Active  	     
    =============================================*/
    $(".odometer").appear(function (e) {
        var odo = $(".odometer");
        odo.each(function () {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });




    /*============================================
	Magnific Popup		    
    =============================================*/
    $(".popup-image").magnificPopup({
        type: "image",
        gallery: {
            enabled: true,
        },
    });




    /*============================================
	Magnific Popup video	    
    =============================================*/
    $(".popup-video").magnificPopup({
        type: "iframe",
    });



    /*=============================================
	Search Toggler		    
    =============================================*/
    if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function (e) {
            e.preventDefault();
            $(".search-popup").toggleClass("active");
            $(".mobile-nav__wrapper").removeClass("expanded");
            $("body").toggleClass("locked");
        });
    }



    /*=============================================
    Offcanvas Menu 
    =============================================*/
    $(".menu-tigger").on("click", function () {
        $(".extra-info,.offcanvas-overly").addClass("active");
        return false;
    });
    $(".menu-close,.offcanvas-overly").on("click", function () {
        $(".extra-info,.offcanvas-overly").removeClass("active");
    });



    /*=============================================
    Marquee mode
    =============================================*/
    if ($(".marquee_mode").length) {
        $('.marquee_mode').marquee({
            speed: 50,
            gap: 0,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true,
            pauseOnHover: true,
            startVisible: true,
        });
    }


    /*=============================================
    Marquee mode Two
    =============================================*/
    if ($(".marquee_mode-two").length) {
        $('.marquee_mode-two').marquee({
            speed: 50,
            gap: 0,
            delayBeforeStart: 0,
            direction: 'right',
            duplicated: true,
            pauseOnHover: true,
            startVisible: true,
        });
    }



    /*=============================================
    Odometer 
    =============================================*/
    if ($(".odometer").length) {
        var odo = $(".odometer");
        odo.each(function () {
            $(this).appear(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });
    }





    /*=============================================
      Img Magnific Popup 
      =============================================*/
    if ($(".img-popup").length) {
        var groups = {};
        $(".img-popup").each(function () {
            var id = parseInt($(this).attr("data-group"), 10);

            if (!groups[id]) {
                groups[id] = [];
            }

            groups[id].push(this);
        });

        $.each(groups, function () {
            $(this).magnificPopup({
                type: "image",
                closeOnContentClick: true,
                closeBtnInside: false,
                gallery: {
                    enabled: true
                }
            });
        });
    }



    // circle progress
    if ($(".dial").length) {
        $(".dial").appear(
            function () {
                var elm = $(this);
                var color = elm.attr("data-fgColor");
                var perc = elm.attr("value");
                elm.knob({
                    value: 0,
                    min: 0,
                    max: 100,
                    skin: "tron",
                    readOnly: true,
                    thickness: 0.14,
                    dynamicDraw: true,
                    displayInput: false,
                });
                $({
                    value: 0,
                }).animate({
                    value: perc,
                }, {
                    duration: 2000,
                    easing: "swing",
                    progress: function () {
                        elm.val(Math.ceil(this.value)).trigger("change");
                    },
                });
                $(this).append(function () {});
            }, {
                accY: 20,
            }
        );
    }




    //Fact Counter + Text Count
    if ($(".count-box").length) {
        $(".count-box").appear(
            function () {
                var $t = $(this),
                    n = $t.find(".count-text").attr("data-stop"),
                    r = parseInt($t.find(".count-text").attr("data-speed"), 10);

                if (!$t.hasClass("counted")) {
                    $t.addClass("counted");
                    $({
                        countNum: $t.find(".count-text").text(),
                    }).animate({
                        countNum: n,
                    }, {
                        duration: r,
                        easing: "linear",
                        step: function () {
                            $t.find(".count-text").text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $t.find(".count-text").text(this.countNum);
                        },
                    });
                }
            }, {
                accY: 0,
            }
        );
    }





    //====== Magnific Popup
    if ($(".video-popup").length) {
        $(".video-popup").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: true,

            fixedContentPos: false
        });
    }
















    $(window).on("load", function () {
        preloader();
        wowAnimation();
        thmSwiperInit();
        accordionActive();
        title_animation();

        // Nice Select
        $("select").niceSelect();

        //Jquery Curved Circle
        if ($(".curved-circle").length) {
            $(".curved-circle").circleType({
                position: "absolute",
                dir: 1,
                radius: 85,
                forceHeight: true,
                forceWidth: true,
            });
        }



















    });




})(jQuery);