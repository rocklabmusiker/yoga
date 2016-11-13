

// device detection
var isMobile = false;
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
console.log('isMobile = ' + isMobile);

// стабилизирует fullpage  
function stabilize(){

  $('section:not(:hidden)').each(function(index, el) {
  
  var eTop = $(this).offset().top; 
  var posTop = eTop - $(window).scrollTop();

    if(posTop>-$(window).height()/2&&posTop<$(window).height()/2){
      $("html, body").animate({ scrollTop: $(this).offset().top}, 250);
  }

  });

}

$("html, body").on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
  $("html, body").stop();
});

if (isMobile != true) {
  $(window).scroll(function(){

    clearTimeout($.data(this, 'scrollTimer'));
    
    $.data(this, 'scrollTimer',setTimeout(stabilize,1500));

  });
}

// fancy box

$("a#single_image").fancybox();


//lazy  
$(function() {
    $("img.lazy").lazyload();
});



 // функции локации
  function getURLParameter(name) {return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;} 
    function run_geo(geo_url){
        $.ajax({type: 'GET',url: geo_url,dataType: 'xml',
            success: function(xml) {$(xml).find('ip').each(function(){
            var city = $(this).find('city').text();
            var region = $(this).find('region').text();
            if(city!=region){var ipg = city+', '+region;}else{var ipg = city;}
            $('<input type="hidden" />').attr({name: 'location', class: 'location', value:ipg}).appendTo("form");
        });}});
    }



jQuery(document).ready(function() {
  
// remove class active  
    $(".nav__list .nav__item").click(function() {
        $(".nav__list .nav__item").removeClass('nav__item--active');
        $(this).addClass('nav__item--active');
    });

//remove placeholder
 $('input,textarea').focus(function(){
   $(this).data('placeholder',$(this).attr('placeholder'))
   $(this).attr('placeholder','');
 });
 $('input,textarea').blur(function(){
   $(this).attr('placeholder',$(this).data('placeholder'));
 });

   
 // scroll

 $('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');

 var amountScrolled = 300;

        $(window).scroll(function() {
          if ( $(window).scrollTop() > amountScrolled ) {
            $('a.back-to-top').fadeIn('slow');
          } else {
            $('a.back-to-top').fadeOut('slow');
          }
        });
        
        // animation
        $('a.back-to-top').click(function() {
          $('html, body').animate({
            scrollTop: 0
          }, 700);
          return false;
        });



// ======скрипты form=======


    // проверка имени на валидность
    $('input[name="name"]').blur(function() {if($(this).val().length < 2) {$(this).addClass('error-input');}});
    $('input[name="name"]').focus(function() {$(this).removeClass('error-input');});


    // проверка email на валидность
    $('input[name="email"]').blur(function() {if($(this).val().length < 5) {$(this).addClass('error-input');}});
    $('input[name="email"]').focus(function() {$(this).removeClass('error-input');});

    // проверка телефона на валидность и подключает маску
    $('input[name="phone"]').mask('+7 (999) 999-99-99');
    $('input[name="phone"]').blur(function() {if($(this).val().length != 18) {$(this).addClass('error-input');}});
    $('input[name="phone"]').focus(function() {$(this).removeClass('error-input');});

    // локация
    $.get("http://ipinfo.io", function(response) {geo_url='http://ipgeobase.ru:7020/geo?ip='+response.ip; run_geo(geo_url);}, "jsonp");
    utm=[];$.each(["utm_source","utm_medium","utm_campaign","utm_term",'source_type','source','position_type','position','added','creative','matchtype'],function(i,v){$('<input type="hidden" />').attr({name: v, class: v, value: function(){if(getURLParameter(v) == undefined)return '-'; else return getURLParameter(v)}}).appendTo("form")});
    $('<input type="hidden" />').attr({name: 'url', value: document.location.href}).appendTo("form");
    $('<input type="hidden" />').attr({name: 'title', value: document.title}).appendTo("form");


$('form').submit(function(e){
      e.preventDefault();
      $(this).find('input[type="text"]').trigger('blur');
      if(!$(this).find('input[type="text"]').hasClass('error-input')){
          var type=$(this).attr('method');
          var url=$(this).attr('action');
          var data=$(this).serialize();
          var track_event=$(this).find('input[name="event"]').val();
          $.ajax({type: type, url: url, data: data,
              success : function(){
                $.arcticmodal('close');$('#okgo').arcticmodal();
                  //submit_track_event(track_event);
              }
          }); 
      }else{

          var eror_pop_text = '';

          if ($(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="email"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input')) {
              eror_pop_text = 'Пожалуйста введите имя';
          } else

          if ($(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="email"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input')){
              eror_pop_text = 'Пожалуйста введите телефон';
          }else

          if ($(this).find('input[name="email"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input')){
              eror_pop_text = 'Пожалуйста введите Email';
          }else

          if ($(this).find('input[name="email"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input')){
              eror_pop_text = 'Пожалуйста введите имя и email';
          }else

          if ($(this).find('input[name="name"]').hasClass('error-input') && $(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="email"]').hasClass('error-input')){
              eror_pop_text = 'Пожалуйста введите имя и телефон';
          }else

          if ($(this).find('input[name="email"]').hasClass('error-input') && $(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input')){
              eror_pop_text = 'Пожалуйста введите email и телефон';
          }else

          if ($(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="email"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input')){
              eror_pop_text = 'Пожалуйста введите имя, email и телефон';
          }

          $('#form-error-text').html(eror_pop_text);
          $('#form-error-pop').arcticmodal();
      }
    });// end scripts form

});//ready end