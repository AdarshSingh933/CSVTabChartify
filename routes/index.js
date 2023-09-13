const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home.controller');

router.get('/',homeController.home);
router.use('/user',require('./user'));
router.get('/upload-csv/form',homeController.csvForm);
router.post('/upload-csv/:id',homeController.uploads);
router.get('/view-file',homeController.viewFile);

module.exports = router;