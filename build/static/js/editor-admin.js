$(document).ready(function(){



    // Editor ID's
    $('.editor-text').each(function(ndx){
        $(this).attr('id','editor-'+(ndx+1)+'');
    });
    $('.editor-img').each(function(ndx){
        $(this).attr('id','editor-img-'+(ndx+1)+'');
    });
    $('.editor-block').each(function(ndx){
        $(this).attr('id','editor-block-'+(ndx+1)+'');
    });
    // Получаем клик по editor id
    // Редактор для блоков
    var get_this_block;
    $('.editor-block').on('click',function(){
        get_this_block = $(this).attr('id');
        $('.editor-close-button').addClass('active');
        $('.sidebar-editor--attributes__blocks').addClass('active');
        $('.editor-text').removeClass('active');
        $('.editor-img').removeClass('active');
        $('.editor-block').removeClass('active');
        $('#'+ get_this_block +'').addClass('active')
        return get_this_block;
    });
    $('.editor-close-button').click(function(){
        $(this).removeClass('active');
        $('.sidebar-editor--attributes__blocks').removeClass('active');
    });

    // Редактор для текста
    var get_this;
    $('.editor-text').on('click',function(){
        var get_text = $(this).text();
        get_this = $(this).attr('id');
        $('.editor-close-button').addClass('active');
        $('.sidebar-editor--attributes__text').addClass('active');
        $('.editor-text').removeClass('active');
        $('.editor-img').removeClass('active');
        $('.editor-block').removeClass('active');
        $('#'+ get_this +'').addClass('active')
        $('.editor-textarea-text').text(get_text);
        if($(this))
        return get_this;
    });
    $('.editor-close-button').click(function(){
        $(this).removeClass('active');
        $('.sidebar-editor--attributes__text').removeClass('active');
    });
    // Изменяем контент для выбранноего editor id
    $('.editor-textarea-text').blur(function(){
        var get_t = $(this).html();
        $('#'+ get_this +'').html(get_t);
    });

    // Редактор для картинок
    var get_this_img;
    $('.editor-img').click(function(){
        get_this_img = $(this).attr('id');
        var takeImg = $(this).attr('src');
        $('.editor-close-button').addClass('active');
        $('.sidebar-editor--attributes__img').addClass('active');
        $('.editor-img').removeClass('active');
        $('.editor-text').removeClass('active');
        $('.editor-block').removeClass('active');
        $('#'+ get_this_img +'').addClass('active')
        //$('.editor-textarea-text').text(get_text);
        $('.editor-img--zone').attr('style','');
        $('.editor-info--img__pic').attr('style','background-image:url('+ takeImg +')');
        return get_this_img;
    });

    $('.editor-close-button').click(function(){
        $(this).removeClass('active');
        $('.sidebar-editor--attributes__img').removeClass('active');
    });

    // Изменение/добавление картинки
    $("#editor-img__id").change(function () {

        if (this.files && this.files[0]) {
            var reader = new FileReader();
            var textFile = this.files[0].name
            reader.onload = function (e) {
                $('.editor-img--zone').attr('style', 'background-image:url("'+ e.target.result +'");background-color:#F9F9F9;');
                $('#'+ get_this_img +'').attr('src', e.target.result);
                $('.editor-info--img__pic').attr('style', 'background-image:url("'+ e.target.result +'")');
                $('.editor-info--img__text').text(textFile);
            };
            reader.readAsDataURL(this.files[0]);



        }

    });
    // Прозрачность для картинки
    $('.editor-item--img__percent').change(function(){
        var opacityPercent = $(this).val();
        document.getElementById(get_this_img).style.cssText="opacity:0."+opacityPercent+"; filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity="+opacityPercent+");";
        console.log(opacityPercent);
    });
    // Удаление картинки
    $('.editor-item--img__delete').click(function(){
        $('#editor-img__id').val('');
        $('.editor-img--zone').attr('style','');
        $('.editor-info--img__pic').attr('style','');
        $('.editor-info--img__text').text('');
        $('#'+ get_this_img +'').attr('src','');
    });

    $('.editor-img--size__x').change(function(){
        var sizeX = $(this).val();
        document.getElementById(get_this_img).style.width = sizeX+'px';
    });
    $('.editor-img--size__y').change(function(){
        var sizeY = $(this).val();
        if(sizeY == 'auto'){
            document.getElementById(get_this_img).style.height = 'auto';
        } else{
            document.getElementById(get_this_img).style.height = sizeY+'px';
        }

    });


    // выход из редактируемого editor id
    $(document).click(function (e) {
        if (!$(e.target).closest(".sidebar-editor--attributes__text,.editor-text").length) {
            $('.editor-text').removeClass('active');
            $('.sidebar-editor--attributes__text').removeClass('active');
        }
        e.stopPropagation();
    });

    $(document).click(function (e) {
        if (!$(e.target).closest(".editor-img,.sidebar-editor--attributes__img").length) {
            $('.editor-img').removeClass('active');
            $('.sidebar-editor--attributes__img').removeClass('active');
        }
        e.stopPropagation();
    });

    $(document).click(function (e) {
        if (!$(e.target).closest(".editor-block,.sidebar-editor--attributes__blocks").length) {
            $('.editor-block').removeClass('active');
            $('.sidebar-editor--attributes__blocks').removeClass('active');
        }
        e.stopPropagation();
    });

    $(document).click(function (e) {
        if (!$(e.target).closest(".editor-img,.editor-text,.editor-block").length) {
            $('.editor-close-button').removeClass('active');
        }
        e.stopPropagation();
    });

    // Выбор цвета для текста
    $('.color-picker-spectrum').spectrum({
        color: '#272727',
        showInput: true,
        className: "full-spectrum",
        showInitial: true,
        //showPalette: true,
        showAlpha: true,
        showSelectionPalette: true,
        maxSelectionSize: 10,
        preferredFormat: "hex",
        //localStorageKey: "spectrum.full",
        clickoutFiresChange: true,
        move: function (color) {
            //$('.mdex_bgDGradient').css("background", "linear-gradient(92.29deg, '" + color.toHexString() +"' 0%, #000 100%) !important");
            $('.color-picker--choise').attr('style','background-color:'+ color.toRgbString() +'');
            $('.color-picker-spectrum__input').val(color.toRgbString());
            $('#'+ get_this +'').css('color',color.toHexString());
            document.getElementById(get_this).style.color = color.toRgbString();

        },
        show: function () {

        },
        beforeShow: function () {

        },
        hide: function () {

        },
        change: function () {

        },

    });
    // Выбор фона для картинок
    $('.color-picker-spectrum2').spectrum({
        color: '#272727',
        showInput: true,
        className: "full-spectrum",
        showInitial: true,
        //showPalette: true,
        showAlpha: true,
        showSelectionPalette: true,
        maxSelectionSize: 10,
        preferredFormat: "hex",
        //localStorageKey: "spectrum.full",
        clickoutFiresChange: true,
        move: function (color) {
            //$('.mdex_bgDGradient').css("background", "linear-gradient(92.29deg, '" + color.toHexString() +"' 0%, #000 100%) !important");
            $('.color-picker--choise').attr('style','background-color:'+ color.toRgbString() +'');
            $('.color-picker-spectrum__input').val(color.toRgbString());
            document.getElementById(get_this_img).style.backgroundColor = color.toRgbString();

        },
        show: function () {

        },
        beforeShow: function () {

        },
        hide: function () {

        },
        change: function () {

        },

    });

    // Выбор фона для блоков
    $('.color-picker-spectrum3').spectrum({
        color: '#272727',
        showInput: true,
        className: "full-spectrum",
        showInitial: true,
        //showPalette: true,
        showAlpha: true,
        showSelectionPalette: true,
        maxSelectionSize: 10,
        preferredFormat: "hex",
        //localStorageKey: "spectrum.full",
        clickoutFiresChange: true,
        move: function (color) {
            //$('.mdex_bgDGradient').css("background", "linear-gradient(92.29deg, '" + color.toHexString() +"' 0%, #000 100%) !important");
            $('.color-picker--choise').attr('style','background-color:'+ color.toRgbString() +'');
            $('.color-picker-spectrum__input').val(color.toRgbString());
            document.getElementById(get_this_block).style.backgroundColor = color.toRgbString();

        },
        show: function () {

        },
        beforeShow: function () {

        },
        hide: function () {

        },
        change: function () {

        },

    });


    // Выбор семейсва шрифта
    $('.editor-sidebar-ff .section-select--popup__item2').click(function(){
        get_ff = $(this).text();
        document.getElementById(get_this).style.fontFamily = get_ff + ',sans-serif';
    });
    // Выбор плотности шрифта
    $('.editor-sidebar-weight .section-select--popup__item2').click(function(){
        get_fw = $(this).attr('data-weight');
        document.getElementById(get_this).style.fontWeight = get_fw;
    });
    // Выбор размера шрифта
    $('.editor-sidebar-fs').on('change',function(){
        get_fs = $(this).val();
        document.getElementById(get_this).style.fontSize = get_fs+'px';
    });
    // Скругление краев у картинок
    $('.editor-img--border__radius').change(function(){
        get_br1 = $('.editor-img--border__radius1').val();
        get_br2 = $('.editor-img--border__radius2').val();
        get_br3 = $('.editor-img--border__radius3').val();
        get_br4 = $('.editor-img--border__radius4').val();
        document.getElementById(get_this_img).style.borderRadius =  ''+get_br1+'px '+get_br2+'px '+get_br3+'px '+get_br4+'px';
    });
    // Ширина картинок
    $('.editor-img--data__size .section-select--popup__item2').click(function(){
        get_sp = $(this).attr('data-size');
        if(get_sp == '100%'){
            document.getElementById(get_this_img).style.width = get_sp;
        } else {
            document.getElementById(get_this_img).style.width = get_sp+'px';
        }
    });
    // Изменение размера блоков
    $('.editor-block--size__x').change(function(){
        var sizeX = $(this).val();
        document.getElementById(get_this_block).style.width = sizeX+'px';
    });
    $('.editor-block--size__y').change(function(){
        var sizeY = $(this).val();
        if(sizeY == 'auto'){
            document.getElementById(get_this_block).style.height = 'auto';
        } else{
            document.getElementById(get_this_block).style.height = sizeY+'px';
        }

    });
    // Скругление краев у блоков
    $('.editor-block--border__radius').change(function(){
        geb_br1 = $('.editor-block--border__radius1').val();
        geb_br2 = $('.editor-block--border__radius2').val();
        geb_br3 = $('.editor-block--border__radius3').val();
        geb_br4 = $('.editor-block--border__radius4').val();
        document.getElementById(get_this_block).style.borderRadius = ''+geb_br1+'px '+geb_br2+'px '+geb_br3+'px '+geb_br4+'px';
    });
    // =============================================== //
    $('.price-body-top__arrow').click(function () {
        $(this).toggleClass('active');
        $(this).parents('.price-list-body__top').next().slideToggle(200);
     });

     $('.tabs-buttons').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var tabs = $(this).attr('data-tab');
        $('.tabs-content.' + tabs).addClass('active').siblings().removeClass('active');
     });

     $('.faq-question-item').click(function () {
        $(this).toggleClass('active')
        $(this).next().slideToggle(200);
     });

     $('.side-toggle-exam--wrap').click(function () {
        $(this).toggleClass('active');
        $(this).next().slideToggle(200).css('display','flex');
     });



     var dsb = function() {
         if ($(window).width() < 768) {
             $('.editor-text,.editor-img,.editor-block').on('click',function () {
                 $('.left-side').addClass('active');
                 $('.left-and-right-side').addClass('active');
             });
         }
    };
    dsb();

    $(window).resize(dsb);
















});