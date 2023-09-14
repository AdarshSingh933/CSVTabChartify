const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home.controller');

router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/csv',require('./csv'));

module.exports = router;