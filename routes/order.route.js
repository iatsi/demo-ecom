const express = require('express');
const app = express();
const router = express.Router();

// Customer model
const OrderService = require('../services/order');


router.get('/get', OrderService.getAllOrder);
router.get('/get/:id', OrderService.getOrderById);

router.post('/create', OrderService.addOrder);

router.put('/update/:id', OrderService.updateOrderById);

router.delete('/delete/:id', OrderService.deleteOrderById);

module.exports = router;
