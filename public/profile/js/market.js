'use strict';

var userItemId;
var exchangeItemId;

$(document).ready(init);

function init(){
  $('#exchange').on('click', exchangeItem); 
  $('.swapuser').on('click', userCheckBoxChecked);
  $('.swapothers').on('click', otherCheckBoxChecked);
  $('#reset').on('click', resetCheckbox);

  var user = {};

  var username = document.cookie.split(' ')[0].slice(9).replace(';','');
  var userId = document.cookie.split(' ')[1].slice(7).replace(/"/g,'');

  user.username = username;

  $.ajax({
    type: 'POST',
    url: '/market',
    data: user,
    success: function(data) {
      console.log(data);
    }
  })
}

function resetCheckbox() {
    $(".swap").attr("disabled",false);
    $(".swap").attr("checked",false);
    $(".swapothers").attr("disabled",false);
    $(".swapothers").attr("checked",false); 
}

function exchangeItem(){
  var exchange = [];
  var useritem = {
    _id: userItemId
  };
  var exchangeitem = {
    _id: exchangeItemId
  };

  exchange.push(useritem);
  exchange.push(exchangeitem);

  $.ajax({
    type: 'PUT',
    url: '/market',
    data: {exchange: exchange},
    success: function(data){
      location.reload(true);
    }
  })
}

function userCheckBoxChecked() {
  userItemId = $(this).closest('tr').data('value').replace(/"/g,'');
  console.log('userId:',userItemId);
  if (this.checked) {
    $(".swapuser").attr('disabled', true);
  }
}; 

function otherCheckBoxChecked() {
  exchangeItemId = $(this).closest('tr').data('value').replace(/"/g,'');
  console.log('exchangeId:',exchangeItemId);
  if (this.checked) {
    $(".swapothers").attr('disabled', true);
  }
}; 




