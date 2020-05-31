let Seller = require('../models/Seller');
let jwt = require('jsonwebtoken');

exports.addSeller = async function (req, res) {
  try {
    console.log('reve', req.body);
    let seller = new Seller(req.body);
    let savedSeller = (await seller.save()).toObject();
    let generatedToken = jwt.sign(Object.assign({}, savedSeller), process.env.passportSecret || 'secret');
    res.json({
      status: 'Success',
      seller: savedSeller,
      token: generatedToken,
    });
  } catch (e) {
    console.log(e);
    res.json({
      status: 'Failed',
      error: e
    });
  }
}

exports.getAllSeller = async function (req, res) {
  try {
    let skip = +req.query.skip || 0;
    let limit = (req.query.limit && req.query.limit < 20) ? +req.query.limit : 10;


    let sellers = await Seller.find().skip(skip).limit(limit).lean();
    res.json({
      status: 'Success',
      seller: sellers
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}

exports.getSellerById = async function (req, res) {
  try {
    let _id = req.params._id;
    let seller = await Seller.findOne({
      _id
    }).lean();
    res.json({
      status: 'Success',
      seller: seller
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}


exports.updateSellerById = async function (req, res) {
  try {
    let _id = req.params._id;
    let bodyToUpdate = req.body.update;
    let seller = await Seller.findOneAndUpdate({
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
      seller: seller
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}



exports.deleteSellerById = async function (req, res) {
  try {
    let _id = req.params._id;
    let seller = await Seller.findOneAndRemove({
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