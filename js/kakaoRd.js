document.getElementById("kakaologin").addEventListener("click", function (e) {
  e.preventDefault();

  Kakao.init("767a22495c7396d75b6be80f52a05963");

  Kakao.Auth.authorize({
    redirectUri: "http://127.0.0.1:5500/callback.html",
    scope: "profile_nickname,profile_image,account_email",
  });
});
