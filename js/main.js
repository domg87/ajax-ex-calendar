$(document).ready(function() {

    // data iniziale del calendario
    var date = "2018-01-01";

    var momentDate = moment(date);

    // template dei giorni del mio calendario
    var source = $("#day-template").html();
    var template = Handlebars.compile(source);

    // stampo i giorni del mio calendario
    for (var i = 1; i <= momentDate.daysInMonth(); i++) {

        var context = {
            "day": i,
            "month": momentDate.format("MMMM"),
            "dateComplete": momentDate.format("YYYY-MM-DD")
        };

        var html = template(context);

        $("#days").append(html);

        momentDate.add(1, 'day');
    }


    // faccio una chiamata ajax
    $.ajax( {
        "url":"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
        "data": {
            "year": 2018,
            "month": 0
        },
        "method": "GET",
        "success": function(data) {
            printHolidays(data.response);
            
        },
        "error": function(errori) {
            alert("errore");
        }
    });


});

// festivita di colore rosso
function printHolidays(holidays) {

    if(holidays.length > 0) {
        for(var i = 0; i < holidays.length; i++) {

            var holidayDate = holidays[i].date;
            var holidayName = holidays[i].name;

            $(".day[data-giorno='"+holidayDate+"']").addClass("holiday");
            $(".day[data-giorno='"+holidayDate+"'] .holidayType").text("- "+holidayName);
        }
    }
}