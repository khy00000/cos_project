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

  // 리디렉션
  setTimeout(() => {
    location.href = "index.html";
  }, 500);
}
