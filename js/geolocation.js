if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(success, error);
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  $.getJSON(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=931cf418021445795381368f79037456&units=Metric`,

    function (data) {
      var $country = data.sys.country;

      $(".m-country-wrap").show();
      $(".gbnav-country, .m-country").text("배송국가 : " + $country).show();
    }

  );
}

function error() {
  alert("위치 정보 불러오기 실패");
}
