const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URI = require('../../secret.js');

mongoose
  .connect(URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'alerts',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

/*
document schema should have name, date, location
*/

const alertSchema = new Schema({
  name: {type: String, required: true},
  namespace: {type: String, required: true},
  status: {type: String, required: true},
  podIP: {type: String, required: true},
  time: {type: String, required: true},
});

const Alert = mongoose.model('alert', alertSchema);

module.exports = { Alert };
