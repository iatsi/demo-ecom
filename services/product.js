let Product = require('../models/Product');


exports.addProduct = async function (req, res) {
  try {
    let product = new Product(req.body);
    let savedProduct = await product.save();
    res.json({
      status: 'Success',
      product: savedProduct
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}


exports.getProductById = async function (req, res) {
  try {
    let _id = req.params._id;
    let product = await Product.findOne({
      _id
    }).lean();
    res.json({
      status: 'Success',
      product: product
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}


exports.getAllProduct = async function (req, res) {
  try {
    let skip = +req.query.skip || 0;
    let limit = (req.query.limit && req.query.limit < 20) ? +req.query.limit : 10;


    let products = await Product.find().skip(skip).limit(limit).lean();
    res.json({
      status: 'Success',
      product: products
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}


exports.updateProductById = async function (req, res) {
  try {
    let _id = req.params._id;
    let bodyToUpdate = req.body.update;
    let product = await Product.findOneAndUpdate({
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
      product: product
    });
  } catch (e) {
    res.json({
      status: 'Failed',
      error: e
    });
  }
}



exports.deleteProductById = async function (req, res) {
  try {
    let _id = req.params._id;
    let product = await Product.findOneAndRemove({
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