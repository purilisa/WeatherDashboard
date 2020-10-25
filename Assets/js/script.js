$(document).ready(function () {

    //global variables    
    const OpenWeatherKey = "&appid=c852507f123d8169cec2128f56a18795";
    var history = JSON.parse(localStorage.getItem("history")) || [];
    if (history.length > 0) {
        getWeatherData(history[history.length - 1])
    }
    let long = "";
    let lat = "";

    function getWeatherData(inputCity) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&units=imperial" + OpenWeatherKey,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //Pushes the searched city to an array
            if (history.indexOf(inputCity) === -1) {
                history.push(inputCity);
                // Run fuction to generate button for a previously searched city          
                localStorage.setItem("history", JSON.stringify(history));
                listCities(inputCity);
            }

            $("#weatherPortal").empty();
            var date = moment(new Date(), "YYYY-MM-DD").format('MM/DD/YYYY');
            var wthIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
            var cityName = $("<h3>").text(response.name + "  (" + date + ")  ");
            cityName.attr('id', 'cityName');
            $("#cityName").append(wthIcon);

            // city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
            var wthIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
            var wthTemp = $("<p>").html("Temperature: " + response.main.temp + "&deg; F");
            var wthHumidity = $("<p>").text("Humidity: " + response.main.humidity + " %");
            var wthWindspeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");
            long = response.coord.lon;
            lat = response.coord.lat;
            console.log("long" + long);
            $("#weatherPortal").append(cityName) + $("#weatherPortal").append(wthIcon);
            $("#weatherPortal").append(wthTemp);
            $("#weatherPortal").append(wthHumidity);
            $("#weatherPortal").append(wthWindspeed);

            getForecast(inputCity);
            getUVIndex(lat, long);

        });
    }

    //get and display forecast weather
    function getForecast(inputCity) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + "&units=imperial" + OpenWeatherKey,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //$("#fivedayforecast").html("<h4>Five Day Forecast</h4>").append("<div class=\"card text-center m-auto \">");

            // var columncardcontainer= $("<div>").addClass("column");
            // var cardheading = $("<h4>").text("Five Day Forecast");
            // $("#fivedayforecast").append(rowcontainer.append(columnheadercontainer.append(cardheading)));

            $("#fivedayforecast").empty();
            for (let i = 0; i < response.list.length; i++) {

                if (response.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                    var column = $("<div>").addClass("col-md-2");
                    var card = $("<div>").addClass("card text-white bg-primary");
                    var cardbody = $("<div>").addClass("card-body p-2");

                    var cardTitle = $("<h4>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());
                    var cardImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png");
                    var cardTextTemp = $("<p>").addClass("card-text").text(response.list[i].main.temp);
                    var cardTextHumidity = $("<p>").addClass("card-text").text(response.list[i].main.humidity);

                    column.append(card.append(cardbody.append(cardTitle, cardImage, cardTextTemp, cardTextHumidity)));
                    $("#fivedayforecast").append(column);

                }
            }
        });
    }

    function getUVIndex(lat, long) {
        $.ajax({
            url: " http://api.openweathermap.org/data/2.5/uvi?" + "lat=" + lat + "&lon=" + long + OpenWeatherKey,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var wthUvIndex = $("<p>").attr('id', 'uvindexId').text("UV Index: " + response.value);
            $("#weatherPortal").append(wthUvIndex);
            $("#uvindexId").css("width", "8rem");


            var uvindex = response.value;
            //uv index colors based on https://www.epa.gov/sunsafety/uv-index-scale-0
            $("#uvindex").css("color", "black");
            if (uvindex < 3) {
                $("#uvindexId").css("background-color", "lightgreen");
            }
            else if (uvindex < 6) {
                $("#uvindexId").css("background-color", "yellow");
            }
            else if (uvindex < 8) {
                $("#uvindexId").css("background-color", "orange");
            }
            else {
                $("#uvindexId").css("background-color", "red");
            }

        });
    }


    function listCities(city) {
        var listitem = $("<li>").addClass("list-group-item list-group-item-action historylist").text(city);
        $(".history").append(listitem);

    }

    $(".history").on("click", "li", function () {

        getWeatherData($(this).text());


    });

    $("#citySearchButton").on("click", function (event) {
        event.preventDefault();
        var inputCity = $("#citySearchname").val().trim();
        getWeatherData(inputCity);

    });

});
