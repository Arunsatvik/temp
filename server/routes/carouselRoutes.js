const express = require('express');
const carouselController = require('./../controllers/carouselController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
    .post(
        '/addCarousel',
        authController.protect,
        authController.restrictTo('admin'),
        carouselController.addCarousel
    )
    .post(
        '/assignCarousel/:id',
        authController.protect,
        authController.restrictTo('airportEmployee'),
        carouselController.assignCarousel
    );

module.exports = router;
