let Order = require('../models/Order');


exports.addOrder = async function (req, res) {
  try {
    let order = new Order(req.body);
    let savedOrder = await order.save();
    res.json({
      status: 'Success',
      order: savedOrder
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}


exports.getOrderById = async function (req, res) {
  try {
    let _id = req.params._id;
    let order = await Order.findOne({
      _id
    }).lean();
    res.json({
      status: 'Success',
      order: order
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}


exports.getAllOrder = async function (req, res) {
  try {
    let skip = +req.query.skip || 0;
    let limit = (req.query.limit && req.query.limit < 20) ? +req.query.limit : 10;


    let orders = await Order.find().skip(skip).limit(limit).lean();
    res.json({
      status: 'Success',
      order: orders
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}


exports.updateOrderById = async function (req, res) {
  try {
    let _id = req.params._id;
    let bodyToUpdate = req.body.update;
    let order = await Order.findOneAndUpdate({
      _id
    }, {
      $set: {
        bodyToUpdate
      }
    }, {
      runValidators: true,
      multi: false,
      upsert: false,
      new: true
    });
    res.json({
      status: 'Success',
      order: order
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}



exports.deleteOrderById = async function (req, res) {
  try {
    let _id = req.params._id;
    let order = await Order.findOneAndRemove({
      _id
    });
    res.json({
      status: 'Success'
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}