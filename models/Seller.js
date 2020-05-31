const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Seller = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   },
   userType: {
      type: String,
      default: 'Seller',
   }
}, {
   collection: 'sellers'
})

module.exports = mongoose.model('Seller', Seller)