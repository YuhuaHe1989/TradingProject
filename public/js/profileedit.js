'use strict';

$(document).ready(init);

function init() {
  $('#saveChanges').click(saveChange);
  $('#cancel').click(cancel);
}

function cancel() {
  window.location.replace('/profile');
}

function saveChange() {
  var edit = {};
  var username = $('#username').val();
  var email = $('#email').val();
  var id = document.cookie.split(' ')[1].slice(7);

  edit.username = username;
  edit.email = email;
  edit._id = id;

  $.put('/profile', edit)
  .done(function(data){
    console.log(data);
    window.location.replace('/profile');
  })
  .fail(function(err){
    console.log(err);
  })
}

