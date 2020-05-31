const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');

// Customer model
const CustomerService = require('../services/customer');


router.get('/get', passport.authenticate('customer-jwt', {
    session: false
}), CustomerService.getAllCustomer);

router.get('/get/:id', passport.authenticate('customer-jwt', {
    session: false
}), CustomerService.getCustomerById);

router.post('/create', CustomerService.addCustomer);

router.put('/update/:id', passport.authenticate('customer-jwt', {
    session: false
}), CustomerService.updateCustomerById);

router.delete('/delete/:id', passport.authenticate('customer-jwt', {
    session: false
}), CustomerService.deleteCustomerById);

module.exports = router;
