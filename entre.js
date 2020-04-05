var firebaseConfig = {
    apiKey: "AIzaSyDuSUxdOiB_dzm9PG0YQLw9xPQ5iyspZTI",
    authDomain: "coronavirus-56142.firebaseapp.com",
    databaseURL: "https://coronavirus-56142.firebaseio.com",
    projectId: "coronavirus-56142",
    storageBucket: "coronavirus-56142.appspot.com",
    messagingSenderId: "621921829206",
    appId: "1:621921829206:web:117c22adc7e1e80a0496f7"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$("#form_netflix").submit(function(event) {
    event.preventDefault();
    newUser($("#name_netflix").val(), 'Netflix', $("#email_netflix").val());
    $('#input_netflix').fadeOut('slow');
    $('#alert_netflix').fadeIn('slow');
    $("#name_netflix").val('');
    $("#email_netflix").val('');
    setTimeout(function() {
        $('#ModalNetflix').modal('toggle');
        $('#input_netflix').show();
        $('#alert_netflix').hide();
    }, 2700);
});

$("#form_spotify").submit(function(event) {
    event.preventDefault();
    newUser($("#name_spotify").val(), 'Spotify', $("#email_spotify").val());
    $('#input_spotify').fadeOut('slow');
    $('#alert_spotify').fadeIn('slow');
    $("#name_spotify").val('');
    $("#email_spotify").val('');
    setTimeout(function() {
        $('#ModalSpotify').modal('toggle');
        $('#input_spotify').show();
        $('#alert_spotify').hide();
    }, 2700);
});


function newUser(name, service, email) {
    firebase.database().ref(service + '/').push({
        name: name,
        email: email
    }, function(error) {
        if (error) {
            alert('Ha ocurrido un error al procesar la petición, vuelva a intentarlo más tarde.');
        } else {
            sendMail(name, service, email);
        }
    });
}

function sendMail(name, servicio, email) {
    Email.send({
        SecureToken: "ae53f7d0-577a-4985-bb6b-d69b21919c96",
        To: 'alarconsanchezjavier@gmail.com',
        From: "info@jatup.com",
        Subject: "Nueva cuenta vendida!",
        Body: "<b>Nombre: </b>" + name + '<br> <b>Email: </b>' + email + '<br> <b>Servicio: </b>' + servicio + '</br></br><a href="mailto:' + email + '?subject=Re:Suscripción ' + servicio + '">Responder</a>'
    });
}