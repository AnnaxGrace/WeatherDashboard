

//This uses local storage to fill in all of the necessary slots
var lastCity = localStorage.getItem("CityName")
var lat = "";
var long = "";

    //URLs for current data and the future data
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + lastCity + "&appid=84c9f7b047fa7da5be9f1cbf36387401"
        var currentURL="https://api.openweathermap.org/data/2.5/weather?q=" + lastCity +  "&appid=84c9f7b047fa7da5be9f1cbf36387401"
    

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
            
                //This converts all the received kelvin data in farenheit
                var tempF1 = (response.list[4].main.temp - 273.15) * 1.80 + 32;
                var tempF2 = (response.list[12].main.temp - 273.15) * 1.80 + 32;
                var tempF3 = (response.list[20].main.temp - 273.15) * 1.80 + 32;
                var tempF4 = (response.list[28].main.temp - 273.15) * 1.80 + 32;
                var tempF5 = (response.list[36].main.temp - 273.15) * 1.80 + 32;
            
                //This updates all of the dates in the forecast cards
                $(".Date1").text(response.list[4].dt_txt);
                $(".Date2").text(response.list[12].dt_txt);
                $(".Date3").text(response.list[20].dt_txt);
                $(".Date4").text(response.list[28].dt_txt);
                $(".Date5").text(response.list[36].dt_txt);
    
                //This updates all the temperatures in the forecast cards, using the calculated Farenheit
                $(".temp1").text("Temp: " + tempF1.toFixed(2));
                $(".temp2").text("Temp: " + tempF2.toFixed(2));
                $(".temp3").text("Temp: " + tempF3.toFixed(2));
                $(".temp4").text("Temp: " + tempF4.toFixed(2));
                $(".temp5").text("Temp: " + tempF5.toFixed(2));
    
                //This updates all the humidity data in the forecast cards
                $(".humidity1").text("Humidity: " + response.list[4].main.humidity);
                $(".humidity2").text("Humidity: " + response.list[12].main.humidity);
                $(".humidity3").text("Humidity: " + response.list[20].main.humidity);
                $(".humidity4").text("Humidity: " + response.list[28].main.humidity);
                $(".humidity5").text("Humidity: " + response.list[36].main.humidity);
    
                //These next sets create an image tag so that we can use the icon data to create an icon
                var newIcon1 = response.list[4].weather[0].icon
                var newIcon1URL = "http://openweathermap.org/img/w/" + newIcon1 + ".png";
                var newImage1 = $("<img>")
                newImage1.attr("src", newIcon1URL);
                $("#icon1").empty();
                $("#icon1").append(newImage1)
    
                var newIcon2 = response.list[12].weather[0].icon
                var newIcon2URL = "http://openweathermap.org/img/w/" + newIcon2 + ".png";
                var newImage2 = $("<img>")
                newImage2.attr("src", newIcon2URL);
                $("#icon2").empty();
                $("#icon2").append(newImage2)
    
                var newIcon3 = response.list[20].weather[0].icon
                var newIcon3URL = "http://openweathermap.org/img/w/" + newIcon3 + ".png";
                var newImage3 = $("<img>")
                newImage3.attr("src", newIcon3URL);
                $("#icon3").empty();
                $("#icon3").append(newImage3)
    
                var newIcon4 = response.list[28].weather[0].icon
                var newIcon4URL = "http://openweathermap.org/img/w/" + newIcon4 + ".png";
                var newImage4 = $("<img>")
                newImage4.attr("src", newIcon4URL);
                $("#icon4").empty();
                $("#icon4").append(newImage4)
    
                var newIcon5 = response.list[36].weather[0].icon
                var newIcon5URL = "http://openweathermap.org/img/w/" + newIcon5 + ".png";
                var newImage5 = $("<img>")
                newImage5.attr("src", newIcon5URL);
                $("#icon5").empty();
                $("#icon5").append(newImage5) 
        });

        //This is the ajax for the current weather
        $.ajax ({
            url: currentURL,
            method: "GET"
        })
        .then(function(result) {
    
            var newIconCurrent = result.weather[0].icon
            var newIconCurrentURL = "http://openweathermap.org/img/w/" + newIconCurrent + ".png";
            var newImageCurrent = $("<img>")
            newImageCurrent.attr("src", newIconCurrentURL);
            $(".headCityIcon").empty();
            $(".headCityIcon").append(newImageCurrent)
            
            var tempCurrent = (result.main.temp - 273.15) * 1.80 + 32;
            var d = new Date().toLocaleDateString()
            $(".headCity").html(result.name + "  " + d);
            localStorage.setItem("CityName", result.name)
            $(".currentCityTemp").text("Temperature: " + tempCurrent.toFixed(2));
            $(".currentCityHumidity").text("Humidity: " + result.main.humidity);
            $(".currentCityWind").text("Wind Speed: " + result.wind.speed);
            
            //This gets the latitude and longitude for the UV so that we can run the next api
            long = result.coord.lon
            lat = result.coord.lat
           
            
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + long + "&appid=84c9f7b047fa7da5be9f1cbf36387401"

            $.ajax ({
                url: uvURL,
                method: "GET"
            })
            .then(function(uvresponse) {
                var uvData = uvresponse[3].value
                var uvNumber = parseFloat(uvData);

                //a set of if statements that use the uv number to change the background color
                if (uvNumber <= 2 ) {
                    $(".uvColor").attr("style", "background-color: green;");
                }
                if (uvNumber > 2 && uvNumber < 6) {
                    $(".uvColor").attr("style", "background-color: yellow;");
                }
                if (uvNumber < 8 && uvNumber > 5) {
                    $(".uvColor").attr("style", "background-color: orange;");
                }
                if (uvNumber > 7 && uvNumber < 11) {
                    $(".uvColor").attr("style", "background-color: red");
                }
                if (uvNumber >= 11) {
                    $(".uvColor").attr("style", "background-color: purple;");
                }
                $(".currentCityUV").html("UV Index: " + uvNumber);
            });
        });
    

