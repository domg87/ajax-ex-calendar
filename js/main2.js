// FUNZIONI SCRIPT
function renderCalendar(date) {
    // copia dell'oggetto date per manipolarlo come voglio
    var dateCalendar = moment(date);

    // pulisco la lista
    $("#days").html("");
    // modifica intestazione mese
    $("h1").text(dateCalendar.format("MMMM YYYY"));
    // giorni del mese delle date passata come argomento della funzione
    var dayInMonth = dateCalendar.daysInMonth();

    // preparazione del template del <li> dei giorni
    var source = $("#day-template").html();
    var template = Handlebars.compile(source);

    // creo ciclo per stampare i giorni del mese
    for (var i = 1; i <= dayInMonth; i++) {

        // creazione del content
        var data = {
            "day": i,
            "month": dateCalendar.format("MMMM"),
            "dateComplite": dateCalendar.format("YYYY-MM-DD")
        };
        //console.log(template(data));

        // creazione del codice html del giorno
        var html = template(data);
        // inserimento del giorno nella pagina
        $("#days").append(html);
        // incrementiamo di 1 giorno la nostra data in date
        dateCalendar.add(1, "days");
    }
}

// funzione che fa la chiamata alle api e stampa le festivita
function renderHolidays(date) {
    $.ajax(
        {
            "url": "https://flynn.boolean.careers/exercises/api/holidays",
            "data": {
                "year": 2018,
                "month": date.format("M") - 1
            },
            "method": "GET",
            "success": function(data) {
                var response = data.response;
                for (var i = 0; i < response.length; i++) {
                    var dateHoliday = response[i].date;
                    var nameHoliday = response[i].name;
                    $(".day[data-giorno='"+ dateHoliday +"']").addClass("holiday");
                    $(".day[data-giorno='"+ dateHoliday +"'] span").text(nameHoliday);
                }

            },
            "error": function() {
                alert("Errore!!");
            }
        }
    );
}


$(document).ready(function() {

    var date = ("2018-01-01");
    //var momentDate = moment("2018-01-01");
    //console.log(momentDate.daysIsMonth());
  
    renderCalendar(date);
    renderHolidays(date);

    

    $(".prev").click(function() {

        if(date.format("M") == 1) {
            alert("Non puoi andare indietro!!");
        } else {
            // spostare la data 1 mese indietro
            date.subtract(1, 'months');
            renderCalendar(date);
            renderHolidays(date);
        }

    });

});

