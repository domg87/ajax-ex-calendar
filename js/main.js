$(document).ready(function() {

    $.ajax({
        url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
        method: "GET",
        success: function(data) {
            var festivita = data.response;
            
        }
        error: function(richiesta, stato, errori) {

        }
    });


});