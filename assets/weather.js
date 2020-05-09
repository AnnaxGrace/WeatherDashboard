
// var city = $(".inputCity").val()


$(".searchBtn").on("click", function(event) {

    event.preventDefault();
    var city = $(".inputCity").val()
    console.log(city);

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=84c9f7b047fa7da5be9f1cbf36387401"


    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
        
            console.log(response);

            $(".Date1").text(response.list[4].dt_txt);
            $(".Date2").text(response.list[12].dt_txt);
            $(".Date3").text(response.list[20].dt_txt);
            $(".Date4").text(response.list[28].dt_txt);
            $(".Date5").text(response.list[36].dt_txt);

            var newIcon1 = response.list[4].weather[0].icon
            var newIcon1URL = "http://openweathermap.org/img/w/" + newIcon1 + ".png";
            var newImage1 = $("<img>")
            newImage1.attr("src", newIcon1URL);
            $("#icon1").append(newImage1)

            var newIcon2 = response.list[12].weather[0].icon
            var newIcon2URL = "http://openweathermap.org/img/w/" + newIcon2 + ".png";
            var newImage2 = $("<img>")
            newImage2.attr("src", newIcon2URL);
            $("#icon2").append(newImage2)

            var newIcon3 = response.list[20].weather[0].icon
            var newIcon3URL = "http://openweathermap.org/img/w/" + newIcon3 + ".png";
            var newImage3 = $("<img>")
            newImage3.attr("src", newIcon3URL);
            $("#icon3").append(newImage3)

            var newIcon4 = response.list[28].weather[0].icon
            var newIcon4URL = "http://openweathermap.org/img/w/" + newIcon4 + ".png";
            var newImage4 = $("<img>")
            newImage4.attr("src", newIcon4URL);
            $("#icon4").append(newImage4)

            var newIcon5 = response.list[36].weather[0].icon
            var newIcon5URL = "http://openweathermap.org/img/w/" + newIcon5 + ".png";
            var newImage5 = $("<img>")
            newImage5.attr("src", newIcon5URL);
            $("#icon5").append(newImage5)

            // $(".headCity").append(response.city);
            // $(".currentCity").append("Temperature: " + response.city);
            // $(".currentCity").append("Humidity: " + response.city);
            // $(".currentCity").append("Wind Speed: " + response.city);
            // $(".currentCity").append("UV Index: " + response.uv);



        
    });

});






