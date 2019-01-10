const router = require('express').Router();
const imageController = require('../controllers/imageController');

router.post('/storageImage', imageController.imageUpload);

module.exports = router;