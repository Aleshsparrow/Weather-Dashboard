if(window.moment){
  console.log("moment not loading");
}

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
      var weatherDetails = $("#weather-details")
      // weatherDetails.innerHTML.display = "";
      console.log(response)
      // weatherDetails.innerHTML = ""
      
      var city = $("#display-city")
      city.text(response.name)
      var img = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        city.append(img)
      
      var temp = $("<div>")
      curtemp = Math.floor((response.main.temp - 273.15) * 1.80 + 32);
      $(temp).text("Temperature: " + curtemp + "°F")
      
      var humidity = $("<div>")
      $(humidity).text("Humidity: " + response.main.humidity + "%")
      
      var windSpeed = $("<div>")
      $(windSpeed).text("Wind Speed: " + response.wind.speed + "MPH")
      
      //   var uV = $("<div>")
      //   $(uV).text(response.)
      
      //   $("#weather-details").append(response.wind)
      $(weatherDetails).append(temp, humidity, windSpeed)
    })
    fiveDay()
  }
  
  // weatherDetails.style.display = "none"

$("#select-city").on("click", displayWeather);{
}

function fiveDay(){
    var cityInput = $("#search-input").val().trim()
    
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=2d0fa82442b24204860c78bd6df0510b"

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data){
          console.log(data)

          var one = $("#date-one")

          var dayOne = $("<p>")
          $(dayOne).text(data.list[4].dt_txt)

          $("#forecast").text("5 Day Forecast:")

          // var img1 = $("<img>").attr(
          //   "src",
          //   "http://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png");
            
            

            for (var i = 0; i < data.list.length; i++){
              if(data.list[i].dt_txt.indexOf("12:00:00") !== -1){
                var date = data.list[i].dt_txt.split(" ")
                console.log(date);
                var unformatDate = date[0].split("-")
                formatDate = unformatDate[1]+"/"+unformatDate[2]+"/"+unformatDate[0];
                console.log(formatDate)
                var listCards = $("<li>")
                var card = $("<div>").addClass("row col-lg-2 col-md-2 col-sm-6 col-xs-12").text(formatDate)
                var img1 = $("<img>").attr(
                  "src",
                  "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                  
                  var temp1 = $("<p>")
                  temp0 = Math.floor((data.list[i].main.temp - 273.15) * 1.80 + 32);
                  $(temp1).text("Temp: " + temp0 + "°F")
                  
                  var hum1 = $("<p>")
                  $(hum1).text("Humidity: " + data.list[i].main.humidity + "%")
                  
                  listCards.append(card, img1, temp1, hum1)
                $("#show-five").append(listCards)
                console.log(data.list[i].dt_txt);
                console.log(data.list[i].main.temp);
              }
            }
          // var temp1 = $("<p>")
          //  temp1 = Math.floor((data.main.temp - 273.15) * 1.80 + 32);
          //  $(temp1).text("Temp: " + data.list[4].main.temp + "°F")

           
           
            // one.append(img1)
          // $("#date-one").text(data.list[2].dt_txt).format('MM DD YYYY')
        //   var five = $("<div>")
        //   $(five).text(data.list)
        //   $("#five-day").append(five)

        $(one).append(dayOne, img1, hum1)
      })
          
          
}