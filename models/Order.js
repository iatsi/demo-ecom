const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Order = new Schema({
   customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
   },
   productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
   },
   createdOn: {
      type: Date,
      default: Date.now()
   },
   status: {
      type: String,
      default: 'Pending'
   }
}, {
   collection: 'orders'
})

module.exports = mongoose.model('Order', Order)
