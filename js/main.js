$(document).ready(function(){

    $('.c_subnav .arrow').click(function () {
        $(this).next().slideToggle();
        $(this).parent().toggleClass('active');
    });

    $('.c_btn').click(function(e){
        if($(window).innerWidth() < 992){
            e.preventDefault();
            $(this).next().slideToggle();
        }else{
            $('.c_subnav_d').slideToggle();
        }
    });

    $('.hamburger').click(function () {
        $('.main_menu').toggleClass('open');
        $('html').toggleClass('page-noscroll');

        $('.main_menu .mm_close').click(function () {
            $('.main_menu').removeClass('open');
            $('html').removeClass('page-noscroll');
        });
        return false;
    });
    $(document).on('click', function(e) {
        if (!$(e.target).closest(".main_menu.open").length) {
            $(".main_menu.open").removeClass('open');
            $("html").removeClass('page-noscroll');
        }
        e.stopPropagation();
    });



    $(".main_slider").slick({
        infinite: true,
        arrows: false,
        dots: true,
        autoplay: false,
        //speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
    });




    $('.range_values').each(function(){
        var range=$(this).find('.range');
        var rub_left=$(this).find('.rub_left');
        var rub_right=$(this).find('.rub_right');
        var tasks_status1=$(this).find('.tasks_status1');
        var tasks_status2=$(this).find('.tasks_status2');
        $(range).slider({
            range: true,
            min: 0,
            max: 350,
            values: [0, 150],
            step: 1,
            slide: function(event, ui) {
                $(rub_left).text(ui.values[0] );
                $(rub_right).text(ui.values[1] );
                $(tasks_status1).val( ui.values[0] );
                $(tasks_status2).val( ui.values[1] );
            }
        });
        $(rub_left).text($(range).slider("values", 0));
        $(rub_right).text($(range).slider("values", 1));
    });

    $(document).on("change","input[class=tasks_status1]", function() {
        $(this).closest('.range_values').find('.range').slider('values',0,$(this).val());
        $(this).closest('.range_values').find('.rub_left').text($('.range').slider("values", 0));
    });
    $(document).on("change","input[class=tasks_status2]", function() {
        $(this).closest('.range_values').find('.range').slider('values',1,$(this).val());
        $(this).closest('.range_values').find('.rub_right').text($('.range').slider("values", 1) );
    });


    $('.filter_box_title').click(function () {
        $('.filter_form').slideToggle();
    });
    $('.filter_title').click(function () {
        $(this).next().slideToggle();
    });


});





