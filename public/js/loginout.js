const PcLoginBtn = document.querySelector(".gbnav-login");
const MoLoginBtn = document.querySelector(".m-login");
const PcProfileBtn = document.querySelector(".goprofile");
const MoProfileBtn = document.querySelector(".m-goprofile");

const isPc = window.innerWidth > 1024;
const isMobile = window.innerWidth <= 1024;

const profileNickname = document.querySelector(".profile-nickname");
const profileEmail = document.querySelector(".profile-email");

// 로그인 상태 확인 함수
function isLogin() {
  return sessionStorage.getItem("kakao_email") !== null;
}

// 로그아웃 상태 확인 함수
function isLogout() {
  return sessionStorage.getItem("kakao_email") == null;
}

// 로그인 후 UI 수정
window.addEventListener("DOMContentLoaded", function () {
  const nickname = sessionStorage.getItem("kakao_nickname");
  const email = sessionStorage.getItem("kakao_email");

  if (isLogin() && isPc) {
    PcLoginBtn.style.display = "none";
    PcProfileBtn.style.display = "block";
    PcProfileBtn.innerHTML = `${nickname}님`;
    profileNickname.innerHTML = `${nickname}님`;
    profileEmail.innerHTML = email;
  } else if (isLogin() && isMobile) {
    MoLoginBtn.style.display = "none";
    MoProfileBtn.style.display = "block";
    MoProfileBtn.innerHTML = `${nickname}님`;
    profileNickname.innerHTML = `${nickname}님`;
    profileEmail.innerHTML = email;
  }
});

// 로그아웃 처리 함수
function logoutWithKakao() {
  sessionStorage.removeItem("kakao_nickname");
  sessionStorage.removeItem("kakao_email");
  sessionStorage.removeItem("kakao_profile");

  alert("로그아웃이 완료되었습니다.");

  if (isPc) {
    PcProfileBtn.style.display = "none";
    PcLoginBtn.style.display = "block";
  } else if (isMobile) {
    MoProfileBtn.style.display = "none";
    MoLoginBtn.style.display = "block";
  }

  // 로그아웃 후 리디렉션 전 모달 복구 방지 플래그 설정
  localStorage.setItem("skipModalRestore", "true");

  // 리디렉션
  setTimeout(() => {
    location.href = "index.html";
  }, 500);
}

// 로그인 창 온오프
$(".login-open").on("click", function () {
  $("#login").addClass("active");
  $(".overlay").addClass("loginprofile-active");

  const isOpen = $("#login").hasClass("active");
  if (isOpen) {
    $("html").addClass("m-open");
  } else {
    $("html").removeClass("m-open");
  }
});

// 로그인 클로즈
$(".login-close").on("click", function () {
  $("#login").removeClass("active");
  $(".overlay").removeClass("loginprofile-active");
  $("html").removeClass("m-open");
});

// 로그인 후 프로필 창 온오프
$(".goprofile, .m-goprofile").on("click", function () {
  $("#profile").addClass("active");
  $(".overlay").addClass("loginprofile-active");

  const isOpen = $("#profile").hasClass("active");
  if (isOpen) {
    $("html").addClass("m-open");
  } else {
    $("html").removeClass("m-open");
  }
});

// 프로필 클로즈
$(".profile-close").on("click", function () {
  $("#profile").removeClass("active");
  $(".overlay").removeClass("loginprofile-active");
  $("html").removeClass("m-open");
});

// 오버레이 클릭시 로그인/프로필 창 벗어남
$(".overlay").on("mousedown touchstart", function (e) {
  if ($(e.target).is(".overlay")) {
    $("#login").removeClass("active");
    $("#profile").removeClass("active");
    $(".overlay").removeClass("loginprofile-active");
    $("html").removeClass("m-open");
  }
});

// 가로 사이즈 변할 때만 리로드
let lastWidth = $(window).width();

// 로그인/프로필 모달 켜있을때 리로드 후 active 비활성 방지
$(window).on("resize", function () {
  const currentWidth = $(window).width();

  if (currentWidth !== lastWidth) {
    lastWidth = currentWidth; // 가로 폭 갱신

    // login 모달 상태 저장
    if ($("#login").hasClass("active")) {
      localStorage.setItem("loginActive", "true");
    } else {
      localStorage.removeItem("loginActive");
    }

    // profile 모달 상태 저장
    if ($("#profile").hasClass("active")) {
      localStorage.setItem("profileActive", "true");
    } else {
      localStorage.removeItem("profileActive");
    }

    location.reload();
  }
});

// 페이지 로드 후 상태 복구
$(document).ready(function () {
  if (localStorage.getItem("skipModalRestore") === "true") {
    localStorage.removeItem("skipModalRestore");
    return; // 리디렉션 해야할 때는 복구 안함
  }

  if (localStorage.getItem("loginActive") === "true") {
    $("#login").addClass("active");
  }
  if (localStorage.getItem("profileActive") === "true") {
    $("#profile").addClass("active");
  }
});
