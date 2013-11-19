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

  reader.readAsDataURL(file); // convert file to base64*/
}

$(function() {
  $(document).foundation();
  $('#get-image').click(function() {
    $('#get-image-hidden').click();
    return false;
  });
  $('#sell-item').click(function() {
    $('#sell-reveal').show();
    $('#sell-item').hide();
    return false;
  });
});
