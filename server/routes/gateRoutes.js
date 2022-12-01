const express = require('express');
const gateController = require('./../controllers/gateController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
    .get('/getAllGates', authController.protect, gateController.getAllGates)
    .post(
        '/addTerminal',
        authController.protect,
        authController.restrictTo('admin'),
        gateController.addTerminal
    )
    .post(
        '/toggleEnable/:id',
        authController.protect,
        authController.restrictTo('admin', 'airportEmployee'),
        gateController.toggleEnable
    );

module.exports = router;
