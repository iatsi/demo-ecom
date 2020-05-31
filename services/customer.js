let Customer = require('../models/Customer');
let jwt = require('jsonwebtoken');


exports.addCustomer = async function (req, res) {
  try {
    let customer = new Customer(req.body);
    let savedCustomer = (await customer.save()).toObject();
    let generatedToken = jwt.sign(Object.assign({}, savedCustomer), process.env.passportSecret || 'secret');

    res.json({
      status: 'Success',
      customer: savedCustomer,
      token: generatedToken
    });
  } catch (e) {
    console.l
    res.json({
      status: 'Failed',
      error: e
    });
  }
}

exports.getAllCustomer = async function (req, res) {
  try {
    let skip = +req.query.skip || 0;
    let limit = (req.query.limit && req.query.limit < 20) ? +req.query.limit : 10;


    let customers = await Customer.find().skip(skip).limit(limit).lean();
    res.json({
      status: 'Success',
      customer: customers
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}

exports.getCustomerById = async function (req, res) {
  try {
    let _id = req.params._id;
    let customer = await Customer.findOne({
      _id
    }).lean();
    res.json({
      status: 'Success',
      customer: customer
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}


exports.updateCustomerById = async function (req, res) {
  try {
    let _id = req.params._id;
    let bodyToUpdate = req.body.update;
    let customer = await Customer.findOneAndUpdate({
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
      customer: customer
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}



exports.deleteCustomerById = async function (req, res) {
  try {
    let _id = req.params._id;
    let customer = await Customer.findOneAndRemove({
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