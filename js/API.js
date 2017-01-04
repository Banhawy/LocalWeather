//API Call
/*navigator.geolocation.getCurrentPosition(function (position){
    $("#location").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
  });
*/



$("#quote_btn").on("click", function() {

  $.ajax({
    type: 'GET',
    url: 'api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=9d1f664d7c8d2bf96dae8ae0cb28164e ',
    dataType: 'jsonp',
    success: function(data) {
    	var main = data.wather.main;
        $("#location").html("<h1>It Works!</h1>");
    }})});


/*$(document).ready(function () {
    $.get('api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=9d1f664d7c8d2bf96dae8ae0cb28164e', function (data) {
        $("#location").html("<h1>It Works!</h1>");

    });
});*/