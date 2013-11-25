/*
function shrink() {
  var self = this;

  var reader = new FileReader(); // init a file reader
  var file = $('#file-input').prop('files')[0]; // get file from input

  reader.onloadend = function() {

    // shrink image
    var image = document.createElement('img');
    image.src = reader.result;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, 300, 300);
    var shrinked = canvas.toDataUrl('image/jpeg');
    console.log(shrinked);
  };

  reader.readAsDataURL(file); // convert file to base64
}
*/

function sell() {
  $('#get-image-hidden').click();
  return false;
}

function readImage(e) {
   var thumbnail = $('#image-thumb');
    $('#sell-reveal').show();
    $('#sell-item').hide();
    thumbnail.height((400 * thumbnail.width()) / 300);
    thumbnail.attr('src', e.target.result);
}

function gotImage(e) {
  var reader = new FileReader();
  reader.onloadend = readImage; 
  reader.readAsDataURL(e.target.files[0]);
}

$(function() {
  $(document).foundation();
  //$('#get-image-hidden').on('change', gotImage);
  //$('#sell-item').click(sell)
});
