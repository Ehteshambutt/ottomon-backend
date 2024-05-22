const express = require('express');
const router = express.Router();
const matressController = require('../Controller/matressController');

router.get('/', matressController.getAllMattresses);
router.get('/:id', matressController.getMattressById);
router.post('/', matressController.createMattress);
router.put('/:id', matressController.updateMattress);
router.delete('/:id', matressController.deleteMattress);

module.exports = router;
