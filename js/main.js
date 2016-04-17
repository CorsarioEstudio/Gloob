$(window).ready(function () {
  $(".overlay").fadeOut(999);
  window.scrollTo(0, 1);
  $(".preloadBG").each(function () {
    var t, n, r = $(this),
    i = r.css("background-image");
    i && (t = i.replace(/(^url\()|(\)$|[\"\'])/g, ""),
    n = new Image, n.src = t, n.complete && $(n).trigger("load"))
  });
});

var imgCount = $("img").length,
currentImgCount = 0;

$("img").load(function () {
  currentImgCount++;

  $('#baloon').animate({ borderSpacing: -90 }, {
    step: function(now,fx) {
      $(this).css('transform','scale('+(currentImgCount / imgCount - .2)+')');
    },
    duration:'slow'
  },'linear');

  currentImgCount == imgCount && setTimeout(function () {
    /mobile/i.test(navigator.userAgent) && !location.hash && setTimeout(function () { window.scrollTo(0, 1) },
    2e3);
    $(this).css('transform','scale(1)');
    $(".presentation").each(function () {
      var that = this;
      setInterval(function () {
        $(that).addClass("animated");
      }, $(this).data('delay'));
    });
    $("body").removeClass("loading");
    $("img").unbind("load")
  },
  2e3)
}).each(function () { this.complete && $(this).trigger("load") });

$('.waypoint').each(function() {
  var $element = $(this),
  $target;

  $element.waypoint(function(direction) {

    if ($element.is("[data-to-fix]"))
    {
      $element.find(".phone-container").children().toggleClass('absolute-preview fixed-preview');
    }
    else if ($element.is('[data-new-parent]'))
    {
      if (direction == "down"){
        $element.html($("[data-to-fix]").children());

        $("[data-to-fix]").html('');

        $element.find(".phone-container").children()
        .removeClass('fixed-preview')
        .addClass('absolute-preview');
      }
      else if (direction == "up"){
        $("[data-to-fix]").html($element.children());

        $element.html('');

        $("[data-to-fix]").find(".phone-container").children()
        .removeClass('absolute-preview')
        .addClass('fixed-preview');
      }
    }
    else {
      $(".screen img.active").removeClass('active');

      if (direction == "up"){
        $target = $($element.attr('data-up-activate'));
        $target.addClass("active").addClass($target.attr('data-anim'));
      }
      else if (direction == "down") {
        $target = $($element.attr('data-down-activate'));
        $target.addClass("active").addClass($target.attr('data-anim'));
      }
    }


    if ($element.is("[data-baloon-class]")){
      if (direction == "up"){
        $(".red-baloon").removeClass($element.attr('data-baloon-class'));
      }
      else if (direction == "down") {
        $(".red-baloon").addClass($element.attr('data-baloon-class'));
      }

      var element = $(".red-baloon")[0];

      // -> removing the class
      $(element).removeClass("fade-animation up down");

      // -> triggering reflow /* The actual magic */
      // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
      element.offsetWidth = element.offsetWidth;

      // -> and re-adding the class
      $(element).addClass("fade-animation " + direction);
    }

  }, {
    offset: $element.data('waypoint-offset')
  });
});

$(".red-baloon").click(function(){

  if ($(".red-baloon").offset().top > $(".bottom").offset().top){
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
    return false;
  }

  $(".seccion:not(#Principal)").each(function (key, value) {
    var current = $(value);
    var target = $(".seccion:eq(" + (key + 1) + ")");
    if ($(".red-baloon").offset().top < current.offset().top){
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  });
});
