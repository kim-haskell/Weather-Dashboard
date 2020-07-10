$(document).ready(function(){
    $("#search-button").on("click", function(){

        var searchValue = $("#search-value").val();
        $("search-value").val("");
        searchWeather(searchValue);

    });
    $(".list-group history").on("click", "li", function(){

    });

    function makeRow(text) {
        searchWeather($(this).text());
    }

    function searchWeather(searchValue) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=a13b9c3cca609f2bad9924f130ee8841&units=imperial";
        $.ajax({
          url: queryURL, 
          method: "GET",
          dataType: "JSON", 
          success: function(response){
               //console.log(response.wind.speed)
            var wind = $("<p>").addClass("card-text").text("Wind-speed: " + response.wind.speed + " mph");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + " Fahrenheit");
            var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + " %");
            var uvIndex = $("<p>").addClass("card-text").text("UV Index: " + response.main.uvIndex)
            
           $("#today").append(searchValue);
           $("#today").append(temp);
           $("#today").append(wind);
           $("#today").append(humidity);
           $("#today").append(uvIndex);

          }
        });
    }

   function getForecast(searchValue) {
       
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=a13b9c3cca609f2bad9924f130ee8841&units=imperial";
        $.ajax({
        url: queryURL2,
         method: "GET",
         dataType: "JSON",
         success: function(data){
             console.log(data.main.temp)
             var day1 = $("<div>").addClass("card-forecast").text("Temperature: " + data.main.temp + " Fahrenheit");

             $("#forecast").append(day1);
         }
       })
   }
    var history = JSON.parse(window.localStorage.getItem("history")) || [];

    if (history.length > 0) {
        searchWeather(history[history.length-1]);
    }
    for (var i = 0; i < history.length; i++){
        makeRow(history[i]);
    }
    
    })