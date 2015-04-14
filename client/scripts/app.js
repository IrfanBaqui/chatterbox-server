var app = {};
app.init = function(){

};
app.server = 'http://127.0.0.1:3000/';
app.send = function(object){
  $.ajax({
    url: app.server + 'classes/messages',
    type: 'POST',
    data: JSON.stringify(object),
    contentType: 'text/plain',
    success: function (data) {
      app.fetch(data.objectId);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  $.ajax({
    url: app.server + 'classes/messages',
    type: 'GET',
    // data: {limit: 1, order: "-createdAt"},
    data: {limit: 1},
    contentType: 'text/plain',
    success: function (data) {
      var parsedData = JSON.parse(data);
      console.log(typeof parsedData);
      console.dir(parsedData);
        for (var i = 0; i < parsedData.results.length; i++) {
          app.addMessage(parsedData.results[i]);
        }
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.constrainData = function(id, param) {
  app.fetch(id);
}



app.clearMessages = function(){
  $('#chats').remove();
};

var hackCheck = function (string) {
  var escapeCharacters = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  }

  if (string.constructor === String) {
    for(var x=0; x < string.length; x++) {
      if (escapeCharacters.hasOwnProperty(string[x])) {
        string[x] = escapeCharacters[string[x]];
      }
    }
  } else {string = ""}

  return string;
};

app.addMessage = function(message){
  var $chats = $('<div/>').attr('id', 'chats');
  var username = '<div class="username">' + '<span class="username">' + message.username + '</span>' + ": " + '<span>' + hackCheck(message.text) + '</span>' + '</div>';
  $('#main').append($chats);
  $('#chats').prepend(username);
  $('#chats div').attr('class','chat');
};


app.addRoom = function(room){
  var $rooms = $('<div/>').attr('id', 'roomSelect');
  var newRoom = '<div>' + room + '</div>';
  $('#main').append($rooms);
  $('#roomSelect').append(newRoom);
};

app.addFriend = function() {
};

//main
$(document).ready(function(){


  var user1 = {
    username: 'irfan',
    text: ''
  };
  var user2 = {
    username: 'vivek',
    text: ''
  };

  setInterval(app.fetch.bind(this), 4000);

  app.fetch();

  $('.user1').click(function () {
      user1.text = $('.input_user').val();
      app.send(user1);
  });
  $('.user2').click(function () {
      user2.text = $('.input_user').val();
      app.send(user2);
  });

  $('.username').click(function () {
    $(this).addClass('friend');
  });

});





