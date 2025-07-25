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
  let currentIndex = 0; //현재 이미지
  $(".sliderWrap").append($(".slider").first().clone(true)); //첫번째 이미지를 복사해서 마지막에 추가

  setInterval(() => {
    currentIndex++; //현재 이미지를 1씩 추가
    $(".sliderWrap").animate({ marginLeft: -100 * currentIndex + "%" }, 600); //이미지 애니메이션

    if (currentIndex == 2) {
      //마지막 이미지
      setTimeout(() => {
        $(".sliderWrap").animate({ marginLeft: 0 }, 0); //애니메이션 정지
        currentIndex = 0; //현재 이미지 초기화
      }, 700);
    }
  }, 3000);
});
