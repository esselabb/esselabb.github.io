$( document ).ready(function() {
    app.run();
});

var firebase = null;
var facebookData = null;
var messageIndex = 0;
var isBotttomMessage = true;
    
var app = {

    run: function() {
        this.setChatSize();
        this.initFirebase();
        this.initEmoji();
        this.scrollChatContent();
        this.onResizeWindow();
        this.onEnterChat();
    },

    initFirebase: function() {
        firebase = new Firebase('https://scorching-inferno-4736.firebaseio.com/');
        firebase.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                facebookData = authData;
                firebase.on('child_added', function(snapshot) {
                    var data = snapshot.val();
                    if (typeof data != 'undefined' && typeof data.name != 'undefined' && typeof data.message != 'undefined') {
                        $('.message-response').find('.inner').append('<div class="message" id="message' + messageIndex +'"><b>' + utils.htmlEntities(data.name) + ':</b> ' + utils.htmlEntities(data.message) + ' </div>');
                        messageIndex++;
                    }
                    if (isBotttomMessage) {
                        $('.message-response').scrollTop($('.message-response').find('.inner').height());
                    }
                });
            }
        });
    },
    
    initEmoji: function() {
        window.emojiPicker = new EmojiPicker({
            emojiable_selector: '[data-emojiable=true]',
            assetsPath: 'img',
            popupButtonClasses: 'fa fa-smile-o'
        });
        window.emojiPicker.discover();
    },
    
    scrollChatContent: function() {
        $('.message-response').scroll(function() {
            isBotttomMessage = $('.message-response').scrollTop() >= $('.message-response').find('.inner').height() - 600 - 15 ;
        });
    },
    
    setChatSize: function() {
       $('.message-response').css('height', $(window).height() - 240);
    },
    
    onResizeWindow: function() {
        $( window ).resize(function() {
            $('.message-response').css('height', $(window).height() - 240);
        });
    },
    
    onEnterChat: function() {
       $('#input_message').keypress(function(e) {
            if (e.which == 13) {
                e.preventDefault();
                var message = $('#input_message_input').val().trim();
                var contenteditable = $('#input_message').find('.emoji-wysiwyg-editor');
                if (message == '') {
                    message = contenteditable.html();
                }
                if (message != null) {
                    console.log(facebookData.facebook.displayName);
                    firebase.push({'name': facebookData.facebook.displayName, 'message': message});
                }
                contenteditable.html('');
            }
        });   
    }
};

var utils = {
    htmlEntities: function(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
};