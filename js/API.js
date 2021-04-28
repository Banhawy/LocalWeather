$(document).ready(function () { 

        var apiWeather;

        //Weather API call. Checks weather given location. Sets Temperature
        function getWeather(apiLink){
            $.getJSON(apiLink, function(data) {
                var location = data.name + ', '+ data.sys.country;
                var celsiusTemp = Math.floor(data.main.temp);
                var fahrenheitTemp = Math.floor(celsiusTemp*9/5 +32);
                var weatherRegex = data.weather[0].description;
                var weather = weatherRegex.replace(/\s/, "%20");
                var weatherID = data.weather[0].id;
                var apiFlickr = "https://api.flickr.com/services/rest/?method=flickr.photos.search&text=" + weather + "&format=json&nojsoncallback=1&api_key=ec0ca2ee160a19f017eb3ddcbda7ccb4";
                var weatherIcon = "<i class='wi wi-owm-"+ weatherID +"'></i>";

                //Display weather on screen
                $("#location").html("Looks like " + weatherRegex + " in " + location);
                $("#temperature").html(celsiusTemp + " °C");
                $("#weather-icon").html(weatherIcon);

                //Choose Celsius or Fahrenheit
                $("#fahrenheit").on('click',  function() {
                    $("#temperature").html(fahrenheitTemp + " °F");
                });
                $("#celsius").on('click',  function() {
                    $("#temperature").html(celsiusTemp + " °C");
                });

                //Flickr API call. Gets random weather related photo, given weather at location
                $.get(apiFlickr, function(myresult){
                    var random = Math.floor(Math.random() * 100)
                    var id = myresult.photos.photo[random].id;
                    var photoSizeApi = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&photo_id=" + id + "&format=json&nojsoncallback=1&api_key=ec0ca2ee160a19f017eb3ddcbda7ccb4";

                    //Flickr API imagesize. Gets chosen images' large sizes, and sets background image
                    $.getJSON( photoSizeApi , function(image) {
                        var allSizes = image.sizes.size; //array
                        var bigSizeUrl;
                        for (var i = 0; i<allSizes.length; i++){
                            if (allSizes[i].label === "Original" || allSizes[i].label === "Large" ){
                                bigsizeUrl = allSizes[i].source;
                            }
                        }
                            $("body").css("background-image", 'url('+ bigsizeUrl +')');
                    });
                });
            });
        }
    
        navigator.geolocation.getCurrentPosition(function (position){
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                apiWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat +"&lon="+ long +"&units=metric&APPID=9d1f664d7c8d2bf96dae8ae0cb28164e";
                getWeather(apiWeather);
            });

            //In case manual city search 
            $("input[type='text']").keypress(function(e){
                if(e.which === 13){
                  var city = $(this).val();
                  apiWeather = "https://api.openweathermap.org/data/2.5/weather?q="+ city +" &units=metric&APPID=9d1f664d7c8d2bf96dae8ae0cb28164e";
                  $(this).val("");
                  getWeather(apiWeather);
                }
            });
});

