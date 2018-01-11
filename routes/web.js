/**
 * Require Express Router
 */
var express = require('express');
var router = express.Router();

/**
 * Require Controller
 */
var homeController = require('../controllers/homeController');

/**
 * Routes
 */
router.get('/', homeController.index);

/**
 * Export Router
 */
module.exports = router;
