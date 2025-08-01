const PcloginBtn = document.querySelector(".gbnav-login");
const MologinBtn = document.querySelector(".m-login");
const PclogoutBtn = document.querySelector(".log-out");
const MologoutBtn = document.querySelector(".m-log-out");

const isPc = window.innerWidth > 1024;
const isMobile = window.innerWidth <= 1024;

// 로그인 상태 확인 함수
function isLogin() {
  return sessionStorage.getItem("kakao_email") !== null;
}

// 로그인 후 UI 수정
window.addEventListener("DOMContentLoaded", function () {
  const nickname = sessionStorage.getItem("kakao_nickname");

  if (isLogin() && isPc) {
    PcloginBtn.style.display = "none";
    PclogoutBtn.style.display = "block";
    PclogoutBtn.innerHTML = `${nickname}님`;
  } else if (isLogin() && isMobile) {
    MologinBtn.style.display = "none";
    MologoutBtn.style.display = "block";
    MologoutBtn.innerHTML = `${nickname}님`;
  }
});

// 로그아웃 처리 함수
function logout() {
  sessionStorage.removeItem("kakao_nickname");
  sessionStorage.removeItem("kakao_email");
  sessionStorage.removeItem("kakao_profile");

  alert("로그아웃이 완료되었습니다.");

  if (isPc) {
    PclogoutBtn.style.display = "none";
    PcloginBtn.style.display = "block";
  } else if (isMobile) {
    MologoutBtn.style.display = "none";
    MologinBtn.style.display = "block";
  }
}

// 로그아웃 버튼
PclogoutBtn.addEventListener("click", () => {
  logout();
});

MologoutBtn.addEventListener("click", () => {
  logout();
});