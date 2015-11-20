'use strict';

$("#slideshow > div:gt(0)").hide();

setInterval(function() { 
  $('#slideshow > div:first')
    .fadeOut(3000)
    .next()
    .fadeIn(2000)
    .end()
    .appendTo('#slideshow');
},  4000);


$(document).ready(init);

function init() {
  $('#logout').click(logout);
}

function logout() {
  $.post('/users/logout')
  .done(function(){
    window.location.replace('/');
  });
}
