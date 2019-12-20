const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const sessionSchema = new Schema({
  session: {
    type: Object,
  }
});


module.exports = mongoose.model('Sessions', sessionSchema);