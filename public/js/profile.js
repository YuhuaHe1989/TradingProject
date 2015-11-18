'use strict';

$(document).ready(init);

function init(){
  console.log('ready');
  $('#profileLink').click(goToUserProfile);
  $('#updateInfo').click(updateInfo);
  $('#newItem').click(addNewItem);
}

function addNewItem(){
  console.log('save');
  $('#addItemModal').modal('hide');
}

function goToUserProfile(e) {
  e.preventDefault();

  $.post('/profile', update)
  .done(function(data){
    $('#username').text(data.username);
    window.location.replace('/profile');
  });
}

function updateInfo(e){
  e.preventDefault();

  var id = document.cookie.split(" ")[1].slice(7);

  var username = $('#username').text();

  var update = {};
  update.username = username;
  update._id = id;

  $.post('/profile', update)
  .done(function(data){
    $('#username').text(data.username);
    window.location.replace('/profile/edit');
  });
}


