$(function() {
    var apiKey = '6a18420382686df3f9d0ac7cf344ce23';
    var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID='+ apiKey + '&units=metric&lang=fr&lat&lon';
    console.log(baseUrl);

    $('#weather button').click(function(e){
        e.preventDefault();

        var city = $('#cityName');
        var cityValue = city.val();

        var params = {
            url: baseUrl + '&q='+ cityValue,
            method:'GET'
        };

        $.ajax(params).done(function(response){
            console.log(response);
            //Show card
            $('.card').removeClass('d-none');

            //Error
            $('#cityName').removeClass('is-invalid');
            $('.invalid-feedback').slideUp();
            $('.card').show();

            //Title
            $('.card-title').text(response.name);

            //Description
            $('.description-weather').text(response.weather[0].description);

            //Temp
            var temp = Math.round(response.main.temp) + '°';
            var tempMax = Math.round(response.main.temp_max) + '°';
            var tempMin = Math.round(response.main.temp_min) + '°';
                  

            $('.temp-weather').text(temp);
            $('.temp-max-weather').text(tempMax);
            $('.temp-min-weather').text(tempMin);
            
            //Geographical coordinates
            $('.lat-city').text(response.coord.lat);
            $('.lon-city').text(response.coord.lon);

            //Images
            var image = response.weather[0].icon;
            $('.image-weather').attr('src', 'http://openweathermap.org/img/w/'+ image + '.png');
            $('.image-weather').attr('alt', response.name);
        })
        .fail(function(){
            $('.invalid-feedback').slideDown();
            city.addClass('is-invalid');
            $('.card').hide();          
        });
    }); 
    
   
    
});