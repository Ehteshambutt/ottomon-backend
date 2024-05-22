// Routes/bedsRoutes.js
const express = require('express');
const router = express.Router();
 const bedsController = require('../Controller/bedsController');
// Define routes for beds
router.get('/', bedsController.getAllBeds);
router.get('/:id', bedsController.getBedById);
router.post('/', bedsController.createBed);
router.put('/:id', bedsController.updateBed);
router.delete('/:id', bedsController.deleteBed);

module.exports = router;
