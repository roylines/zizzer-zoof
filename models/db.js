var mongoose = require('mongoose');
//Item = require('./models/item');
/*
function connected() {
  console.log('connected');
  item = new Item({
    title: 'an new item',
    geo: [4.926208, 52.388065]
  });

  item.save();

  

}
*/

function connect(done) {
  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;

  db.on('error', function(e) {
    return done(e);
  });
  db.once('open', function() {
    return done();
  });
}

module.exports = {
  connect: connect
};
