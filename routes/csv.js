const express = require('express');

const router = express.Router();

const csvController = require('../controllers/csv.controller');

router.get('/upload-csv/form',csvController.csvForm);
router.post('/upload-csv/:id',csvController.uploads);
router.get('/view-file',csvController.viewFile);


module.exports = router;