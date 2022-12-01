const express = require('express');
const employeeController = require('./../controllers/employeeController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
    .get(
        '/getAllEmployees',
        authController.protect,
        authController.restrictTo('admin'),
        employeeController.getAllEmployees
    )
    .post(
        '/addEmployee',
        authController.protect,
        authController.restrictTo('admin'),
        employeeController.addEmployee
    )
    .post('/login', authController.login)
    .delete(
        '/deleteEmployee/:id',
        authController.protect,
        authController.restrictTo('admin'),
        employeeController.deleteEmployee
    );

module.exports = router;
