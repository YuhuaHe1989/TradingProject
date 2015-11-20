'use strict';

$(document).ready(init);

function init() {
  $('#saveChanges').click(saveChange);
  $('#cancel').click(cancel);
}

function cancel() {
  window.location.replace('/profile/' + username);
}

function saveChange() {

  var edit = {};
  var username = $('#username').val();
  var email = $('#email').val();
  var id = document.cookie.split(' ')[1].slice(7);

  edit.username = username;
  edit.email = email;
  edit._id = id;
console.log('username',username);
  $.ajax({
    type: 'PUT',
    url: '/profile/'+username,
    data: edit,
    success: function(data) {
      window.location.replace('/profile/' + username);
    }
  })
}

