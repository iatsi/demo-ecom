const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Seller = require('../models/Seller');
const Customer = require('../models/Customer');

let options = {
    jwtFromRequest: ExtractJwt.fromHeader('token'),
    secretOrKey: process.env.passportSecret || 'secret'
};
passport.use('seller-jwt', new JWTStrategy(options,
    (jwtPayload, done) => {
        console.log(jwtPayload)
        if (jwtPayload.userType === 'Seller') {
            Seller.findOne({
                _id: jwtPayload._id
            }).lean().exec((err, res) => {
                if (err) {
                    done(err, null);
                } else {
                    done(null, res);
                }
            })
        } else {
            done({
                status: 'Invalud User Type'
            }, null);
        }
    }));


passport.use('customer-jwt', new JWTStrategy(options,
    (jwtPayload, done) => {
        console.log(jwtPayload)
        if (jwtPayload.userType === 'Customer') {
            Customer.findOne({
                _id: jwtPayload._id
            }).lean().exec((err, res) => {
                if (err) {
                    done(err, null);
                } else {
                    done(null, res);
                }
            })
        } else {
            done({
                status: 'Invalid User Type'
            }, null);
        }
    }))