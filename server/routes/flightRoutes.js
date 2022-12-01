const express = require('express');
const flightController = require('./../controllers/flightController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
    .post(
        '/addFlight',
        authController.protect,
        authController.restrictTo('airlineEmployee'),
        flightController.addFlight
    )
    .delete(
        '/deleteFlight/:id',
        authController.protect,
        authController.restrictTo('airlineEmployee'),
        flightController.deleteFlight
    )
    .get('/getAllFlights', flightController.getAllFlights)
    .get('/getFlight/:id', flightController.getOneFlight)
    .patch(
        '/updateFlight/:id',
        authController.protect,
        authController.restrictTo('airlineEmployee'),
        flightController.updateFlight
    );

module.exports = router;
