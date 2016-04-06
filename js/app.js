$( document ).ready(function() {
    
    var firebase = new Firebase('https://scorching-inferno-4736.firebaseio.com/');
    
    var isBotttomMessage = true;
    var messageIndex = 0;
    
    $('#myModal').modal('show');
    
    $('#myModal').on('hide.bs.modal', function(e) {
        if (!isValidUsername()) {
            e.preventDefault();
        }
    })
    
    $('#save_username_btn').click(function() {
        $('#myModal').modal('hide');
    });
    
    firebase.on('child_added', function(snapshot) {
        var data = snapshot.val();
        if (typeof data != 'undefined' && typeof data.name != 'undefined' && typeof data.message != 'undefined') {
            $('.message-response').find('.inner').append('<p class="message" id="message' + messageIndex +'"><b>' + htmlEntities(data.name) + ':</b> ' + htmlEntities(data.message) + ' </p>');
            $('p#message'+messageIndex).emoticonize();
            messageIndex++;
        }
        if (isBotttomMessage) {
            $('.message-response').scrollTop($('.message-response').find('.inner').height());
        }
    });
    
    $('#message_input').keypress(function(e) {
        if (e.which == 13) {
            var message = $('#message_input').val().trim();
            if (message != '') {
                firebase.push({name: $('#username_input').val().trim(), message: message});
            }
            $('#message_input').val('');
        }
    });   
    
    $('.message-response').scroll(function() {
        isBotttomMessage = $('.message-response').scrollTop() >= $('.message-response').find('.inner').height() - 600 - 15 ;
    });
    
    function isValidUsername() {
        return $('#username_input').val().trim() != '';
    };
    
    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
});