//THIS IS WHEN I CLICK THE SAVE ICON, it runs all the code above using the form input
$(".searchBtn").on("click", function(event) {

    event.preventDefault();
    var city = $(".inputCity").val()
    //this creates a new button with the value of the city name
    var newButton = $("<button>");
    newButton.text(city);
    newButton.attr("class", "nextCity btn");
    newButton.attr("type", "button");
    newButton.attr("value", city);
    
    $(".previousCities").prepend(newButton);


    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=84c9f7b047fa7da5be9f1cbf36387401"
    var currentURL="https://api.openweathermap.org/data/2.5/weather?q=" + city +  "&appid=84c9f7b047fa7da5be9f1cbf36387401"
    

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
        

            var tempF1 = (response.list[4].main.temp - 273.15) * 1.80 + 32;
            var tempF2 = (response.list[12].main.temp - 273.15) * 1.80 + 32;
            var tempF3 = (response.list[20].main.temp - 273.15) * 1.80 + 32;
            var tempF4 = (response.list[28].main.temp - 273.15) * 1.80 + 32;
            var tempF5 = (response.list[36].main.temp - 273.15) * 1.80 + 32;
        

            $(".Date1").text(response.list[4].dt_txt);
            $(".Date2").text(response.list[12].dt_txt);
            $(".Date3").text(response.list[20].dt_txt);
            $(".Date4").text(response.list[28].dt_txt);
            $(".Date5").text(response.list[36].dt_txt);

            $(".temp1").text("Temp: " + tempF1.toFixed(2));
            $(".temp2").text("Temp: " + tempF2.toFixed(2));
            $(".temp3").text("Temp: " + tempF3.toFixed(2));
            $(".temp4").text("Temp: " + tempF4.toFixed(2));
            $(".temp5").text("Temp: " + tempF5.toFixed(2));

            $(".humidity1").text("Humidity: " + response.list[4].main.humidity);
            $(".humidity2").text("Humidity: " + response.list[12].main.humidity);
            $(".humidity3").text("Humidity: " + response.list[20].main.humidity);
            $(".humidity4").text("Humidity: " + response.list[28].main.humidity);
            $(".humidity5").text("Humidity: " + response.list[36].main.humidity);


            var newIcon1 = response.list[4].weather[0].icon
            var newIcon1URL = "http://openweathermap.org/img/w/" + newIcon1 + ".png";
            var newImage1 = $("<img>")
            newImage1.attr("src", newIcon1URL);
            $("#icon1").empty();
            $("#icon1").append(newImage1)

            var newIcon2 = response.list[12].weather[0].icon
            var newIcon2URL = "http://openweathermap.org/img/w/" + newIcon2 + ".png";
            var newImage2 = $("<img>")
            newImage2.attr("src", newIcon2URL);
            $("#icon2").empty();
            $("#icon2").append(newImage2)

            var newIcon3 = response.list[20].weather[0].icon
            var newIcon3URL = "http://openweathermap.org/img/w/" + newIcon3 + ".png";
            var newImage3 = $("<img>")
            newImage3.attr("src", newIcon3URL);
            $("#icon3").empty();
            $("#icon3").append(newImage3)

            var newIcon4 = response.list[28].weather[0].icon
            var newIcon4URL = "http://openweathermap.org/img/w/" + newIcon4 + ".png";
            var newImage4 = $("<img>")
            newImage4.attr("src", newIcon4URL);
            $("#icon4").empty();
            $("#icon4").append(newImage4)

            var newIcon5 = response.list[36].weather[0].icon
            var newIcon5URL = "http://openweathermap.org/img/w/" + newIcon5 + ".png";
            var newImage5 = $("<img>")
            newImage5.attr("src", newIcon5URL);
            $("#icon5").empty();
            $("#icon5").append(newImage5)

    


        
    });

    $.ajax ({
        url: currentURL,
        method: "GET"
    })
    .then(function(result) {

        var newIconCurrent = result.weather[0].icon
        var newIconCurrentURL = "http://openweathermap.org/img/w/" + newIconCurrent + ".png";
        var newImageCurrent = $("<img>")
        newImageCurrent.attr("src", newIconCurrentURL);
        $(".headCityIcon").empty();
        $(".headCityIcon").append(newImageCurrent)
        
        var tempCurrent = (result.main.temp - 273.15) * 1.80 + 32;
        var d = new Date().toLocaleDateString()
        $(".headCity").html(result.name + "  " + d);
        localStorage.setItem("CityName", result.name)
        $(".currentCityTemp").text("Temperature: " + tempCurrent.toFixed(2));
        $(".currentCityHumidity").text("Humidity: " + result.main.humidity);
        $(".currentCityWind").text("Wind Speed: " + result.wind.speed);

        long = result.coord.lon
        lat = result.coord.lat
       

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + long + "&appid=84c9f7b047fa7da5be9f1cbf36387401"
        $.ajax ({
            url: uvURL,
            method: "GET"
        })
        .then(function(uvresponse) {
            var uvData = uvresponse[3].value
            var uvNumber = parseFloat(uvData);
            if (uvNumber <= 2 ) {
                $(".uvColor").attr("style", "background-color: green;");
            }
            if (uvNumber > 2 && uvNumber < 6) {
                $(".uvColor").attr("style", "background-color: yellow;");
            }
            if (uvNumber < 8 && uvNumber > 5) {
                $(".uvColor").attr("style", "background-color: orange;");
            }
            if (uvNumber > 7 && uvNumber < 11) {
                $(".uvColor").attr("style", "background-color: red");
            }
            if (uvNumber >= 11) {
                $(".uvColor").attr("style", "background-color: purple;");
            }
            $(".currentCityUV").html("UV Index: " + uvNumber);
        });

    });
    

});

