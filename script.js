$(document).ready(function(){
    $("#search-button").on("click", function(){

        var searchValue = $("#search-value").val();
        $("search-value").val("");
        searchWeather(searchValue);
        getForecast(searchValue);

    });
    $(".list-group history").on("click", "li", function(){
        searchWeather($(this).text());
    });

    function makeRow(text) {
        var listItem = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(listItem)
    }

    function searchWeather(searchValue) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=a13b9c3cca609f2bad9924f130ee8841&units=imperial";
        $.ajax({
          url: queryURL, 
          method: "GET",
          dataType: "JSON", 
          success: function(response){
               console.log(response)
            if (history.indexOf(searchValue) === -1){
                history.push(searchValue);
                window.localStorage.setItem("history", JSON.stringify(history));
                makeRow(searchValue)
            }



             $("#today").empty();  
            var city = $("<h1>").addClass("card-text").text(response.name); 
            var wind = $("<p>").addClass("card-text").text("Wind-speed: " + response.wind.speed + " mph");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + " Fahrenheit");
            var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + " %");
            var uvIndex = $("<p>").addClass("card-text").text("UV Index: " + response.main.uvIndex)
            
           $("#today").append(city);
           $("#today").append(icon);
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
             console.log(data);
             $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
             for (var i =0; i < data.list.length; i++){
                 if (data.list[i].dt_txt.indexOf("12:00:00") !== -1){
                    var col = $("<div>").addClass("col-md-2");
                    var card = $("<div>").addClass("card bg-primary text-white");
                    var body = $("<div>").addClass("card-body p-2");
                   // var titleDate = 
                   var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                   var temp = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp);
                   var humid = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity);
                   col.append(card.append(body.append(temp, humid, icon)));
                   $("#forecast .row").append(col)
                 }
             }
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