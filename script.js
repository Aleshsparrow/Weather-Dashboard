// Setting an event listener for when the page loads
$(document).ready(function() {
    var errorDiv = $("<div>").text("Please enter a city name")
    $("body").append(errorDiv)
  $("#select-city").on("click", function() {
    event.preventDefault()
    errorDiv.text("")
    var cityInput = $("#search-input").val().trim()
    if(cityInput != ""){
      displayWeather(cityInput);
      loadHistory(cityInput)
      $("#search-input").val("");
    }
    else if (cityInput === ""){
      console.log("empty");
      errorDiv.text("Please enter a city name")
    }
    
  });


  var city = $("#display-city")
  var weatherDetails = $("#weather-details")
  var showFive = $("#show-five")

// Function for reloading city history
  function loadHistory(){
    var textValue = $("#search-input").val().trim()
    var collectHistory = []
    if(collectHistory.indexOf(textValue) === -1 && textValue != ""){
      collectHistory.push(textValue)
    }    
    for (var j = 0; j < collectHistory.length; j++){
      var showHistory = $("<button>")
      showHistory.text(collectHistory[j]).addClass("row btn-block col-sm-12" )
      $("#search-history").append(showHistory)
    }
    showHistory.on("click", function(){
      event.preventDefault()      
      displayWeather($(this).text())
      window.localStorage.setItem("history", JSON.stringify(collectHistory))
    })    
  }
  
  // Function to make API calls to open weather and diaplay weather on the page
  function displayWeather(cityInput){
    event.preventDefault();
    city.empty()
    weatherDetails.empty()
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&APPID=166a433c57516f51dfab1f7edaed8413"
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var longitude = response.coord.lon
      var latitude = response.coord.lat
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=166a433c57516f51dfab1f7edaed8413",
        method: "GET"
      }).then(function(res) {
        var uv = $("#uv-details")
        var index = $("<div>")
        $(index).text("UV Index: " + res.value)
      
        uv.empty()
        $(uv).append(index)
      })      
      city.text(response.name + " (" + new Date().toLocaleDateString() + ")")
      var img = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        city.append(img)
        
        var temp = $("<div>")
        curtemp = Math.floor((response.main.temp - 273.15) * 1.80 + 32).toFixed(1);
        $(temp).text("Temperature: " + curtemp + "°F")
        
        var humidity = $("<div>")
        $(humidity).text("Humidity: " + response.main.humidity + "%")
        
        var windSpeed = $("<div>")
        $(windSpeed).text("Wind Speed: " + response.wind.speed + "MPH")
        $(weatherDetails).append(temp, humidity, windSpeed)
      })
      fiveDay(cityInput)
    }    
    
    // Function to make API call for the five day forecast and display on page
    function fiveDay(cityInput){
      showFive.empty()
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=166a433c57516f51dfab1f7edaed8413"
      
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data){
        if(cityInput != ""){
          $("#forecast").text("5 Day Forecast:")

        }
           
          for (var i = 0; i < data.list.length; i++){
            if(data.list[i].dt_txt.indexOf("12:00:00") !== -1){
              var date = data.list[i].dt_txt.split(" ")
              var unformatDate = date[0].split("-")
              formatDate = unformatDate[1]+"/"+unformatDate[2]+"/"+unformatDate[0];
              var listCards = $("<li>")
              var card = $("<div>").addClass("row col-lg-3 col-md-3 col-sm-6 col-xs-12").text(formatDate)
              var img1 = $("<img>").attr(
                "src",
                "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                
                var temp1 = $("<p>")
                temp0 = Math.floor((data.list[i].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $(temp1).text("Temp: " + temp0 + "°F")
                
                var hum1 = $("<p>")
                $(hum1).text("Humidity: " + data.list[i].main.humidity + "%")
                
                listCards.append(card, img1, temp1, hum1)
                $(showFive).append(listCards)
                
              }
            }
          })
        }

      })