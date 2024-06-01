const express = require('express');
const router = express.Router();
const accessoriesController = require('../Controller/accessoriesController');

// Define routes for accessories
router.get('/', accessoriesController.getAllAccessories);
router.get('/:id', accessoriesController.getAccessoryById);
router.post('/', accessoriesController.createAccessory);
router.put('/:id', accessoriesController.updateAccessory);
router.delete('/:id', accessoriesController.deleteAccessory);

module.exports = router;
