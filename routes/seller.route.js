const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');

// Customer model
const SellerService = require('../services/seller');


router.get('/get', passport.authenticate('seller-jwt', {
    session: false
}), SellerService.getAllSeller);

router.get('/get/:id', passport.authenticate('seller-jwt', {
    session: false
}), SellerService.getSellerById);

router.post('/create', SellerService.addSeller);

router.put('/update/:id', passport.authenticate('seller-jwt', {
    session: false
}), SellerService.updateSellerById);

router.delete('/delete/:id', passport.authenticate('seller-jwt', {
    session: false
}), SellerService.deleteSellerById);

module.exports = router;
