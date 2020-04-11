$(document).ready(function() {
  $("#select-city").on("click", function() {
    var cityInput = $("#search-input").val().trim()

    // clear input box
    
    displayWeather(cityInput);
    loadHistory(cityInput)
    $("#search-input").val("");
  });


  var city = $("#display-city")
  var weatherDetails = $("#weather-details")
  var showFive = $("#show-five")


  function loadHistory(){
    console.log($("#search-input").val().trim())
    // console.log(cityInput);
    
    var textValue = $("#search-input").val().trim()
    var collectHistory = []
    if(collectHistory.indexOf(textValue) === -1 && textValue != ""){
      collectHistory.push(textValue)
    }
    
    console.log(collectHistory);
    
    for (var j = 0; j < collectHistory.length; j++){
      var showHistory = $("<button>")
      showHistory.text(collectHistory[j]).addClass("row btn-block col-sm-12" )
      $("#search-history").append(showHistory)
      // console.log(collectHistory[j])
    }
    showHistory.on("click", function(){
      event.preventDefault()
      console.log($(this).text())
      
      // displayWeather($(this).text())
    })    
  }
  
  function displayWeather(cityInput){
    event.preventDefault();
    city.empty()
    weatherDetails.empty()
    
    // console.log("click")
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&APPID=166a433c57516f51dfab1f7edaed8413"
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response)
      var longitude = response.coord.lon
      var latitude = response.coord.lat
      // console.log(longitude, latitude)
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
      // loadHistory(cityInput)
      fiveDay(cityInput)
    }    
    // $("#select-city").on("click", displayWeather);{
    // }
    
    function fiveDay(cityInput){
      // var cityInput = $("#search-input").val().trim()
      showFive.empty()
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=166a433c57516f51dfab1f7edaed8413"
      
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data){
        
        $("#forecast").text("5 Day Forecast:")
           
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