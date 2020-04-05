function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

function api() {
    var req = new XMLHttpRequest();
    req.open("GET", "https://coronavirus-19-api.herokuapp.com/countries/spain", false);
    req.send(null);

    var res = JSON.parse(req.responseText);
    $('#confirmed').html(formatNumber(res.cases));
    $('#deaths').html(formatNumber(res.deaths));
    $('#recovered').html(formatNumber(res.recovered));

    var reqTime = new XMLHttpRequest();
    reqTime.open("GET", "https://corona.lmao.ninja/all", false);
    reqTime.send(null);
    var resTime = JSON.parse(reqTime.responseText);
    moment.locale('es');
    $('#time').html(moment(resTime.updated).calendar());
}

function api_reserva() {
    var req = new XMLHttpRequest();
    req.open("GET", "https://covid19.mathdro.id/api/countries/spain", false);
    req.send(null);
    var res = JSON.parse(req.responseText);

    $('#confirmed').html(formatNumber(res.confirmed.value));
    $('#deaths').html(formatNumber(res.deaths.value));
    $('#recovered').html(formatNumber(res.recovered.value));

    moment.locale('es');
    $('#time').html(moment(res.lastUpdated).calendar());
}

function cargar() {
    setTimeout(
        function() {
            $('#loader').hide();
            $('#content').fadeIn('slow');
        }, 900);
    setTimeout(
        function() {
            particlesJS.load('particles-js', 'particlesjs-config.json');
        }, 1900);
}

function descargar() {
    $('#loader').show();
    $('#content').hide();
}

function loadpage() {
    try {
        api();
        //setInterval(api, 60 * 1000);
        cargar();
    } catch (error) {
        api_reserva();
        //setInterval(api_reserva, 60 * 1000);
        cargar();
    }
}
$(window).on('load', function() {
    loadpage();
});


$(document).ready(function() {
    var hidden, visibilityState, visibilityChange;

    if (typeof document.hidden !== "undefined") {
        hidden = "hidden", visibilityChange = "visibilitychange", visibilityState = "visibilityState";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden", visibilityChange = "msvisibilitychange", visibilityState = "msVisibilityState";
    }

    var document_hidden = document[hidden];

    document.addEventListener(visibilityChange, function() {
        if (document_hidden != document[hidden]) {
            if (document[hidden]) {
                descargar();
            } else {
                loadpage();
            }

            document_hidden = document[hidden];
        }
    });
});