//THIS IS WHEN I CLICK THE PREVIOUSLY SAVED BTNS, it runs all the code above using the value determined when I input the form information
$("body").on("click", ".nextCity", function() {

    event.preventDefault();
    var nextCity = $(this).val()
   

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + nextCity + "&appid=84c9f7b047fa7da5be9f1cbf36387401"
    var currentURL="https://api.openweathermap.org/data/2.5/weather?q=" + nextCity +  "&appid=84c9f7b047fa7da5be9f1cbf36387401"
    

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
        

            var tempF1 = (response.list[4].main.temp - 273.15) * 1.80 + 32;
            var tempF2 = (response.list[12].main.temp - 273.15) * 1.80 + 32;
            var tempF3 = (response.list[20].main.temp - 273.15) * 1.80 + 32;
            var tempF4 = (response.list[28].main.temp - 273.15) * 1.80 + 32;
            var tempF5 = (response.list[36].main.temp - 273.15) * 1.80 + 32;
        

            $(".Date1").text(response.list[4].dt_txt);
            $(".Date2").text(response.list[12].dt_txt);
            $(".Date3").text(response.list[20].dt_txt);
            $(".Date4").text(response.list[28].dt_txt);
            $(".Date5").text(response.list[36].dt_txt);

            $(".temp1").text("Temp: " + tempF1.toFixed(2));
            $(".temp2").text("Temp: " + tempF2.toFixed(2));
            $(".temp3").text("Temp: " + tempF3.toFixed(2));
            $(".temp4").text("Temp: " + tempF4.toFixed(2));
            $(".temp5").text("Temp: " + tempF5.toFixed(2));

            $(".humidity1").text("Humidity: " + response.list[4].main.humidity);
            $(".humidity2").text("Humidity: " + response.list[12].main.humidity);
            $(".humidity3").text("Humidity: " + response.list[20].main.humidity);
            $(".humidity4").text("Humidity: " + response.list[28].main.humidity);
            $(".humidity5").text("Humidity: " + response.list[36].main.humidity);


            var newIcon1 = response.list[4].weather[0].icon
            var newIcon1URL = "http://openweathermap.org/img/w/" + newIcon1 + ".png";
            var newImage1 = $("<img>")
            newImage1.attr("src", newIcon1URL);
            $("#icon1").empty();
            $("#icon1").append(newImage1)

            var newIcon2 = response.list[12].weather[0].icon
            var newIcon2URL = "http://openweathermap.org/img/w/" + newIcon2 + ".png";
            var newImage2 = $("<img>")
            newImage2.attr("src", newIcon2URL);
            $("#icon2").empty();
            $("#icon2").append(newImage2)

            var newIcon3 = response.list[20].weather[0].icon
            var newIcon3URL = "http://openweathermap.org/img/w/" + newIcon3 + ".png";
            var newImage3 = $("<img>")
            newImage3.attr("src", newIcon3URL);
            $("#icon3").empty();
            $("#icon3").append(newImage3)

            var newIcon4 = response.list[28].weather[0].icon
            var newIcon4URL = "http://openweathermap.org/img/w/" + newIcon4 + ".png";
            var newImage4 = $("<img>")
            newImage4.attr("src", newIcon4URL);
            $("#icon4").empty();
            $("#icon4").append(newImage4)

            var newIcon5 = response.list[36].weather[0].icon
            var newIcon5URL = "http://openweathermap.org/img/w/" + newIcon5 + ".png";
            var newImage5 = $("<img>")
            newImage5.attr("src", newIcon5URL);
            $("#icon5").empty();
            $("#icon5").append(newImage5)

    


        
    });

    $.ajax ({
        url: currentURL,
        method: "GET"
    })
    .then(function(result) {

        var newIconCurrent = result.weather[0].icon
        var newIconCurrentURL = "http://openweathermap.org/img/w/" + newIconCurrent + ".png";
        var newImageCurrent = $("<img>")
        newImageCurrent.attr("src", newIconCurrentURL);
        $(".headCityIcon").empty();
        $(".headCityIcon").append(newImageCurrent)
        
        var tempCurrent = (result.main.temp - 273.15) * 1.80 + 32;
        var d = new Date().toLocaleDateString()
        $(".headCity").html(result.name + "  " + d);
        localStorage.setItem("CityName", result.name)
        $(".currentCityTemp").text("Temperature: " + tempCurrent.toFixed(2));
        $(".currentCityHumidity").text("Humidity: " + result.main.humidity);
        $(".currentCityWind").text("Wind Speed: " + result.wind.speed);

        long = result.coord.lon
        lat = result.coord.lat
       

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + long + "&appid=84c9f7b047fa7da5be9f1cbf36387401"
        $.ajax ({
            url: uvURL,
            method: "GET"
        })
        .then(function(uvresponse) {
            var uvData = uvresponse[3].value
            var uvNumber = parseFloat(uvData);
            if (uvNumber <= 2 ) {
                $(".uvColor").attr("style", "background-color: green;");
            }
            if (uvNumber > 2 && uvNumber < 6) {
                $(".uvColor").attr("style", "background-color: yellow;");
            }
            if (uvNumber < 8 && uvNumber > 5) {
                $(".uvColor").attr("style", "background-color: orange;");
            }
            if (uvNumber > 7 && uvNumber < 11) {
                $(".uvColor").attr("style", "background-color: red");
            }
            if (uvNumber >= 11) {
                $(".uvColor").attr("style", "background-color: purple;");
            }
            $(".currentCityUV").html("UV Index: " + uvNumber);
        });

    });
    

});






