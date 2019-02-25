//遅延ロード的なjs
$(function() {
  // $('.effect div, .effect i').css("opacity","0");
  $(window).scroll(function() {
    $(".star").each(function() {
      var svgPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > svgPos - windowHeight + windowHeight / 5) {
        $(this).addClass("animate");
        console.log("Do Something");
      } else {
        $(this).removeClass("animate");
      }
    });
  });
});
