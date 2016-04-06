$( document ).ready(function() {
    
    var firebase = new Firebase('https://scorching-inferno-4736.firebaseio.com/');
    
    firebase.on('child_added', function(snapshot) {
        console.log(snapshot);
    });
    
    $('#message_input').keypress(function(e) {
        if (e.which == 13) {
            var message = $('#message_input').val().trim();
            if (message != '') {
                firebase.push({name: '', message: message});
            }
            $('#message_input').val('');
        }
    });   
    
});

