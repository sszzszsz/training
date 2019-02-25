/*
 * SPサイズ切り替え
 */
var breakpoint = 736;

function isSP() {
  if (window.innerWidth <= breakpoint) {
    return true;
  }
  return false;
}

// 他ページでも使用のため
var current = 'current';

$(function() {
  // タブ切り替え用
  var $tab = $('.tabArea .tab li');

  // スムーススクロール、ページトップボタン用
  var $scrlBtn = $('a').not('.spIcon');
  var $pageTopBtn = $('span.topPage');
  var $footer = $('footer');

  // ローカルナビ用
  var $chaseNav = $('.localNavArea');
  var $localNavBtn = $('.spBtn');
  var $localNav = $('.localNav');

  // アコーディオン用
  var $acdoContent = $('.listInr');
  var $acdoBtn = $('.accordionBtn');
  var $acdoOptArea = $('.btnArea');

  // ハンバーガーメニュー用
  var $spHamBtn = $('.spIcon');
  var $spHamContent = $('.spMenuArea');

  // ドロップダウンメニュー用、ヘッダーメニューの要素
  var $headeMenu = $('header .headeMenu');
  var $dropMenu = $headeMenu.children('li');
  var slideSpeed = 300;
  var dropAnimeFlg = false;

  // 絞り込み機能
  var isTopPage = location.pathname === '/' || location.pathname === '/index.html' ? true : false;

  // スマホフラグ
  var prevSPFlg = isSP();
  // ウィンドウ幅
  var prevWinWidth = window.innerWidth;

  // クラス名
  var fixed = 'fixed';
  var open = 'open';
  var close = 'close';
  var topFix = 'topFix';

  /*************************************
   fadeIn
   *************************************/
  function fadeInAni() {
    $('.hideme').each(function(i) {
      var pos = $(this).offset().top,
        y = $(window).scrollTop(),
        windowHeight = $(window).height(),
        $self = $(this);

      // 表示領域まできていた場合
      if (y + windowHeight / 5 * 4 > pos) {
        $self.addClass("active");
      }
    });
  }
  fadeInAni();
  // window scroll function
  $(window).on('scroll', function() {
    fadeInAni();
  });

  /*************************************
   header
   *************************************/
  var mainHeaderH = $('.mainHeader').offset().top;
  $(window).on('scroll resize orientationchange', function() {
    var scrollValue = $(window).scrollTop();
    console.log(scrollValue);

    if (scrollValue > mainHeaderH) {
      $('.mainHeader').addClass('hFixed')
    }
    if (scrollValue < mainHeaderH) {
      $('.mainHeader').removeClass('hFixed')
    }
  });
  /*************************************
   dropMenu
   *************************************/
  $dropMenu.hover(function() {
    if ($(this).hasClass('logo') || $(this).hasClass('noMenu')) return;
    var $childPanel = $(this).children('.dropMenu');
    $dropMenu.removeClass(open);
    if ($dropMenu.filter('.' + open).length == 0 && !dropAnimeFlg) {
      dropAnimeFlg = true;
      $childPanel.not(':animated').slideDown(slideSpeed, function() {
        dropAnimeFlg = false;
      });
    } else {
      $childPanel.show();
    }
    $(this).addClass(open);
  }, function() {
    if ($(this).hasClass('logo') || $(this).hasClass('noMenu')) return;
    var $childPanel = $(this).children('.dropMenu');
    var self = this;

    // 他のメニューにホバーした場合を考慮し、時間差を生む
    setTimeout(function() {
      // この段階で、別のメニューにホバーしていた際はクラスで見分けられる
      if ($dropMenu.not(self).filter('.' + open).length == 0) {
        dropAnimeFlg = true;
        $childPanel.slideUp(slideSpeed, function() {
          $(this).removeClass(open);
          dropAnimeFlg = false;
        });
      } else {
        $childPanel.hide();
        $(this).removeClass(open);
      }
    }, 5)
  });
  /*************************************
   smoothScroll,pageTop
  *************************************/
  var mainHeaderH = $('.mainHeader').outerHeight();

  function smoothScroll(href) {
    var speed = 500;
    var elem = (href === '#' || href === '') ? 'html' : href;
    var $target = $(elem);

    // 対象要素がなかった場合
    if ($target.length == 0) return false;

    var position = $target.offset().top - mainHeaderH;

    // 下層ページのローカルナビの高さを考慮
    $('html , body').not(':animated').animate({
      scrollTop: position
    }, speed, 'swing');
  }

  $scrlBtn.on('click', function() {
    var href = $(this).attr('href');

    // ページ外リンクの場合
    if (href.indexOf('/') > -1) return;
    // スクロール不要の場合
    if ($(this).hasClass('no-scroll') || $(this).hasClass('accordionBtn')) return;
    smoothScroll(href);
    return false;
  });


  // pagetopボタン、フッターで止める
  $(window).on('scroll resize orientationchange', function() {
    var bodyHeight = $('body').height();
    var pageTopBottom = $pageTopBtn.children('a').css('bottom').replace('px', '') * 1;
    var pageTopHeight = $pageTopBtn.children('a').height();
    var footerHeight = $('.subFooter').outerHeight(true) + $('.footerInr').outerHeight(true);
    var headerHeight = ($chaseNav.length > 0 || !isTopPage) ? 0 : $('.gHeaderWrapper').height();

    // SPの場合はツールバーを、PCの場合はスクロールバーを考慮するため、heightを使い分ける
    var windowHeight = isSP() ? window.innerHeight : $(window).height()
    var scrlPosition = $(window).scrollTop() + windowHeight;

    // topページのみヘッダー追従のため
    if (scrlPosition - headerHeight - pageTopBottom - (pageTopHeight / 2) > bodyHeight - footerHeight) {
      $pageTopBtn.removeClass(topFix);
    } else {
      $pageTopBtn.addClass(topFix);
    }
  });


  /*************************************
   tab
   *************************************/
  $tab.on('click', function() {
    var $tabs = $(this).parent().children();
    var index = $tabs.index(this);
    var $contents = $(this).parent().next('.tabContList').children();

    $tabs.removeClass(current);
    $(this).addClass(current);
    $contents.hide();
    $contents.eq(index).show();
    return false;
  });
  /*************************************
   accordion
   *************************************/
  $acdoBtn.on('click', function() {
    var self = $(this);
    if (self.next().not(':animated').length > 0) {
      self.next().slideToggle();
      self.toggleClass(open);
    }
    return false;
  });

  /*************************************
   spHam
   *************************************/
  $spHamBtn.on('click', function() {
    if ($spHamContent.not(':animated').length > 0) {
      $acdoBtn.next().css({
        display: 'none'
      });
      if ($('body').hasClass('spMenuOpend')) {
        $spHamContent.slideUp(slideSpeed);
        $spHamBtn.removeClass(close);
        $('body').removeClass("spMenuOpend");
      } else {
        $('body').addClass("spMenuOpend");
        $spHamContent.slideDown(slideSpeed);
        $spHamBtn.addClass(close);
      }
    }
    return false;
  });

  function closeSpHumMenu() {
    $spHamContent.hide();
    $spHamBtn.removeClass(close);
  }

  /*************************************
   ローカルナビ追従（SP）
   *************************************/
  $localNavBtn.on('click', function() {
    $localNav.not(':animated').slideToggle();
    return false;
  });

  $(window).on('scroll resize orientationchange', function(e) {
    var SPFlg = isSP();
    var winWidth = window.innerWidth;

    if (prevSPFlg != SPFlg && !SPFlg) {
      // PCサイズに変更した際のcssのdisplay上書き防止
      $acdoContent.css({
        display: ''
      });
      $('footer').find('.accordionBtn').removeClass(open);
    }

    // ハンバーガーメニューの中身を収納
    // closeSpHumMenu();

    // ウィンドウ幅のリサイズの場合
    if (e.type !== 'scroll' && prevWinWidth !== winWidth) {
      // PCサイズに変更した際のcssのdisplay上書き防止
      $localNav.css({
        display: ''
      });
    }
    prevSPFlg = SPFlg;
    prevWinWidth = winWidth;
  });

  // 下層ページ紺色のナビ追従
  $(window).on('load scroll', function() {
    var headerHeight = $('header.gHeaderWrapper').innerHeight();
    if (headerHeight <= $(window).scrollTop()) {
      $chaseNav.addClass(fixed);
      // fadeInするとinline-blockになってしまうため、animateで対応
      if ($pageTopBtn.css('display') == 'none') {
        $pageTopBtn.css({
          display: 'block',
          opacity: 0
        });
        $pageTopBtn.animate({
          opacity: 1
        }, 300);
      }
    } else {
      $chaseNav.removeClass(fixed);
      $pageTopBtn.fadeOut();
    }
  });
  /*************************************
  SORT
   *************************************/
  var sortList = $('.sortList li'); //一覧
  var animationFlg = false;
  var loadFlg; //ロード時の絞り込みか
  var sortBtn = $('.sortBtn li')
  $('.sortBtn li').on('click', function() {
    if (!animationFlg) {
      animationFlg = true;
      var fadeSpeed = loadFlg ? 0 : 600; //ロード時の絞り込みの場合はフェードなし
      var len = sortList.length;
      sortBtn.removeClass(current);
      $(this).addClass(current);
      var selectedCategory = $(this).data('category');
      var selectedList = $('.sortList li' + '.' + selectedCategory);

      sortList.fadeOut(fadeSpeed, function() { //一覧を一度非表示にして、該当のものを表示
        --len;
        // 一度だけ実行
        if (len == 0) {
          // いったんすべてのリストを非表示にする
          sortList.css('display', 'none');

          //「すべて」を選択
          if (selectedCategory == 'all') {
            displayList(sortList, fadeSpeed);

            // 「すべて」以外選択、表示するリストがないとき
          } else if (selectedList.length == 0) {
            animationFlg = false;

            // 「すべて」以外選択、表示するリストがあるとき
          } else {
            displayList(selectedList, fadeSpeed);
          }
        }
      });
    }
    loadFlg = false;
    return false;
  });

  function displayList(targetList, speed) {
    $.when(
      targetList.css({
        display: '',
        opacity: 0
      }),
      targetList.animate({
        opacity: 1
      }, speed)
    ).done(function() {
      animationFlg = false;
    });
  }
});