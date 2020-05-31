const express = require('express');
const app = express();
const router = express.Router();

// Customer model
const ProductService = require('../services/product');


router.get('/get', ProductService.getAllProduct);
router.get('/get/:id', ProductService.getProductById);

router.post('/create', ProductService.addProduct);

router.put('/update/:id', ProductService.updateProductById);

router.delete('/delete/:id', ProductService.deleteProductById);

module.exports = router;
