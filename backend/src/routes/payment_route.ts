const createPaymentSession = require("../controller/stripepayment")

const stripeController = require('../controller/stripepayment');

const express = require('express')
const router = express.Router();


router.post('create-checkout-session',stripeController.createPaymentSession);

module.exports = router;




