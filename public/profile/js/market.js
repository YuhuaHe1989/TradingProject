'use strict';

$(document).ready(init);

function init(){
  $('#exchange').on('click',exchangeItem); 

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

function exchangeItem(){
  console.log('works');
}