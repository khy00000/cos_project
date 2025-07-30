// 띠 배너 닫기
$(".topnav_t_close, .topnav_b_close").on("click", function () {
  $(this).parent().hide();
  updateMNavHeight();
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
  const navHeight = $("#nav").outerHeight();

  if (scrollTop >= topnavHeight) {
    $("#nav").addClass("fixed");
    $("body").css("padding-top", navHeight);
  } else {
    $("#nav").removeClass("fixed");
    $("body").css("padding-top", "0");
  }

  updateMNavHeight();
});

// 모바일 메뉴 오픈/클로즈
$(".mo-button").on("click", function () {
  $(this).toggleClass("active");
  $(".m-nav").toggleClass("active");

  const isOpen = $(".m-nav").hasClass("active");
  if (isOpen) {
    $("html").addClass("m-open");
  } else {
    $("html").removeClass("m-open");
    resetMobileAccordion();
  }

  updateMNavHeight();
});

// 모바일 메뉴 높이 업데이트
function updateMNavHeight() {
  if ($(window).width() <= 1024) {
    const $nav = $("#nav");
    const navH = $nav.outerHeight() || 0;

    const tH = $(".topnav_t:visible").outerHeight() || 0;
    const bH = $(".topnav_b:visible").outerHeight() || 0;
    const bannersH = tH + bH;

    const isFixed = $nav.hasClass("fixed");

    const offset = isFixed ? navH : navH + bannersH;

    $(".m-nav").css("height", `calc(100vh - ${offset}px)`);
  }
}

// 모바일 메뉴 토글
$(".m-depth1 > li").on("click", function () {
  $(this).toggleClass("active");
});

// 모바일 메뉴 토글 리셋
function resetMobileAccordion() {
  $(".m-depth1 > li").removeClass("active");
}

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

      // 원본 끝나면 리셋
      if (current >= total) {
        setTimeout(() => {
          resetPosition(); // 0으로 돌아감
        }, 600); // transition 끝날 때쯤
      }
    }, 5000);
  }

  $(window).on("resize", function () {
    if ($("#login").hasClass("active")) {
      // 로그인 창이 열려 있으면 리로드하지 않음
      return;
    }

    location.reload();
  });
});

// 모바일 서비스 아코디언 메뉴
$(".service-wrap").on("click", function () {
  $(this).toggleClass("active");
});

// 로그인 창 온오프
$(".login-open").on("click", function () {
  $("#login").addClass("active");
  $(".menueffect").addClass("login-active");

  const isOpen = $("#login").hasClass("active");
  if (isOpen) {
    $("html").addClass("m-open");
  } else {
    $("html").removeClass("m-open");
  }
});

$(".login-close").on("click", function () {
  $("#login").removeClass("active");
  $(".menueffect").removeClass("login-active");
  $("html").removeClass("m-open");
});

// 오버레이 클릭시 로그인창 벗어남
$(".menueffect").on("mousedown touchstart", function (e) {
  if ($(e.target).is(".menueffect")) {
    $("#login").removeClass("active");
    $(".menueffect").removeClass("login-active");
    $("html").removeClass("m-open");
  }
});
