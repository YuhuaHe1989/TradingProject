'use strict';

$(document).ready(init);

function init(){
  $('#profileLink').click(goToUserProfile);
  $('#updateInfo').click(updateInfo);
  $('#updateNewItem').click(addNewItem);

  $.get('/profile/newitem')
  .done(function(data){
   
  })
  .fail(function(err){
    console.log(err);
  });
}

function addNewItem(){
  var newItem = {};
  var name = $('#modalInputName').val();
  var price = $('#modalInputPrice').val();
  var description = $('#modalInputDescription').val();

  newItem.name = name;
  newItem.price = price;
  newItem.description = description;

  $('#modalInputName').val(' ');
  $('#modalInputPrice').val(' ');
  $('#modalInputDescription').val(' ');

  $.post('/profile/newitem', newItem)
  .done(function(data){
    console.log('newItem:',data);
  })
  .fail(function(err){
    console.log(err);
  });


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


