// $(document).ready(function(){
// //     $('.carousel__inner').slick({
// //         speed: 1200,
// //         // adaptiveHeight: true,
// //         prevArrow: '<button type="button" class="slick-prev"><img src="img/left.png"></button>',
// //         nextArrow: '<button type="button" class="slick-next"><img src="img/right.png"></button>',
// //         responsive: [
// //             {
// //                 breakpoint: 992,
// //                 settings: {
// //                     dots: true,
// //                     arrows: false
// //                 }
// //             }
// //         ]
// //       });
// //   });
$(document).ready(function(){
    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false
    });

  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });
  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });



    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleCard(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleCard('.catalog-item__link');
    toggleCard('.catalog-item__back');

//Modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    

    $('.catalog-item__btn').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите имя.",
                    minlength: jQuery.validator.format("Введите минимум {0} символа.")
                },
                phone: "Пожалуйста, введите номер телефона.",
                email: {
                  required: "Пожалуйста, введите адрес электронной почты.",
                  email: "Пожалуйста, введите адрес электронной почты в формате name@domain.com"
                }
            }
    
        });
    }
    validateForms('#consultation form');
    validateForms('#consultation-form');
    validateForms('#order form');


    $('input[name=phone]').mask("+8 (999) 999-99-99");
});
  
// $('form').submit(function(e) {
//     e.preventDefault();
//     $.ajax({
//         type: "POST",
//         url: "mailer/smart.php",
//         data: $(this).serialize() 
//     }).done(function() {
//         $(this).find("input").val("");
//         $('#consultation, #order').fadeOut();
//         $('.overlay, #thanks').fadeIn(slow);
//         $('form').trigger('reset');
//     });
//         return false;
// });

$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});
// Smooth scroll and pageup

$(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
});

$("a[href^='#up']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

new WOW().init();
 




