$(function() {

    //Preloader
    $(window).on('load', function () {
        $('.preloader').delay(1000).fadeOut('slow');
    });

    //Mmenu
    var $menu = $('#my-menu').mmenu({
        extensions: [ 'theme-black', 'effect-menu-slide', 'pagedim-black' ],    // 'widescreen' -don"t work
        navbar: {
            title: '<img src="img/logo.svg" alt="Салон красоты Смитлер">'
        },
        offCanvas: {
            position: 'right'
        }
    });

    var $humburger = $(".hamburger");
    var API = $menu.data( "mmenu" );

    $humburger.on( "click", function() {
        API.open();
    });

    API.bind( "open:finish", function() {
        setTimeout(function() {
            $humburger.addClass( "is-active" );
        }, 100);
    });
    API.bind( "close:finish", function() {
        setTimeout(function() {
            $humburger.removeClass( "is-active" );
        }, 100);
    });


    //Owl-carousel
    $('.carousel-services').on('initialized.owl.carousel', function () { // если карусель заружена, сделать блоки одинаковой высоты
        setTimeout(function () {
            carouselService()
        }, 100);
    });

    $('.carousel-services').owlCarousel({
        loop: true,
        nav: true,
        smartSpeed: 700,
        navText: ['<i class="fa fa-angle-double-left">', '<i class="fa fa-angle-double-right">'],
        responsiveClass: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            800: {
                items: 2
            },
            1100: {
                items: 3
            }
        }
    });

    // Blocks the same height for owl-carousel for images
    function carouselService() {
        $('.carousel-services__item').each(function () {
            var ths = $(this),
                thsh = ths.find('.carousel-services__content').outerHeight();
            ths.find('.carousel-services__image').css('min-height', thsh);
        });
    }carouselService();

    // Add last/first span for cms
    $('.carousel-services__composition .carousel-services__header').each(function () {
        var ths = $(this);
        ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>')); // выделяет последнее слово в span
    });


    $('section .h2').each(function () {
        var ths = $(this);
        ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>'));  // выделяет первое слово в span
    });


    //Selectize
    $('select').selectize();


    $('.s-review__carousel').owlCarousel({
        loop: true,
        nav: false,
        smartSpeed: 700,
        responsiveClass: true,
        dots: true,
        items: 1
    });


    $('.carousel-partners').owlCarousel({
        loop: true,
        nav: true,
        smartSpeed: 700,
        navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
        responsiveClass: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });

    //Resize Window (after all scripts)
    function onResize() {
        $('.carousel-services__content').equalHeights();  // for owl-carousel,
    }onResize();
    window.onresize = function () {
        onResize()
    };


    //E-mail Ajax Send
    $("form.callback").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "/mail.php", //Change
            data: th.serialize()
        }).done(function() {
            $(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn(); // alert("Thank you!");
            setTimeout(function() {
                $(th).find('.success').removeClass('active').fadeOut();// Done Functions
                th.trigger("reset");
            }, 3000);
        });
        return false;
    });


    //Scroll page to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > $(this).height()) {
            $('.top').addClass('active');
        } else {
            $('.top').removeClass('active');
        }
    });

    $('.top').click(function () {
        $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });

});
