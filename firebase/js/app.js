$( document ).ready(function() {
   
   window.emojiPicker = new EmojiPicker({
        emojiable_selector: '[data-emojiable=true]',
        assetsPath: 'img',
        popupButtonClasses: 'fa fa-smile-o'
      });
      // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
      // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
      // It can be called as many times as necessary; previously converted input fields will not be converted again
      window.emojiPicker.discover();
      
    var firebase = new Firebase('https://scorching-inferno-4736.firebaseio.com/');
    var facebookData;
    
    firebase.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            facebookData = authData;
            console.log(facebookData);
            onReceiveMessage();
        }
    });
  
    var isBotttomMessage = true;
    var messageIndex = 0;
    
    
    
    $('#input_message').keypress(function(e) {
        if (e.which == 13) {
            // var message = $('.emoji-wysiwyg-editor').val().trim();
            // if (message != '') {
            //     firebase.push({name: facebookData.facebook.displayName, message: message});
            // }
            //$('.emoji-wysiwyg-editor').val('');
            
            var messageObject = $('#input_message').find('.emoji-wysiwyg-editor').clone();
            var imgs = messageObject.find('img');
            for (i = 0; i < imgs.length; i++) {
                console.log(imgs.eq(i).attr('alt'));
            }
  
            $('#input_message').find('.emoji-wysiwyg-editor').html('');
        }
    });   
    
    $('.message-response').scroll(function() {
        isBotttomMessage = $('.message-response').scrollTop() >= $('.message-response').find('.inner').height() - 600 - 15 ;
    });
    
    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    
    function onReceiveMessage() {
        firebase.on('child_added', function(snapshot) {
            var data = snapshot.val();
            if (typeof data != 'undefined' && typeof data.name != 'undefined' && typeof data.message != 'undefined') {
                $('.message-response').find('.inner').append('<div class="message" id="message' + messageIndex +'"><b>' + htmlEntities(data.name) + ':</b> ' + htmlEntities(data.message) + ' </div>');
                messageIndex++;
            }
            if (isBotttomMessage) {
                $('.message-response').scrollTop($('.message-response').find('.inner').height());
            }
        });
    }
});

