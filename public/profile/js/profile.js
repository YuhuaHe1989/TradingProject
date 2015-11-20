'use strict';

var editIndex;
var itemId;
var username;
var userId;

$(document).ready(init);

function init(){
  $('#profileLink').click(goToUserProfile);
  $('#updateInfo').click(updateInfo);
  $('#updateNewItem').on('click',addNewItem);
  $('.edit').on('click',editItem);
  $('.delete').on('click',deleteItem);
  $('#editExistItem').on('click',saveEditItem);

  username = document.cookie.split(' ')[0].slice(9).replace(';','');
  userId = document.cookie.split(' ')[1].slice(7).replace(/"/g,'');

   $.get('/profile/' + username)
  .done(function(data){

  })
  .fail(function(err){
    console.log(err);
  })
}

function saveEditItem(){
  var edited = {};

  var $modalName = $('#modalInputNameEdit').val();
  var $modalPrice = $('#modalInputPriceEdit').val();
  var $modalDescription = $('#modalInputDescriptionEdit').val();

  edited._id = itemId;

  if($modalName !== ''){
    edited.name = $modalName;
    $('#sample:nth-child('+(editIndex + 1)+')').find('.name').text($modalName);
  }
  if($modalPrice !== ''){
    edited.price = $modalPrice;
    $('#sample:nth-child('+(editIndex + 1)+')').find('.price').text($modalPrice);
  }
  if($modalDescription !== ''){
    edited.description = $modalDescription;
    $('#sample:nth-child('+(editIndex + 1)+')').find('.description').text($modalDescription);
  }

  $.ajax({
    type: 'PUT',
    url: '/profile/' + username,
    data: edited,
    success: function(data){
      //console.log(data);
    }
  })

  $('#editItemModal').modal('hide');
}

function deleteItem(){
  var itemDelete = {};
  var itemId = $(this).closest('tr').data('value').replace(/"/g,'');
// console.log(itemId);
  itemDelete._id = itemId;

  $.ajax({
    type: 'DELETE',
    url: '/profile/' + username,
    data: itemDelete,
    success: function(data){
      // console.log(data);
    }
  })
  $(this).closest('tr').remove();
}

function editItem(){
  itemId = $(this).closest('tr').data('value').replace(/"/g,'');
  editIndex = $(this).closest('tr').index();
}

function addNewItem(){
  var newItem = {};
  var name = $('#modalInputName').val();
  var price = $('#modalInputPrice').val();
  var description = $('#modalInputDescription').val();

  newItem.name = name;
  newItem.price = price;
  newItem.description = description;
  newItem.userId = userId;
  newItem.username = username;

  $('#modalInputName').val(' ');
  $('#modalInputPrice').val(' ');
  $('#modalInputDescription').val(' ');

  $.post('/profile/' + username, newItem)
  .done(function(data){
    $('#list').append(itemRow(data));
    location.reload();
  })
  .fail(function(err){
    console.log(err);
  })

  $('#addItemModal').modal('hide');

}

function itemRow (newItem){
  var $tr = $('#sample').clone();
  $tr.removeAttr('id');
  $tr.find('.name').text(newItem.name);
  $tr.find('.price').text(newItem.price);
  $tr.find('.description').text(newItem.description);
  
  return $tr;
}

function goToUserProfile(e) {
  e.preventDefault();

  $.post('/profile' + username, update)
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

  $.post('/profile/' + username, update)
  .done(function(data){
    $('#username').text(data.username);
    window.location.replace('/profile/edit');
  });
}


