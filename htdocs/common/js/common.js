$(function() {
  //smooth scroll
  var scroll = function() {
  $('a[href^="#"]').click(function() {
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  });
}

  // acordion
  var tglSld = function() {
    var base = '.js-tglSld',
      parent = '.js-tglSldP',
      child = '.js-tglSldC',
      btn = '.js-tglSldB',
      classOpen = 'js-open',
      speed = 400;

    // 初期化
    var init = function() {
      if (!($(base).length)) {
        return false;
      }
      return main();
    };

    // クリック時処理
    var main = function() {
      var flag = false;
      $(parent).click(function(e) {
        e.preventDefault();
        if (flag) {
          return false;
        }
        var $this = $(this);
        var $base = $this.parents(base);
        var $child = $base.children(child);
        var $btn = $this.children(btn);

        // 2度押し防止
        flag = true;
        setTimeout(function() {
          flag = false;
        }, speed);

        // 開閉
        if (!($btn.hasClass(classOpen))) {
          $child.slideDown(speed);
          $btn.addClass(classOpen);
        } else {
          $child.slideUp(speed);
          $btn.removeClass(classOpen);
        }
        return false;
      });
    };
    init();
  };
  
  scroll();
  tglSld();
});