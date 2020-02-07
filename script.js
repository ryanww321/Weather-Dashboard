//Array for the search results
var searchResultsArray = [];

$(document).ready(function () {

    displayPriorSearches();

    function displayPriorSearches() {

        amendingPriorList();

        if (localStorage.pastSearches) {
            searchResultsArray = JSON.parse(localStorage.pastSearches);
        }

        if (searchResultsArray.length > 0) {
            for (var i = 0; i < searchResultsArray.length; i++) {
                var $pastSearchResult = $(`<li class="priorResultButton">${searchResultsArray[i]}</li>`);
                $("#previous-searches").append($pastSearchResult);
            }
        }

    }

    function amendingPriorList() {

        var priorUL = document.getElementById("previous-searches");
        while (priorUL.firstChild) priorUL.removeChild(priorUL.firstChild);
    }

    //on click event for the search button
    $("#search-button").on("click", function () {
        event.preventDefault();
        var cityName = $("#search-request").val();

        var APIKey = "ccc2656c477fe39eb770c7555e7b98eb";

        var searchURL =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            cityName +
            "&units=imperial&appid=" +
            APIKey;


        $.ajax({
            url: searchURL,
            method: "GET"
        }).then(function (response) {

            $("#searched-city").text(response.city.name);
            $("#main-temp").text("Temp: " + response.list[0].main.temp);
            $("#main-humidity").text("Humidty: " + response.list[0].main.humidity);
            $("#main-windspeed").text("Wind Speed" + response.list[0].wind.speed);

            var citylat = response.city.coord.lat;
            var citylong = response.city.coord.lon;

            var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + citylat + "&lon=" + citylong + "&appid=" + APIKey;

            //needed a separate call for the UV index
            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function (response) {

                $("#main-UV").text("UV level: " + response.value);

            });

            //checks for prior saved searches and removes them

            var priorUL1 = document.getElementById("day1");
            if ((priorUL1.childNodes.length != 0)) {
                while (priorUL1.firstChild) priorUL1.removeChild(priorUL1.firstChild);
            }

            var priorUL2 = document.getElementById("day2");
            if ((priorUL2.childNodes.length != 0)) {
                while (priorUL2.firstChild) priorUL2.removeChild(priorUL2.firstChild);
            }

            var priorUL3 = document.getElementById("day3");
            if ((priorUL3.childNodes.length != 0)) {
                while (priorUL3.firstChild) priorUL3.removeChild(priorUL3.firstChild);
            }

            var priorUL4 = document.getElementById("day4");
            if ((priorUL4.childNodes.length != 0)) {
                while (priorUL4.firstChild) priorUL4.removeChild(priorUL4.firstChild);
            }

            var priorUL5 = document.getElementById("day5");
            if ((priorUL5.childNodes.length != 0)) {
                while (priorUL5.firstChild) priorUL5.removeChild(priorUL5.firstChild);
            }




            //5 day forecast starts here
            var $day1Forcast = $(`<li>${response.list[7].main.temp}</li>
            <li>${response.list[7].main.humidity}</li>
            <li>${response.list[7].wind.speed}</li>`);

            $("#day1").append($day1Forcast);

            var $day2Forcast = $(`<li>${response.list[15].main.temp}</li>
            <li>${response.list[15].main.humidity}</li>
            <li>${response.list[15].wind.speed}</li>`);

            $("#day2").append($day2Forcast);

            var $day3Forcast = $(`<li>${response.list[23].main.temp}</li>
            <li>${response.list[23].main.humidity}</li>
            <li>${response.list[23].wind.speed}</li>`);

            $("#day3").append($day3Forcast);

            var $day4Forcast = $(`<li>${response.list[31].main.temp}</li>
            <li>${response.list[31].main.humidity}</li>
            <li>${response.list[31].wind.speed}</li>`);

            $("#day4").append($day4Forcast);

            var $day5Forcast = $(`<li>${response.list[39].main.temp}</li>
            <li>${response.list[39].main.humidity}</li>
            <li>${response.list[39].wind.speed}</li>`);

            $("#day5").append($day5Forcast);


            updatePriors();
            //stores searched cities to local storage
            function updatePriors() {

                var priorSearch = response.city.name;

                searchResultsArray.push(priorSearch);

                localStorage.pastSearches = JSON.stringify(searchResultsArray);

                amendingPriorList();
                displayPriorSearches();
            }

        });

    });

    //This on click event listener uses the exact same funtions as the Search Bar
    $(".priorResultButton").on("click", function () {
        event.preventDefault();
        var cityName = $(this).text();

        var APIKey = "ccc2656c477fe39eb770c7555e7b98eb";

        var searchURL =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            cityName +
            "&units=imperial&appid=" +
            APIKey;


        $.ajax({
            url: searchURL,
            method: "GET"
        }).then(function (response) {


            $("#searched-city").text(response.city.name);
            $("#main-temp").text("Temp: " + response.list[0].main.temp);
            $("#main-humidity").text("Humidty: " + response.list[0].main.humidity);
            $("#main-windspeed").text("Wind Speed" + response.list[0].wind.speed);

            var citylat = response.city.coord.lat;
            var citylong = response.city.coord.lon;

            var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + citylat + "&lon=" + citylong + "&appid=" + APIKey;

            //Created another call for the UV index value with updated call URL
            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function (response) {

                $("#main-UV").text("UV level: " + response.value);

            });

            //checks for prior stored values and removes them if exists

            var priorUL1 = document.getElementById("day1");
            if ((priorUL1.childNodes.length != 0)) {
                while (priorUL1.firstChild) priorUL1.removeChild(priorUL1.firstChild);
            }

            var priorUL2 = document.getElementById("day2");
            if ((priorUL2.childNodes.length != 0)) {
                while (priorUL2.firstChild) priorUL2.removeChild(priorUL2.firstChild);
            }

            var priorUL3 = document.getElementById("day3");
            if ((priorUL3.childNodes.length != 0)) {
                while (priorUL3.firstChild) priorUL3.removeChild(priorUL3.firstChild);
            }

            var priorUL4 = document.getElementById("day4");
            if ((priorUL4.childNodes.length != 0)) {
                while (priorUL4.firstChild) priorUL4.removeChild(priorUL4.firstChild);
            }

            var priorUL5 = document.getElementById("day5");
            if ((priorUL5.childNodes.length != 0)) {
                while (priorUL5.firstChild) priorUL5.removeChild(priorUL5.firstChild);
            }




            //Start of 5 day forcast
            var $day1Forcast = $(`<li>${response.list[7].main.temp}</li>
            <li>${response.list[7].main.humidity}</li>
            <li>${response.list[7].wind.speed}</li>`);

            $("#day1").append($day1Forcast);

            var $day2Forcast = $(`<li>${response.list[15].main.temp}</li>
            <li>${response.list[15].main.humidity}</li>
            <li>${response.list[15].wind.speed}</li>`);

            $("#day2").append($day2Forcast);

            var $day3Forcast = $(`<li>${response.list[23].main.temp}</li>
            <li>${response.list[23].main.humidity}</li>
            <li>${response.list[23].wind.speed}</li>`);

            $("#day3").append($day3Forcast);

            var $day4Forcast = $(`<li>${response.list[31].main.temp}</li>
            <li>${response.list[31].main.humidity}</li>
            <li>${response.list[31].wind.speed}</li>`);

            $("#day4").append($day4Forcast);

            var $day5Forcast = $(`<li>${response.list[39].main.temp}</li>
            <li>${response.list[39].main.humidity}</li>
            <li>${response.list[39].wind.speed}</li>`);

            $("#day5").append($day5Forcast);




        });
    });
});
