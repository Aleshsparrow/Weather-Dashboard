

// var APIKey = "2d0fa82442b24204860c78bd6df0510b"
function displayWeather(){
    event.preventDefault();
    var cityInput = $("#search-input").val().trim()
        
        console.log("click")
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&APPID=2d0fa82442b24204860c78bd6df0510b"
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //   console.log(response)
          $("#display-city").text(response.name)

          var temp = $("<div>")
          temp = Math.floor((response.main.temp - 273.15) * 1.80 + 32);
          $(temp).text("Temp: " + response.main.temp + "°F")

          var humidity = $("<div>")
          $(humidity).text("Humidity: " + response.main.humidity)

          var windSpeed = $("<div>")
          $(windSpeed).text("UV Index: " + response.wind.speed)

        //   var uV = $("<div>")
        //   $(uV).text(response.)
        
        //   $("#weather-details").append(response.wind)
        $("#weather-details").append(temp, humidity, windSpeed)
})
    fiveDay()
    }


$("#select-city").on("click", displayWeather);{
    
}

function fiveDay(){
    var cityInput = $("#search-input").val().trim()
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q="+ cityInput +"&appid=2d0fa82442b24204860c78bd6df0510b"

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data){
          console.log(data)
          $("#date-one").text(data.list[1].dt_txt)
        //   var five = $("<div>")
        //   $(five).text(data.list)
        //   $("#five-day").append(five)
      })
          
          
}