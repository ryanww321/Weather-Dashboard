$(document).ready(function() {

    $("#search-button").on("click", function(){
        var cityName = $("#search-request").val();
        var APIKey = "ccc2656c477fe39eb770c7555e7b98eb";
        var searchURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName +"&units=imperial&appid=" + APIKey;
            //api.openweathermap.org/data/2.5/forecast?q={city name},{country code}
            $.ajax({
                url : searchURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
            });
    })



});

