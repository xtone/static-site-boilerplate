//- ドロワー開閉
$(function(){
  $('.menu-trigger').on('click', function() {
    if($(this).hasClass('close')) {
      $(this).removeClass('close');
      $(this).addClass('open');
      $('.nav').addClass('show');
      $('.nav').removeClass('hide');
    } else {
      $(this).removeClass('open');
      $(this).addClass('close');
      $('.nav').addClass('hide');
      $('.nav').removeClass('show');
    }
    return false;
  });
});

// スクロールするとページトップのボタンが出てくる
$(function () {
  var pagetop = $('.l-pagetop');
  pagetop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
  pagetop.click(function () {
    $('body, html').animate({scrollTop: 0}, 300, 'linear');
    return false;
  });
});

// アンカーリンクのスムーススクロール
$(function () {
  $('a[href^="#"]').on("click", function () {
    const speed = 300;
    const href = $(this).attr("href");
    const target = $(href === "#" || href === "" ? "html" : href);
    const position = target.offset().top;
    $("body,html").animate({ scrollTop: position }, speed, "linear");
    // hashと同じ要素がないなら何もしない
    // if (!target[0]) return;
    // .open を付けて、コーディオン開く
    // target.find(".question").addClass("open").next().slideDown();
    return false;
  });
});


// アコーディオン開閉（FAQ）
/** ロード時の処理 */
// $(function () {
//   // hashの取得
//   const urlHash = location.hash;
//   // hashがないなら何もしない
//   if (!urlHash) return;
//   // hashと同じ要素がないなら何もしない
//   const target = $(urlHash);
//   if (!target[0]) return;
//   // 画面の一番上へ移動
//   $("body,html").stop().scrollTop(0);
//   // 念のためのレンダリング待ち
//   setTimeout(function () {
//     // hashと同じ要素のyの位置を取得
//     const position = target.offset().top;
//     // スクロールのアニメーション
//     $("body,html").stop().animate({ scrollTop: position }, 500);
//   }, 100);
//   // .open を付けて、コーディオン開く
//   target.find(".question").toggleClass("open").next().slideToggle();
// });

/** クリック時の処理 */
$(function () {
  $(".question").on("click", function () {
    $(this).toggleClass("open").next().slideToggle();
  });
});

// アンカーリンクの位置を調整
$(function () {
  var headerHight = 50;
  $('.page-anchor--list a[href^="#"]').click(function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - headerHight;
    $("html, body").animate({ scrollTop: position }, 0, "swing");
    return false;
  });
});


