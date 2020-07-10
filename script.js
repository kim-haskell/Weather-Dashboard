$(document).ready(function(){
    $("#search-button").on("click", function(){

        var searchValue = $("#search-value").val();
        $("search-value").val("");
        searchWeather(searchValue);
    });
    $(".list-group history").on("click", "li", function(){

    });

    function searchWeather(searchValue) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=a13b9c3cca609f2bad9924f130ee8841";
        $.ajax({
          url: queryURL, 
          method: "GET",
          dataType: "JSON", 
          success: function(response){
               console.log(response.wind.speed)
            var wind = $("<p>").addClass("card-text").text("wind-speed: " + response.wind.speed + "mph");
            var temp = $("<p>").addClass("card-text").text("temperature: " + response.main.temp + "Farenheit");
            var humidity = $("<p>").addClass("card-text").text("humidity: " + response.main.humidity + "%");
            var uvIndex = $("<p>").addClass("card-text").text("UV Index: " + response.main.uvIndex)
            
           $(".card-text").text(response);

          }
        });
    }

    function makeRow(text) {
        searchWeather($(this).text());
    }

   function getForecast(searchValue) {
       $.ajax({
         url: queryURL,
         method: "GET",
       }).then(function (response){
           makeRow(response);
       });
   }
    var history = JSON.parse(window.localStorage.getItem("history")) || [];

    if (history.length > 0) {
        searchWeather(history[history.length-1]);
    }
    for (var i = 0; i < history.length; i++){
        makeRow(history[i]);
    }
    
    })