// 띠 배너 닫기
$(".topnav_t_close").on("click", function () {
  $(".topnav_t").hide();
});

$(".topnav_b_close").on("click", function () {
  $(".topnav_b").hide();
});

// 헤더 2뎁스 메뉴 활성
$(".nav>ul>li").on("mouseenter", function () {
  const index = $(this).data("index");

  $(".depth2-wrap").addClass("active");

  $(".depth2").each(function (i) {
    $(this).toggleClass("active", i === index);
  });

  $("#nav").addClass("active");
  $(".menueffect").addClass("active");
});

let menuCloseTimer;
$(".nav, .depth2-wrap").on("mouseleave", function () {
  menuCloseTimer = setTimeout(() => {
    $(".depth2-wrap").removeClass("active");
    $(".depth2").removeClass("active");
    $("#nav").removeClass("active");
    $(".menueffect").removeClass("active");
  }, 100);
});

$(".nav, .depth2-wrap").on("mouseenter", function () {
  clearTimeout(menuCloseTimer);
});

// 헤더 픽스
$(window).on("scroll", function () {
  const scrollTop = $(window).scrollTop();
  const topnavHeight = $("#topnav").outerHeight();

  if (scrollTop >= topnavHeight) {
    $("#nav").addClass("fixed");
    $("body").addClass("fixed-nav-padding");
  } else {
    $("#nav").removeClass("fixed");
    $("body").removeClass("fixed-nav-padding");
  }
});

// 모바일 메뉴
// $(function(){
//     $('.mobilenav>li').mouseover(function(){
//         $(this).find('.mobiledepth2').stop().slideDown(200);
//     });
//     $('.mobilenav>li').mouseout(function(){
//         $(this).find('.mobiledepth2').stop().slideUp(200);
//     });

//     // 메뉴 쇼 하이드
//     $('.ham').click(function(){
//         $('.mobilebg').show();
//         $('.bi-x-lg').click(function(){
//             $('.mobilebg').hide();
//         });
//     });
// });

// 모바일 섹션 슬라이드
$(function () {
  if ($(window).width() <= 1024) {
    const $wrap = $(".section-wrap");
    const $slides = $wrap.children();
    const total = $slides.length;
    let current = 0;

    $wrap.append($slides.clone());

    function goToSlide(index) {
      $wrap.css("transition", "transform 0.6s ease-in-out");
      $wrap.css("transform", `translateX(${-100 * index}vw)`);
    }

    function resetPosition() {
      $wrap.css("transition", "none");
      $wrap.css("transform", `translateX(0vw)`);
      current = 0;
    }

    setInterval(() => {
      current++;
      goToSlide(current);

      // 원본 끝나면 리셋 (복제 포함 기준)
      if (current >= total) {
        setTimeout(() => {
          resetPosition(); // 0으로 돌아감
        }, 600); // transition 끝날 때쯤
      }
    }, 3000);
  }
});